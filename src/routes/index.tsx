import { BasedGuard, GuestGuard } from '@/guards';
import { HomeLayout } from '@/layouts';
import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home/Home'));
const Login = lazy(() => import('@/pages/auth/Login'));
const BecomeInstructor = lazy(() => import('@/pages/home/BecomeInstructor'));
const Courses = lazy(() => import('@/pages/home/Courses'));
const MyLearning = lazy(() => import('@/pages/home/MyLearning'));

export interface RouterProps {}

export default function Router(props: RouterProps) {
  return useRoutes([
    // Home Routes
    {
      path: '',
      element: <HomeLayout />,
      children: [
        { element: <Navigate to='home' replace />, index: true },
        { path: 'home', element: <Home /> },
        // { path: 'checkout', element: <Checkout /> },
        // { path: 'faqs', element: <Faqs /> },
        { path: 'courses', element: <Courses /> },
        // { path: 'courses/:id', element: <CourseDetails /> },
        // { path: 'roadmaps/:id', element: <Roadmap /> },
        // {
        // 	path: 'instructor/:id',
        // 	element: (
        // 		<BasedGuard>
        // 			<InstructorProfile />
        // 		</BasedGuard>
        // 	),
        // },
        // {
        // 	path: 'account-settings',
        // 	element: (
        // 		<BasedGuard>
        // 			<AccountSettings />
        // 		</BasedGuard>
        // 	),
        // },
        {
          path: 'my-courses',
          element: (
            <BasedGuard>
              <MyLearning />
            </BasedGuard>
          ),
        },
        // {
        // 	path: 'my-courses/:id/events',
        // 	element: (
        // 		<BasedGuard>
        // 			<StudentCalendar />
        // 		</BasedGuard>
        // 	),
        // },
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

    // Main Routes
    // {
    // 	path: '*',
    // 	element: <LogoOnlyLayout />,
    // 	children: [
    // 		{
    // 			path: 'learning/:id',
    // 			element: (
    // 				<BasedGuard>
    // 					<Learning />
    // 				</BasedGuard>
    // 			),
    // 		},
    // 		{ path: '500', element: <Page500 /> },
    // 		{ path: '404', element: <NotFound /> },
    // 		{ path: '*', element: <Navigate to="/404" replace /> },
    // 	],
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
        // {
        // 	path: 'register',
        // 	element: (
        // 		<GuestGuard>
        // 			<Register />
        // 		</GuestGuard>
        // 	),
        // },
        // {
        // 	path: 'verify/:id/:token',
        // 	element: (
        // 		<GuestGuard>
        // 			<Verify />
        // 		</GuestGuard>
        // 	),
        // },
        // {
        // 	path: 'verify',
        // 	element: (
        // 		<GuestGuard>
        // 			<RequestVerify />
        // 		</GuestGuard>
        // 	),
        // },
        // {
        // 	path: 'forgot-password',
        // 	element: (
        // 		<GuestGuard>
        // 			<ForgotPassword />
        // 		</GuestGuard>
        // 	),
        // },
        // {
        // 	path: 'reset-password/:id/:token',
        // 	element: (
        // 		<GuestGuard>
        // 			<ResetPassword />
        // 		</GuestGuard>
        // 	),
        // },
      ],
    },
  ]);
}
