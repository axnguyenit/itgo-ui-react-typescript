import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
// components
import Iconify from '~/components/Iconify';
// utils
import { fCurrency } from '~/utils';

// ----------------------------------------------------------------------

interface CheckoutSummaryProps {
  total: number;
  subtotal: number;
  onEdit?: () => void;
  enableEdit?: boolean;
}

export default function CheckoutSummary({
  total,
  onEdit = () => {},
  subtotal,
  enableEdit = false,
}: CheckoutSummaryProps) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title='Order Summary'
        action={
          enableEdit && (
            <Button size='small' onClick={onEdit} startIcon={<Iconify icon={'eva:edit-fill'} />}>
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant='subtitle2'>{fCurrency(subtotal)}</Typography>
          </Stack>

          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Discount
            </Typography>
            <Typography variant='subtitle2'>0</Typography>
          </Stack>

          <Divider />

          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='subtitle1'>Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant='subtitle1' sx={{ color: 'error.main' }}>
                {fCurrency(total)}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
