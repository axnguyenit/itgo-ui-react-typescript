import { ChangeEvent, useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Avatar,
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
// components
import Page from '~/components/Page';
import Label from '~/components/Label';
import Loading from '~/components/Loading';
import Scrollbar from '~/components/Scrollbar';
import TableListHead from '~/components/TableListHead';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
// sections
import { courseApi } from '~/api';
import { cloudinary } from '~/utils';
import { HeaderLabel, User } from '~/models';

// ----------------------------------------------------------------------

const TABLE_HEAD: HeaderLabel[] = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'position', label: 'Position', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

// ----------------------------------------------------------------------

export default function Students() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [studentList, setStudentList] = useState<Partial<User>[]>([]);

  useEffect(() => {
    const getAllStudents = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const { students } = await courseApi.getStudents(id);
        setStudentList(students);
      } catch (error) {
        navigate(PATH_PAGE.page404);
      }
      setIsLoading(false);
    };

    getAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, rowsPerPage - studentList.length) : 0;

  return (
    <Page title="Students">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Students"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Instructors', href: PATH_DASHBOARD.instructors.root },
            { name: 'Students' },
          ]}
        />

        <Card sx={{ position: 'relative' }}>
          {isLoading && <Loading />}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {!!studentList.length &&
                    studentList.map((user) => {
                      const {
                        _id,
                        firstName,
                        lastName,
                        email,
                        isInstructor,
                        avatar,
                        position,
                        isBanned,
                      } = user;

                      return (
                        <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                          <TableCell
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Avatar
                              alt={firstName}
                              src={cloudinary.w100(avatar)}
                              sx={{ mr: 2 }}
                            />
                            <Typography variant="subtitle2" noWrap>
                              {firstName} {lastName}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">
                            {position ? position : '#'}
                          </TableCell>
                          <TableCell align="left">
                            {isInstructor ? 'Instructor' : 'Student'}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant={'ghost'}
                              color={isBanned ? 'error' : 'success'}
                            >
                              {sentenceCase(isBanned ? 'banned' : 'active')}
                            </Label>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {(emptyRows > 0 || !studentList.length) && (
                    <TableRow
                      style={{
                        height:
                          72 * (!studentList.length ? rowsPerPage : emptyRows),
                      }}
                    >
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
            count={studentList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
