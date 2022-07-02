import { ChangeEvent, useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Typography,
  Avatar,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '~/routes/paths';
// components
import Page from '~/components/Page';
import Loading from '~/components/Loading';
import Scrollbar from '~/components/Scrollbar';
import TableListHead from '~/components/TableListHead';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
// sections
import { ApplicationMoreMenu } from '~/sections/@dashboard/applications';
import { cloudinary } from '~/utils';
import { applicationApi } from '~/api';
import {
  ApplicationDetails,
  HeaderLabel,
  ListParams,
  PaginationParams,
} from '~/models';

// ----------------------------------------------------------------------

const TABLE_HEAD: HeaderLabel[] = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'position', label: 'Working position', alignRight: false },
  { id: 'cv', label: 'CV', alignRight: false },
  { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

export default function Applications() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [applicationList, setApplications] = useState<ApplicationDetails[]>([]);
  const [pagination, setPagination] = useState<PaginationParams>({
    _limit: 5,
    _page: page,
    _totalRows: rowsPerPage,
  });

  const getApplications = async () => {
    const params: ListParams = {
      _page: page,
      _limit: rowsPerPage,
    };

    setIsLoading(true);
    try {
      const { applications, pagination } = await applicationApi.getAll(params);
      setApplications(applications);
      pagination && setPagination(pagination);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    getApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleApprove = async (id: string) => {
    setIsLoading(true);
    try {
      await applicationApi.approve(id);
      getApplications();
    } catch (error) {}
    setIsLoading(false);
  };

  const handleDeny = async (id: string) => {
    setIsLoading(true);
    try {
      await applicationApi.deny(id);
      getApplications();
    } catch (error) {}
    setIsLoading(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, rowsPerPage - applicationList?.length) : 0;

  return (
    <Page title="Applications">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Applications"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Applications' },
          ]}
        />

        <Card sx={{ position: 'relative' }}>
          {isLoading && <Loading />}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {!!applicationList?.length &&
                    applicationList?.map((application) => (
                      <TableRow
                        hover
                        key={application?._id}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Avatar
                            alt={application?.user?.firstName}
                            src={cloudinary.w100(application?.user?.avatar)}
                            sx={{ mr: 2 }}
                          />
                          <Typography variant="subtitle2" noWrap>
                            {application?.user?.firstName}{' '}
                            {application?.user?.lastName}
                          </Typography>
                        </TableCell>
                        <TableCell>{application?.user?.email}</TableCell>
                        <TableCell>{application?.position}</TableCell>
                        <TableCell align="left">{application?.cv}</TableCell>
                        <TableCell align="right">
                          <ApplicationMoreMenu
                            applicationId={application?._id as string}
                            name={`${application?.user?.firstName} ${application?.user?.lastName}`}
                            onDeny={() =>
                              handleDeny(application?._id as string)
                            }
                            onApprove={() =>
                              handleApprove(application?._id as string)
                            }
                            cv={application.cv}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
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
