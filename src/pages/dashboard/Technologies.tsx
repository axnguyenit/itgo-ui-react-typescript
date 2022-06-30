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
// routes
import { PATH_DASHBOARD } from '~/routes/paths';
// components
import Page from '~/components/Page';
import Image from '~/components/Image';
import Iconify from '~/components/Iconify';
import Loading from '~/components/Loading';
import Scrollbar from '~/components/Scrollbar';
import TableListHead from '~/components/TableListHead';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
// sections
import { TechnologyMoreMenu } from '~/sections/@dashboard/technologies';
import { cloudinary } from '~/utils';
import { technologyApi } from '~/api';
import { HeaderLabel, ListParams, PaginationParams, Technology } from '~/models';

// ----------------------------------------------------------------------

const TABLE_HEAD: HeaderLabel[] = [
  { id: 'image', label: 'Image', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'tag', label: 'Tag', alignRight: false },
  { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

export default function Technologies() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [technologyList, setTechnologyList] = useState<Technology[]>([]);
  const [pagination, setPagination] = useState<PaginationParams>({
    _limit: 5,
    _page: page,
    _totalRows: rowsPerPage,
  });

  const getTechnologies = async () => {
    const params: ListParams = {
      _page: page,
      _limit: rowsPerPage,
    };

    setIsLoading(true);
    try {
      const { technologies, pagination } = await technologyApi.getAll(params);
      setTechnologyList(technologies);
      pagination && setPagination(pagination);
    } catch (error) {}
    setIsLoading(false);
  };

  const handleDeleteTechnology = async (technologyId: string) => {
    setIsLoading(true);
    try {
      await technologyApi.remove(technologyId);
      getTechnologies();
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    getTechnologies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - technologyList.length) : 0;

  return (
    <Page title='Technologies'>
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading='Technologies'
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Technologies' }]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_DASHBOARD.technologies.create}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Technology
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
                  {!!technologyList.length &&
                    technologyList.map((technology) => {
                      const { _id, name, tag, image } = technology;

                      return (
                        <TableRow hover key={_id} tabIndex={-1} role='checkbox'>
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                            <Image
                              disabledEffect
                              alt={name}
                              src={cloudinary.w150(image)}
                              sx={{ borderRadius: 0.5, width: 90, height: 48, mr: 2 }}
                            />
                          </TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell align='left'>{tag}</TableCell>

                          <TableCell align='right'>
                            <TechnologyMoreMenu
                              technologyId={_id as string}
                              technologyName={name}
                              onDelete={() => handleDeleteTechnology(_id as string)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 80 * emptyRows }}>
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
