import express from 'express';
import { AcademicSemesterConttrollers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterConttrollers.createAcademicSemester,
);

router.get(
  '/', 
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  AcademicSemesterConttrollers.getAllAcademicSemester);

router.get(
  '/:semesterId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  AcademicSemesterConttrollers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterConttrollers.updateAcademicSemester,
);

export const AcademicSemesterRoute = router;
