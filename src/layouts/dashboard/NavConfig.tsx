import { SubMenu } from '~/models';
import SvgIconStyle from '~/components/SvgIconStyle';
import { PATH_DASHBOARD } from '~/routes/paths';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/assets/icons/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: getIcon('ic_user'),
  book: getIcon('ic_book'),
  roadmap: getIcon('ic_road'),
  dashboard: getIcon('ic_dashboard'),
  instructor: getIcon('ic_instructor'),
  technology: getIcon('ic_technology'),
  application: getIcon('ic_application'),
};

const navConfig: SubMenu[] = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  // 	subheader: 'general',
  // 	items: [{ title: 'app', path: PATH_DASHBOARD.app, icon: ICONS.dashboard }],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USERS
      {
        title: 'users',
        path: PATH_DASHBOARD.users.root,
        icon: ICONS.user,
      },

      // MANAGEMENT : COURSES
      {
        title: 'courses',
        path: PATH_DASHBOARD.courses.root,
        icon: ICONS.book,
      },

      // MANAGEMENT : ROADMAPS
      {
        title: 'roadmaps',
        path: PATH_DASHBOARD.roadmaps.root,
        icon: ICONS.roadmap,
      },

      // MANAGEMENT : INSTRUCTORS
      {
        title: 'instructors',
        path: PATH_DASHBOARD.instructors.root,
        icon: ICONS.instructor,
      },

      // MANAGEMENT : APPLICATIONS
      {
        title: 'applications',
        path: PATH_DASHBOARD.applications.root,
        icon: ICONS.application,
      },

      // MANAGEMENT : TECHNOLOGIES
      {
        title: 'technologies',
        path: PATH_DASHBOARD.technologies.root,
        icon: ICONS.technology,
      },
    ],
  },
];

export default navConfig;
