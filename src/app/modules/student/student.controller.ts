import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    

    // Validation with Joi
    /* ------------------------------------------------------------------------- */
    // const { error, value } = studentValidationSchema.validate(studentData);
    // const result = await StudentServices.createStudentIntoDB(value);

    // data validation using zod
    /* ----------------------------- */

    const zodParseData = studentValidationSchema.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(zodParseData);

    // joi error handling
    /* --------------------------------*/

    // if(error){
    //     res.status(500).json({
    //         success: false,
    //         message: 'Somthing is wrong',------
    //       });
    // }
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });

  } catch (err : any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Somthing is wrong',
      data: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student Retrived Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Somthing is wrong',
      data: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single Student Retrived Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Somthing is wrong',
      data: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student Deleted Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Somthing is wrong',
      data: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
