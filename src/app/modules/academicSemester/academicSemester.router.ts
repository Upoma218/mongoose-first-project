import express from 'express';
import { AcademicSemesterConttrollers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('admin'),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterConttrollers.createAcademicSemester,
);

router.get(
  '/', 
  auth('admin'),
  AcademicSemesterConttrollers.getAllAcademicSemester);

router.get(
  '/:semesterId',
  auth('admin'),
  AcademicSemesterConttrollers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  auth('admin'),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterConttrollers.updateAcademicSemester,
);

export const AcademicSemesterRoute = router;
