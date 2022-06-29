import { useState, useEffect, ChangeEvent } from 'react';
// @mui
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button,
} from '@mui/material';
// routes
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '~/routes/paths';
// utils
import { fDate, fCurrency, cloudinary } from '~/utils';
// components
import Page from '~/components/Page';
import Image from '~/components/Image';
import Iconify from '~/components/Iconify';
import Scrollbar from '~/components/Scrollbar';
import TableListHead from '~/components/TableListHead';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
// sections
import { CourseMoreMenu } from '~/sections/@dashboard/courses/course-list';
// api
import { courseApi } from '~/api';
import { Course, HeaderLabel, ListParams, PaginationParams } from '~/models';
import Loading from '~/components/Loading';

// ----------------------------------------------------------------------

const TABLE_HEAD: HeaderLabel[] = [
  { id: 'name', label: 'Course', alignRight: false },
  { id: 'instructor', label: 'Instructor', alignRight: false },
  { id: 'createdAt', label: 'Create at', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

export default function Courses() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [pagination, setPagination] = useState<PaginationParams>({
    _limit: 5,
    _page: page,
    _totalRows: rowsPerPage,
  });
  const navigate = useNavigate();

  const getAllCourses = async () => {
    setIsLoading(true);
    const params: ListParams = {
      _page: page,
      _limit: rowsPerPage,
    };

    try {
      const { courses, pagination } = await courseApi.getAll(params);
      setCourseList(courses);
      pagination && setPagination(pagination);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    getAllCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleDeleteCourse = async (courseId: string) => {
    setIsLoading(true);
    try {
      await courseApi.remove(courseId);
      getAllCourses();
    } catch (error) {}
    setIsLoading(false);
  };

  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - courseList.length) : 0;

  return (
    <Page title='Courses'>
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading='Courses'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Courses',
            },
          ]}
          action={
            <Button
              variant='contained'
              startIcon={
                <Iconify icon={'eva:plus-fill'} width={20} height={20} />
              }
              onClick={() => navigate(PATH_DASHBOARD.courses.create)}
            >
              New Course
            </Button>
          }
        />

        <Card sx={{ position: 'relative' }}>
          {isLoading && <Loading />}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {courseList.length > 0 &&
                    courseList.map((course) => {
                      const { _id, name, cover, price, createdAt, instructor } =
                        course;

                      return (
                        <TableRow hover key={_id} tabIndex={-1} role='checkbox'>
                          <TableCell
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Image
                              disabledEffect
                              alt={name}
                              src={cloudinary.w100(cover)}
                              sx={{
                                borderRadius: 1.5,
                                width: 48,
                                height: 48,
                                mr: 2,
                              }}
                            />
                            <Typography variant='subtitle2' noWrap>
                              {name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {instructor?.firstName} {instructor?.lastName}
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}>
                            {fDate(createdAt as Date)}
                          </TableCell>
                          <TableCell align='right'>
                            {fCurrency(price)}
                          </TableCell>
                          <TableCell align='right'>
                            <CourseMoreMenu
                              courseId={_id as string}
                              courseName={name}
                              onDelete={() => handleDeleteCourse(_id as string)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 80 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={pagination._totalRows} //total courses
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={(event, value) => setPage(value + 1)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
