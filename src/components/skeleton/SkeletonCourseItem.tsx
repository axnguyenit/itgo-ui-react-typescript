// @mui
import { Card, Skeleton, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonCourseItem() {
  return (
    <Card>
      <Skeleton variant='rectangular' sx={{ paddingTop: '100%' }} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Skeleton variant='text' sx={{ width: 1 }} />
        <Skeleton variant='text' sx={{ width: 0.5 }} />
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Skeleton variant='text' sx={{ width: 0.4 }} />
          <Skeleton variant='text' sx={{ width: 0.4 }} />
        </Stack>
      </Stack>
    </Card>
  );
}
