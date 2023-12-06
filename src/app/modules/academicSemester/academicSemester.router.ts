import express from 'express';
import { AcademicSemesterConttrollers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterConttrollers.createAcademicSemester,
);

router.get(
  '/',
  AcademicSemesterConttrollers.getAllAcademicSemester,
);

router.get(
  '/:semesterId',
  AcademicSemesterConttrollers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterConttrollers.updateAcademicSemester,
);

export const AcademicSemesterRoute = router;
