// @mui
import { Box, Card, Grid, Skeleton, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonRoadmap() {
  return (
    <Stack spacing={3}>
      <Box>
        <Skeleton variant="text" height={70} sx={{ width: 0.6 }} />
        <Skeleton variant="text" height={30} sx={{ width: 1 }} />
        <Skeleton variant="text" height={30} sx={{ width: 1 }} />
        <Skeleton variant="text" height={30} sx={{ width: 1 }} />
        <Skeleton variant="text" height={30} sx={{ width: 1 }} />
      </Box>

      <Box>
        <Skeleton variant="text" height={70} sx={{ width: 0.4 }} />
        <Skeleton variant="text" height={30} sx={{ width: 1 }} />
        <Skeleton variant="text" height={30} sx={{ width: 1 }} />
      </Box>

      <Stack spacing={3}>
        {[...Array(3)].map((_, index) => (
          <Card sx={{ p: { xs: 2, md: 4 } }} key={index}>
            <Grid container>
              <Grid
                item
                xs={6}
                md={4}
                sx={{ overflow: 'hidden', borderRadius: 1 }}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: { xs: 200, md: 300 },
                    height: { xs: 120, md: 170 },
                    borderRadius: 1,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={8}>
                <Skeleton
                  variant="text"
                  height={60}
                  sx={{ width: { xs: 1, md: 0.4 } }}
                />
                <Skeleton
                  variant="text"
                  height={50}
                  sx={{ width: { xs: 0.7, md: 0.3 } }}
                />
              </Grid>
            </Grid>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
