import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademisFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademisFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcadmicFacultyRoutes = router;
