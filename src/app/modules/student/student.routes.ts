import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.getAllStudents,
);

router.get(
  '/:id', 
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.getSingleStudent);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.delete(
  '/:id', 
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.deleteStudent);

export const StudentRoutes = router;
