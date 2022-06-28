import { ChangeEvent, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '~/components/Page';
import Loading from '~/components/Loading';
import Iconify from '~/components/Iconify';
import Scrollbar from '~/components/Scrollbar';
import TableListHead from '~/components/TableListHead';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
// routes
import { PATH_DASHBOARD } from '~/routes/paths';
// sections
import { RoadmapMoreMenu } from '~/sections/@dashboard/roadmaps';
// api
import { roadmapApi } from '~/api';
import { HeaderLabel, PaginationParams, Roadmap } from '~/models';

// ----------------------------------------------------------------------

const TABLE_HEAD: HeaderLabel[] = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'slogan', label: 'Slogan', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

export default function Roadmaps() {
  const [roadmapList, setRoadmapList] = useState<Roadmap[]>([]);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [pagination, setPagination] = useState<PaginationParams>({
    _limit: 5,
    _page: page,
    _totalRows: rowsPerPage,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getRoadmaps = async () => {
    setIsLoading(true);
    const params = {
      _page: page,
      _limit: rowsPerPage,
    };

    try {
      const { roadmaps, pagination } = await roadmapApi.getAll(params);
      setRoadmapList(roadmaps);
      pagination && setPagination(pagination);
    } catch (error) {}
    setIsLoading(false);
  };

  const handleDeleteRoadmap = async (roadmapId: string) => {
    try {
      await roadmapApi.remove(roadmapId);
      getRoadmaps();
    } catch (error) {}
  };

  useEffect(() => {
    getRoadmaps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const emptyRows =
    page > 0 ? Math.max(0, rowsPerPage - roadmapList.length) : 0;

  return (
    <Page title='Roadmaps'>
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading='Roadmaps'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Roadmaps' },
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_DASHBOARD.roadmaps.create}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Roadmap
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
                  {!!roadmapList.length &&
                    roadmapList.map((roadmap) => {
                      const { _id, name, slogan, description } = roadmap;

                      return (
                        <TableRow hover key={_id} tabIndex={-1} role='checkbox'>
                          <TableCell>{name}</TableCell>
                          <TableCell align='left'>{slogan}</TableCell>
                          <TableCell align='left'>{description}</TableCell>
                          <TableCell align='right'>
                            <RoadmapMoreMenu
                              roadmapId={_id as string}
                              roadmapName={name}
                              onDelete={() =>
                                handleDeleteRoadmap(_id as string)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 68 * emptyRows }}>
                      <TableCell colSpan={4} />
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
