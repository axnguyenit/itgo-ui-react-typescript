import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
// routes
import { PATH_HOME } from '~/routes/paths';
import Image from '~/components/Image';
import cloudinary from '~/utils/cloudinary';
import { OrderItem } from '~/models';

// ----------------------------------------------------------------------

interface CourseCardProps {
  order: OrderItem;
}

export default function CourseCard({ order }: CourseCardProps) {
  const { course } = order;
  const linkTo = `${PATH_HOME.myLearning.root}/${course._id}/events`;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Image
          alt={course?.name}
          src={cloudinary.w300(course?.cover)}
          ratio='16/9'
        />
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Link to={linkTo} color='inherit' component={RouterLink}>
            <Typography variant='subtitle2' noWrap>
              {course?.name}
            </Typography>
          </Link>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </Typography>
          </Box>
        </Box>

        <Stack
          direction='row'
          alignItems='flex-end'
          justifyContent='space-between'
        >
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant='contained'
            size='small'
            to={linkTo}
            component={RouterLink}
          >
            Calendar
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
