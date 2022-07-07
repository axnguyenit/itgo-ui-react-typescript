import { sentenceCase } from 'change-case';
import { ChangeEvent, useEffect, useState } from 'react';
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
import { PATH_DASHBOARD } from '~/routes/paths';
// components
import Page from '~/components/Page';
import Label from '~/components/Label';
import Scrollbar from '~/components/Scrollbar';
import TableListHead from '~/components/TableListHead';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
import Loading from '~/components/Loading';
// sections
import { userApi } from '~/api';
import { cloudinary } from '~/utils';
import { HeaderLabel, ListParams, PaginationParams, User } from '~/models';

// ----------------------------------------------------------------------

const TABLE_HEAD: HeaderLabel[] = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'position', label: 'Position', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

// ----------------------------------------------------------------------

export default function Users() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userList, setUserList] = useState<Partial<User>[]>([]);
  const [pagination, setPagination] = useState<PaginationParams>({
    limit: 5,
    page,
    totalRows: rowsPerPage,
  });

  const getAllUsers = async () => {
    setIsLoading(true);
    const params: ListParams = {
      page,
      limit: rowsPerPage,
    };

    try {
      const { results, pagination } = await userApi.getAll(params);
      setUserList(results);
      pagination && setPagination(pagination);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - userList.length) : 0;

  return (
    <Page title="Users">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Users"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Users' }]}
        />

        <Card sx={{ position: 'relative' }}>
          {isLoading && <Loading />}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {!!userList.length &&
                    userList.map((user) => {
                      const {
                        id,
                        firstName,
                        lastName,
                        email,
                        isInstructor,
                        emailVerified,
                        avatar,
                        position,
                        isBanned,
                      } = user;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
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
                          <TableCell align="left">{position ? position : '#'}</TableCell>
                          <TableCell align="left">
                            {isInstructor ? 'Instructor' : 'Student'}
                          </TableCell>
                          <TableCell align="left">
                            {emailVerified ? 'Yes' : 'No'}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant={'ghost'}
                              color={isBanned ? 'error' : 'success'}
                            >
                              {sentenceCase(isBanned ? 'banned' : 'active')}
                            </Label>
                          </TableCell>

                          {/* <TableCell align='right'>
                            <UserMoreMenu userId={id} />
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 72 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pagination.totalRows}
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
