import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { BasedGuard, GuestGuard, InstructorGuard } from '~/guards';
import { HomeLayout } from '~/layouts';
import InstructorLayout from '~/layouts/instructor';
import { PATH_INSTRUCTOR } from './paths';

// ----------------------------------------------------------------------

const Home = lazy(() => import('~/pages/home/Home'));
const Login = lazy(() => import('~/pages/auth/Login'));
const Register = lazy(() => import('~/pages/auth/Register'));
const Verify = lazy(() => import('~/pages/auth/Verify'));
const RequestVerify = lazy(() => import('~/pages/auth/RequestVerify'));
const BecomeInstructor = lazy(() => import('~/pages/home/BecomeInstructor'));
const Courses = lazy(() => import('~/pages/home/Courses'));
const MyLearning = lazy(() => import('~/pages/home/MyLearning'));
const Roadmap = lazy(() => import('~/pages/home/Roadmap'));
const CourseDetails = lazy(() => import('~/pages/home/CourseDetails'));
const Checkout = lazy(() => import('~/pages/home/Checkout'));
const AccountSettings = lazy(() => import('~/pages/home/AccountSettings'));
const StudentCalendar = lazy(() => import('~/pages/home/Calendar'));
const InstructorCalendar = lazy(() => import('~/pages/instructor/Calendar'));
const InstructorCourses = lazy(() => import('~/pages/instructor/Courses'));
const InstructorCourseCreate = lazy(
  () => import('~/pages/instructor/CourseCreate')
);
const InstructorStudents = lazy(() => import('~/pages/instructor/Students'));

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
        // { path: 'faqs', element: <Faqs /> },
        { path: 'courses', element: <Courses /> },
        { path: 'courses/:id', element: <CourseDetails /> },
        { path: 'roadmaps/:id', element: <Roadmap /> },
        // {
        //   path: 'instructor/:id',
        //   element: (
        //     <BasedGuard>
        //       <InstructorProfile />
        //     </BasedGuard>
        //   ),
        // },
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

    // Main Routes
    // {
    //   path: '*',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     {
    //       path: 'learning/:id',
    //       element: (
    //         <BasedGuard>
    //           <Learning />
    //         </BasedGuard>
    //       ),
    //     },
    //     { path: '500', element: <Page500 /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to='/404' replace /> },
    //   ],
    // },
    // { path: '*', element: <Navigate to='/404' replace /> },

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
        // {
        //   path: 'forgot-password',
        //   element: (
        //     <GuestGuard>
        //       <ForgotPassword />
        //     </GuestGuard>
        //   ),
        // },
        // {
        //   path: 'reset-password/:id/:token',
        //   element: (
        //     <GuestGuard>
        //       <ResetPassword />
        //     </GuestGuard>
        //   ),
        // },
      ],
    },
  ]);
}
