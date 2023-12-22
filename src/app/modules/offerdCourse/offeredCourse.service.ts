import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { Course } from '../Course/course.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { hasTimeConflict } from './offeredCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    course,
    academicFaculty,
    academicDepartment,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  // if the semeter registration is exists!!!
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration not found');
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  // if the course is exists!!!
  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  // if the academicFaculty is exists!!!
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found');
  }

  // if the academicDepartment is exists!!!
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }

  // if the semeter registration is exists!!!
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Faculty not found');
  }

  //  check if the department is belong to that faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`,
    );
  }

  //  check if the same offered course same section same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exists!`,
    );
  }

  //   get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available for this schedule! Choose an another schedule!`,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await offeredCourseQuery.modelQuery;
    return result;
  };
  
  const getSingleOfferedCourseFromDB = async (id: string) => {
    const offeredCourse = await OfferedCourse.findById(id);
  
    if (!offeredCourse) {
      throw new AppError(404, 'Offered Course not found');
    }
  
    return offeredCourse;
  };
  

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty'|'days'|'startTime'|'endTime'>,
) => {
    const {faculty, days, startTime, endTime} = payload;
    
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration);

  if(semesterRegistrationStatus?.status !=="UPCOMING"){
    throw new AppError(httpStatus.BAD_REQUEST, `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`);
  }
    
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Fcaulty not found');
  }
    //   get the schedules of the faculties
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
      }).select('days startTime endTime');
    
      const newSchedule = {
        days,
        startTime,
        endTime,
      };
    
      if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
          httpStatus.CONFLICT,
          `This faculty is not available for this schedule! Choose an another schedule!`,
        );
      }
    
      const result = await OfferedCourse.findByIdAndUpdate(id, payload, {new: true})
      return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
    /**
     * Step 1: check if the offered course exists
     * Step 2: check if the semester registration status is upcoming
     * Step 3: delete the offered course
     */
    const isOfferedCourseExists = await OfferedCourse.findById(id);
  
    if (!isOfferedCourseExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
    }
  
    const semesterRegistation = isOfferedCourseExists.semesterRegistration;
  
    const semesterRegistrationStatus =
      await SemesterRegistration.findById(semesterRegistation).select('status');
  
    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
      );
    }
  
    const result = await OfferedCourse.findByIdAndDelete(id);
  
    return result;
  };

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
}
