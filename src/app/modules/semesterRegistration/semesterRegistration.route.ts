import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-semester-registration',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  SemesterRegistrationController.getAllSemesterRegistration,
);
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SemesterRegistrationController.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
