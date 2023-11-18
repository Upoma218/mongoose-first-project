import { Student } from './student.interface';
import { StudentModel } from './student.model';

const creatStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (_id: string) => {
  const result = await StudentModel.findOne({ _id });
  return result;
};

export const StudentServices = {
  creatStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
