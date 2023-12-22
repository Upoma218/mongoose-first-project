import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { OfferedCourseValidation } from "./offeredCourse.validation";
import { OfferedCourseController } from "./offeredCourse.controller";

const router = Router();

router.get('/', OfferedCourseController.getAllOfferedCourses);

router.get('/:id', OfferedCourseController.getSingleOfferedCourses);

router.post('/create-offered-course', validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
OfferedCourseController.createOfferedCourse);

router.patch('/:id', validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema), OfferedCourseController.updateOfferedCourse)

router.delete(
    '/:id',
    OfferedCourseController.deleteOfferedCourseFromDB,
  );


export const OfferedCourseRoutes = router;