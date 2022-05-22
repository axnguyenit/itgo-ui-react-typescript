// routes
import Iconify from '@/components/Iconify';
import { Menu } from '@/models';
import { PATH_HOME } from '@/routes/paths';
// components

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig: Menu[] = [
  {
    title: 'Home',
    icon: <Iconify icon='ant-design:home-filled' {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Become Instructor',
    icon: <Iconify icon='ph:chalkboard-teacher-fill' {...ICON_SIZE} />,
    path: PATH_HOME.becomeInstructor,
  },
  {
    title: 'My Learning',
    icon: <Iconify icon='fluent:learning-app-24-filled' {...ICON_SIZE} />,
    path: PATH_HOME.myLearning.root,
  },
  {
    title: 'Courses',
    icon: <Iconify icon='el:book' {...ICON_SIZE} />,
    path: PATH_HOME.courses.root,
  },
];

export default menuConfig;
