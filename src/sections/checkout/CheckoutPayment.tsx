import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import paymentApi from '~/api/paymentApi';
import { FormProvider } from '~/components/hook-form';
import Iconify from '~/components/Iconify';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { PaymentOption } from '~/models';
import { onBackStep, onGotoStep } from '~/redux/slices/cart';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import CheckoutSummary from './CheckoutSummary';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    value: 'momo',
    title: 'Pay with MoMo',
    description:
      'You will be redirected to MoMo website to complete your purchase securely.',
    icons: [`${window.location.origin}/assets/images/logo-momo.png`],
  },
];

export default function CheckoutPayment() {
  const dispatch = useAppDispatch();

  const { total, discount, subtotal } = useAppSelector((state) => state.cart);

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step: number) => {
    dispatch(onGotoStep(step));
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('Payment is required!'),
  });

  interface FormValues {
    delivery: string;
    payment: string;
  }

  const defaultValues: FormValues = {
    delivery: '',
    payment: '',
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      const { payUrl } = await paymentApi.getPayUrl();
      window.location.href = payUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CheckoutPaymentMethods paymentOptions={PAYMENT_OPTIONS} />
          <Button
            size='small'
            color='inherit'
            onClick={handleBackStep}
            startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary
            enableEdit
            total={total}
            subtotal={subtotal}
            discount={discount}
            onEdit={() => handleGotoStep(0)}
          />
          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            loading={isSubmitting}
          >
            Complete Order
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
