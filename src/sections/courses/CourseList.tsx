// @mui
import { Box } from '@mui/material';
// components
import { SkeletonCourseItem } from '~/components/skeleton';
import CourseCard from './CourseCard';
//
import { Course } from '~/models';

// ----------------------------------------------------------------------

interface CourseListProps {
  courses: Course[];
  loading: boolean;
}

export default function CourseList({ courses, loading }: CourseListProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {(loading ? [...Array(8)] : courses).map((course, index) =>
        course ? (
          <CourseCard key={course._id} course={course} />
        ) : (
          <SkeletonCourseItem key={index} />
        ),
      )}
    </Box>
  );
}
