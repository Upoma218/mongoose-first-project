/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';
import mongoose from 'mongoose';
import { OfferedCourse } from '../offerdCourse/offeredCourse.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

//  check if there any registered semester that is already 'UPCOMING'|'ONGOING'
const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [
        {status: RegistrationStatus.UPCOMING},
        {status: RegistrationStatus.ONGOING}
    ]
});

if(isThereAnyUpcomingOrOngoingSemester){
    throw new AppError(
        httpStatus.BAD_REQUEST,
        `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registerd semeter !`,
      );
}

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  // check the semster existance
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester is not exists!',
    );
  }

  // check if the semester is already registered
  const isSemesterRegitsrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegitsrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This academic semester is already registerd!',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationFromDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

// if the requested registerd semester is exists
const isSemesterRegitsrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegitsrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester is not found!',
    );
  }


// if the semeter registration is ended!
const currentSemeterStatus = isSemesterRegitsrationExists?.status;

const requestedSemeterStatus = payload?.status;

if(currentSemeterStatus === RegistrationStatus.ENDED){
    throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemeterStatus}`)
}

if(currentSemeterStatus === RegistrationStatus.UPCOMING && requestedSemeterStatus === RegistrationStatus.ENDED){
    throw new AppError(httpStatus.BAD_REQUEST, `You can't directly change the ${currentSemeterStatus} status to ${requestedSemeterStatus}`)
}

if(currentSemeterStatus === RegistrationStatus.ONGOING && requestedSemeterStatus === RegistrationStatus.UPCOMING){
    throw new AppError(httpStatus.BAD_REQUEST, `You can't directly change the ${currentSemeterStatus} status to ${requestedSemeterStatus}`)
}


  const result = await SemesterRegistration.findByIdAndUpdate(id, payload,{
    new: true,
    runValidators: true
  });
  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
    /** 
    * Step1: Delete associated offered courses.
    * Step2: Delete semester registraton when the status is 
    'UPCOMING'.
    **/
  
    // checking if the semester registration is exist
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  
    if (!isSemesterRegistrationExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This registered semester is not found !',
      );
    }
  
    // checking if the status is still "UPCOMING"
    const semesterRegistrationStatus = isSemesterRegistrationExists.status;
  
    if (semesterRegistrationStatus !== 'UPCOMING') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can not update as the registered semester is ${semesterRegistrationStatus}`,
      );
    }
  
    const session = await mongoose.startSession();
  
    //deleting associated offered courses
  
    try {
      session.startTransaction();
  
      const deletedOfferedCourse = await OfferedCourse.deleteMany(
        {
          semesterRegistration: id,
        },
        {
          session,
        },
      );
  
      if (!deletedOfferedCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete semester registration !',
        );
      }
  
      const deletedSemisterRegistration =
        await SemesterRegistration.findByIdAndDelete(id, {
          session,
          new: true,
        });
  
      if (!deletedSemisterRegistration) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete semester registration !',
        );
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return null;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB,
  deleteSemesterRegistrationFromDB
};
