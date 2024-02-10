import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  OfferedCourseController.getAllOfferedCourses,
);

router.get(
  '/my-offered-course',
  auth(USER_ROLE.student),
  OfferedCourseController.getMyOfferedCourses,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  OfferedCourseController.getSingleOfferedCourses,
);

router.post(
  '/create-offered-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OfferedCourseController.deleteOfferedCourseFromDB,
);

export const OfferedCourseRoutes = router;
