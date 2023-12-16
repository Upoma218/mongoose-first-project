import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { StudentRoutes } from '../modules/student/student.routes';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.router';
import { AcadmicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.router';
import { AcademicDepartmentRouters } from '../modules/academicDepartment/academicDepartment.router';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academicSemester',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academicFaculty',
    route: AcadmicFacultyRoutes,
  },
  {
    path: '/academicDepartment',
    route: AcademicDepartmentRouters,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
