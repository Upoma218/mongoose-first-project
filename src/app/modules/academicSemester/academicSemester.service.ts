import { academicSemesterNameCodeMapper } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is already exists');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterIntoDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterIntoDB,
  getSingleAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
};
