import { Button, Card, CardHeader, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import cartApi from '~/api/cartApi';
import paymentApi from '~/api/paymentApi';
import EmptyContent from '~/components/EmptyContent';
import Iconify from '~/components/Iconify';
import Scrollbar from '~/components/Scrollbar';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { Payment } from '~/models';
import { deleteCart, getCartFromServer, onNextStep } from '~/redux/slices/cart';
import { PATH_HOME } from '~/routes/paths';
import { handleError } from '~/utils';
import CheckoutCourseList from './CheckoutCourseList';
import CheckoutSummary from './CheckoutSummary';

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
        const data: Payment = {
          transId: transId as string,
          message: message as string,
          amount: Number(amount),
          resultCode,
          cart,
        };

        await paymentApi.add(data);
        setSearchParams({});
        getCartFromServer();
      } catch (error) {
        console.error(error);
      }
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
