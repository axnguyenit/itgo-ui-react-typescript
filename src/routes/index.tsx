import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AuthGuard, BasedGuard, GuestGuard, InstructorGuard } from '~/guards';
import {
  HomeLayout,
  LogoOnlyLayout,
  InstructorLayout,
  DashboardLayout,
} from '~/layouts';
import { PATH_DASHBOARD, PATH_INSTRUCTOR } from './paths';

// ----------------------------------------------------------------------

// Auth Routes
const Login = lazy(() => import('~/pages/auth/Login'));
const Verify = lazy(() => import('~/pages/auth/Verify'));
const Register = lazy(() => import('~/pages/auth/Register'));
const RequestVerify = lazy(() => import('~/pages/auth/RequestVerify'));
const ResetPassword = lazy(() => import('~/pages/auth/ResetPassword'));
const ForgotPassword = lazy(() => import('~/pages/auth/ForgotPassword'));
// Home Routes
const Home = lazy(() => import('~/pages/home/Home'));
const Courses = lazy(() => import('~/pages/home/Courses'));
const Roadmap = lazy(() => import('~/pages/home/Roadmap'));
const Checkout = lazy(() => import('~/pages/home/Checkout'));
const Learning = lazy(() => import('~/pages/home/Learning'));
const MyLearning = lazy(() => import('~/pages/home/MyLearning'));
const StudentCalendar = lazy(() => import('~/pages/home/Calendar'));
const CourseDetails = lazy(() => import('~/pages/home/CourseDetails'));
const AccountSettings = lazy(() => import('~/pages/home/AccountSettings'));
const BecomeInstructor = lazy(() => import('~/pages/home/BecomeInstructor'));
const InstructorProfile = lazy(() => import('~/pages/home/InstructorProfile'));
// Instructor Routes
const InstructorCourses = lazy(() => import('~/pages/instructor/Courses'));
const InstructorCalendar = lazy(() => import('~/pages/instructor/Calendar'));
const InstructorStudents = lazy(() => import('~/pages/instructor/Students'));
const InstructorCourseCreate = lazy(
  () => import('~/pages/instructor/CourseCreate')
);
// Dashboard Routes
const Users = lazy(() => import('~/pages/dashboard/Users'));
const DashboardCourses = lazy(() => import('~/pages/dashboard/Courses'));
// Other Routes
const Page500 = lazy(() => import('~/pages/Page500'));
const Page404 = lazy(() => import('~/pages/Page404'));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Home Routes
    {
      path: '',
      element: <HomeLayout />,
      children: [
        { element: <Navigate to='home' replace />, index: true },
        { path: 'home', element: <Home /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'courses', element: <Courses /> },
        { path: 'courses/:id', element: <CourseDetails /> },
        { path: 'roadmaps/:id', element: <Roadmap /> },
        {
          path: 'instructor/:id',
          element: (
            <BasedGuard>
              <InstructorProfile />
            </BasedGuard>
          ),
        },
        {
          path: 'account-settings',
          element: (
            <BasedGuard>
              <AccountSettings />
            </BasedGuard>
          ),
        },
        {
          path: 'my-courses',
          element: (
            <BasedGuard>
              <MyLearning />
            </BasedGuard>
          ),
        },
        {
          path: 'my-courses/:id/events',
          element: (
            <BasedGuard>
              <StudentCalendar />
            </BasedGuard>
          ),
        },
        {
          path: 'become-instructor',
          element: (
            <BasedGuard>
              <BecomeInstructor />
            </BasedGuard>
          ),
        },
      ],
    },

    // Instructor Routes
    {
      path: 'instructor',
      element: (
        <InstructorGuard>
          <InstructorLayout />
        </InstructorGuard>
      ),
      children: [
        {
          element: <Navigate to={PATH_INSTRUCTOR.calendar} replace />,
          index: true,
        },
        { path: 'calendar', element: <InstructorCalendar /> },
        {
          path: 'courses',
          children: [
            { element: <InstructorCourses />, index: true },
            { path: 'create', element: <InstructorCourseCreate /> },
            { path: ':id/students', element: <InstructorStudents /> },
            { path: ':id/edit', element: <InstructorCourseCreate /> },
          ],
        },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          element: <Navigate to={PATH_DASHBOARD.users.root} replace />,
          index: true,
        },
        {
          path: 'users',
          element: <Users />,
        },
        {
          path: 'courses',
          children: [
            { element: <DashboardCourses />, index: true },
            // { path: 'create', element: <CourseCreate /> },
            // { path: ':id/edit', element: <CourseCreate /> },
          ],
        },
        //     {
        //       path: 'roadmaps',
        //       children: [
        //         { element: <Roadmaps />, index: true },
        //         { path: 'create', element: <RoadmapCreate /> },
        //         { path: ':id/edit', element: <RoadmapCreate /> },
        //       ],
        //     },
        //     {
        //       path: 'instructors',
        //       children: [
        //         { element: <Instructors />, index: true },
        //         { path: ':id/courses', element: <DashboardInstructorCourses /> },
        //         {
        //           path: 'courses/:id/students',
        //           element: <DashboardInstructorStudents />,
        //         },
        //       ],
        //     },
        //     {
        //       path: 'applications',
        //       children: [
        //         { element: <Applications />, index: true },
        //         { path: ':id/cv', element: <PDFViewer /> },
        //       ],
        //     },
        //     {
        //       path: 'technologies',
        //       children: [
        //         { element: <Technologies />, index: true },
        //         { path: 'create', element: <TechnologyCreate /> },
        //         { path: ':id/edit', element: <TechnologyCreate /> },
        //       ],
        //     },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        {
          path: 'learning/:id',
          element: (
            <BasedGuard>
              <Learning />
            </BasedGuard>
          ),
        },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to='/404' replace /> },
      ],
    },
    { path: '*', element: <Navigate to='/404' replace /> },

    // Auth Routes
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        {
          path: 'verify/:id/:token',
          element: (
            <GuestGuard>
              <Verify />
            </GuestGuard>
          ),
        },
        {
          path: 'verify',
          element: (
            <GuestGuard>
              <RequestVerify />
            </GuestGuard>
          ),
        },
        {
          path: 'forgot-password',
          element: (
            <GuestGuard>
              <ForgotPassword />
            </GuestGuard>
          ),
        },
        {
          path: 'reset-password/:id/:token',
          element: (
            <GuestGuard>
              <ResetPassword />
            </GuestGuard>
          ),
        },
      ],
    },
  ]);
}
