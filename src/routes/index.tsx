import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home/Home'));

export interface RouterProps {}

export default function Router(props: RouterProps) {
  return useRoutes([
    {
      path: '',
      element: <Home />,
    },

    // Home Routes
    // {
    // 	path: '',
    // 	element: <HomeLayout />,
    // 	children: [
    // 		{ element: <Home />, index: true },
    // 		{ path: 'checkout', element: <Checkout /> },
    // 		{ path: 'faqs', element: <Faqs /> },
    // 		{ path: 'courses', element: <Courses /> },
    // 		{ path: 'courses/:id', element: <CourseDetails /> },
    // 		{ path: 'roadmaps/:id', element: <Roadmap /> },
    // 		{
    // 			path: 'instructor/:id',
    // 			element: (
    // 				<BasedGuard>
    // 					<InstructorProfile />
    // 				</BasedGuard>
    // 			),
    // 		},
    // 		{
    // 			path: 'account-settings',
    // 			element: (
    // 				<BasedGuard>
    // 					<AccountSettings />
    // 				</BasedGuard>
    // 			),
    // 		},
    // 		{
    // 			path: 'my-courses',
    // 			element: (
    // 				<BasedGuard>
    // 					<MyLearning />
    // 				</BasedGuard>
    // 			),
    // 		},
    // 		{
    // 			path: 'my-courses/:id/events',
    // 			element: (
    // 				<BasedGuard>
    // 					<StudentCalendar />
    // 				</BasedGuard>
    // 			),
    // 		},
    // 		{
    // 			path: 'become-instructor',
    // 			element: (
    // 				<BasedGuard>
    // 					<BecomeInstructor />
    // 				</BasedGuard>
    // 			),
    // 		},
    // 	],
    // },

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
    { path: '*', element: <Navigate to='/404' replace /> },
  ]);
}
