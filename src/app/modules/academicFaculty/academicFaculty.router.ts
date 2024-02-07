import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.createAcademisFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/',
auth(), 
AcademicFacultyControllers.getAllAcademicFaculties);

router.get(
  '/:facultyId', 
  AcademicFacultyControllers.getSingleAcademicFaculty
  );
  
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademisFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcadmicFacultyRoutes = router;
