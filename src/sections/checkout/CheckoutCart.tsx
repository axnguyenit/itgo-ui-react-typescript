import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import { Button, Card, CardHeader, Grid, Typography } from '@mui/material';
// router
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
// components
import Iconify from '~/components/Iconify';
import Scrollbar from '~/components/Scrollbar';
import EmptyContent from '~/components/EmptyContent';
import CheckoutSummary from './CheckoutSummary';
import CheckoutCourseList from './CheckoutCourseList';
// hooks
import { useAppDispatch, useAppSelector } from '~/hooks';
// api
import { cartApi, paymentApi } from '~/api';
import { Payment } from '~/models';
// redux
import { deleteCart, getCartFromServer, onNextStep } from '~/redux/slices/cart';
import { PATH_HOME } from '~/routes/paths';
//
import { handleError } from '~/utils';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cart, total, discount, subtotal } = useAppSelector(
    (state) => state.cart
  );
  const totalItems = cart.length;
  const isEmptyCart = cart.length === 0;

  const resultCode = searchParams.get('resultCode');

  // transId, amount, orderId

  const storeTransaction = async () => {
    if (resultCode && Number(resultCode) >= 0 && cart.length) {
      try {
        const transId = searchParams.get('transId');
        const message = searchParams.get('message');
        const amount = searchParams.get('amount');

        if (!transId || !message) return;

        const data: Payment = {
          transId,
          message,
          amount: Number(amount),
          resultCode,
          cart,
        };

        await paymentApi.add(data);
        setSearchParams({});
        dispatch(getCartFromServer());
      } catch (error) {}
    }
  };

  useEffect(() => {
    storeTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultCode, cart]);

  const handleDeleteCart = async (cartItemId: string) => {
    try {
      await cartApi.removeItem(cartItemId);
      dispatch(deleteCart(cartItemId));
    } catch (error) {
      const err = handleError(error);
      enqueueSnackbar(err.errors[0].msg, { variant: 'warning' });
    }
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant='h6'>
                Shopping Cart
                <Typography component='span' sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} courses)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <CheckoutCourseList courses={cart} onDelete={handleDeleteCart} />
            </Scrollbar>
          ) : (
            <EmptyContent
              title='Cart is empty'
              description='Look like you have no items in your shopping cart.'
              img={`${window.location.origin}/assets/images/illustration_empty_cart.svg`}
            />
          )}
        </Card>

        <Button
          color='inherit'
          component={RouterLink}
          to={PATH_HOME.courses.root}
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          Continue Shopping
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary
          total={total}
          discount={discount}
          subtotal={subtotal}
        />
        <Button
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          disabled={cart.length === 0}
          onClick={handleNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
