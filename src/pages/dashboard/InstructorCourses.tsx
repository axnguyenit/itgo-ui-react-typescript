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
} from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '~/routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
// utils
import { fDate, fCurrency, cloudinary } from '~/utils';
// components
import Page from '~/components/Page';
import Image from '~/components/Image';
import Scrollbar from '~/components/Scrollbar';
import TableListHead from '~/components/TableListHead';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
// sections
import { CourseMoreMenu } from '~/sections/@dashboard/courses/course-list';
// api
import { courseApi } from '~/api';
import { Course, HeaderLabel, ListParams, PaginationParams } from '~/models';
import Loading from '~/components/Loading';
// utils

// ----------------------------------------------------------------------

const TABLE_HEAD: HeaderLabel[] = [
  { id: 'name', label: 'Course', alignRight: false },
  { id: 'instructor', label: 'Instructor', alignRight: false },
  { id: 'createdAt', label: 'Create at', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: 'priceSale', label: 'Price Sale', alignRight: true },
  { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

export default function InstructorCourses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [pagination, setPagination] = useState<PaginationParams>({
    limit: 5,
    page,
    totalRows: rowsPerPage,
  });

  const getAllCourses = async () => {
    setIsLoading(true);
    const params: ListParams = {
      page,
      limit: rowsPerPage,
      instructor: id,
    };
    try {
      const { courses, pagination } = await courseApi.getAll(params);
      setCourseList(courses);
      pagination && setPagination(pagination);
    } catch (error) {
      navigate(PATH_PAGE.page404);
    }
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
    try {
      await courseApi.remove(courseId);
      getAllCourses();
    } catch (error) {}
  };

  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - courseList.length) : 0;

  return (
    <Page title="Courses">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Courses"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Instructors', href: PATH_DASHBOARD.instructors.root },
            { name: 'Courses' },
          ]}
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
                      const { id, name, cover, price, priceSale, createdAt, instructor } =
                        course;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
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
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {instructor?.firstName} {instructor?.lastName}
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}>
                            {fDate(createdAt as Date)}
                          </TableCell>
                          <TableCell align="right">{fCurrency(price)}</TableCell>
                          <TableCell align="right">{fCurrency(priceSale)}</TableCell>
                          <TableCell align="right">
                            <CourseMoreMenu
                              courseId={id as string}
                              courseName={name}
                              onDelete={() => handleDeleteCourse(id as string)}
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
            component="div"
            count={pagination.totalRows} //total courses
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
