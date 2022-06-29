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
import Loading from '~/components/Loading';
import Scrollbar from '~/components/Scrollbar';
import TableListHead from '~/components/TableListHead';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
// sections
import { InstructorMoreMenu } from '~/sections/@dashboard/instructors';
import { userApi } from '~/api';
import { cloudinary } from '~/utils';
import { HeaderLabel, ListParams, PaginationParams, User } from '~/models';

// ----------------------------------------------------------------------

const TABLE_HEAD: HeaderLabel[] = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'position', label: 'Position', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

export default function Instructors() {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [userList, setInstructorList] = useState<Partial<User>[]>([]);
  const [pagination, setPagination] = useState<PaginationParams>({
    _limit: 5,
    _page: page,
    _totalRows: rowsPerPage,
  });

  const getInstructors = async () => {
    setIsLoading(true);
    const params: ListParams = {
      _page: page,
      _limit: rowsPerPage,
    };

    try {
      const { instructors, pagination } = await userApi.getAllInstructors(params);
      setInstructorList(instructors);
      setPagination(pagination);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    getInstructors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - userList.length) : 0;

  return (
    <Page title='Instructors'>
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading='Instructors'
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Instructors' }]}
        />

        <Card sx={{ position: 'relative' }}>
          {isLoading && <Loading />}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {!!userList.length &&
                    userList.map((user) => {
                      const { _id, firstName, lastName, email, emailVerified, avatar, position, isBanned } = user;

                      return (
                        <TableRow hover key={_id} tabIndex={-1} role='checkbox'>
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt={firstName} src={cloudinary.w100(avatar)} sx={{ mr: 2 }} />
                            <Typography variant='subtitle2' noWrap>
                              {firstName} {lastName}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>{email}</TableCell>
                          <TableCell align='left'>{position ? position : '#'}</TableCell>
                          <TableCell align='left'>{emailVerified ? 'Yes' : 'No'}</TableCell>
                          <TableCell align='left'>
                            <Label variant={'ghost'} color={isBanned ? 'error' : 'success'}>
                              {sentenceCase(isBanned ? 'banned' : 'active')}
                            </Label>
                          </TableCell>

                          <TableCell align='right'>
                            <InstructorMoreMenu userId={_id as string} />
                          </TableCell>
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
            component='div'
            count={pagination._totalRows}
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
