import { SubMenu } from '~/models';
// import Label from '~/components/Label';
import SvgIconStyle from '~/components/SvgIconStyle';
import { PATH_INSTRUCTOR } from '~/routes/paths';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/assets/icons/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  book: getIcon('ic_book'),
  user: getIcon('ic_user'),
  calendar: getIcon('ic_calendar'),
};

const navConfig: SubMenu[] = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER
      // {
      //   title: 'student',
      //   path: PATH_INSTRUCTOR.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'profile', path: PATH_INSTRUCTOR.user.profile },
      //     { title: 'cards', path: PATH_INSTRUCTOR.user.cards },
      //     { title: 'list', path: PATH_INSTRUCTOR.user.list },
      //     { title: 'create', path: PATH_INSTRUCTOR.user.newUser },
      //   ],
      // },

      // MANAGEMENT : CALENDAR
      {
        title: 'calendar',
        path: PATH_INSTRUCTOR.calendar,
        icon: ICONS.calendar,
      },
      // MANAGEMENT : COURSES
      {
        title: 'courses',
        path: PATH_INSTRUCTOR.courses.root,
        icon: ICONS.book,
      },
    ],
  },
];

export default navConfig;
