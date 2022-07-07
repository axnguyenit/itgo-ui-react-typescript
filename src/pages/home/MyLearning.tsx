import React, { useState, useEffect } from 'react';
// @mui
import { Container, Pagination, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '~/components/Page';
import EmptyContent from '~/components/EmptyContent';
// sections
import { CourseHero } from '~/sections/courses';
import { CourseList } from '~/sections/my-learning';
// api
import { orderApi } from '~/api';
import { OrderItem, PaginationParams } from '~/models';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

const LIMIT_COURSE = 8;

function MyLearning() {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [enrolledCourseList, setEnrolledCourseList] = useState<OrderItem[]>([]);
  const [pagination, setPagination] = useState<PaginationParams>({
    limit: 1,
    page: 1,
    totalRows: 1,
  });

  useEffect(() => {
    const getEnrolledCourses = async () => {
      setIsLoading(true);
      try {
        const params = { page, limit: LIMIT_COURSE };
        const { results, pagination } = await orderApi.getByUser(params);
        setEnrolledCourseList(results);
        pagination && setPagination(pagination);
      } catch (error) {}
      setIsLoading(false);
    };

    getEnrolledCourses();
  }, [page]);

  return (
    <Page title="My Learning">
      <RootStyle>
        <CourseHero
          label="My Learning"
          src={`${window.location.origin}/assets/images/my-learning.jpg`}
        />
        <Container sx={{ mt: 15, mb: 10 }}>
          <CourseList orders={enrolledCourseList} loading={isLoading} />

          {!enrolledCourseList.length && !isLoading && (
            <EmptyContent
              title="Orders is empty"
              description="Look like you haven't purchased any courses yet"
            />
          )}

          {pagination.totalRows > LIMIT_COURSE && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ my: 3 }}
            >
              <Pagination
                count={Math.ceil(pagination.totalRows / LIMIT_COURSE)}
                onChange={(event, value) => setPage(value)}
                color="primary"
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          )}
        </Container>
      </RootStyle>
    </Page>
  );
}

export default MyLearning;
