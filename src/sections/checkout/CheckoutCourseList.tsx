// @mui
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import Image from '~/components/Image';
import Loading from '~/components/Loading';
import { CartItem } from '~/models';
// utils
import { fCurrency, cloudinary } from '~/utils';

// ----------------------------------------------------------------------

interface CheckoutCourseListProps {
  courses: CartItem[];
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export default function CheckoutCourseList({
  courses,
  onDelete,
  isLoading,
}: CheckoutCourseListProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      {isLoading && <Loading />}
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>

          <TableBody>
            {courses.length > 0 &&
              courses.map((item) => {
                const { id, name, price, priceSale, cover } = item?.course;
                return (
                  <TableRow key={id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                          alt="course image"
                          src={cloudinary.w100(cover)}
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 1.5,
                            mr: 2,
                          }}
                        />
                        <Box>
                          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                            {name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      {priceSale ? fCurrency(priceSale) : fCurrency(price as number)}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton onClick={() => onDelete(item.id)}>
                        <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
