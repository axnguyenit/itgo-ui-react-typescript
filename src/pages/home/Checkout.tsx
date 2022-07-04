import { useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector,
} from '@mui/material';
// redux
import { getCart } from '~/redux/slices/cart';
// hooks
import { useAppDispatch, useAppSelector } from '~/hooks';
// components
import Page from '~/components/Page';
import Iconify from '~/components/Iconify';
// sections
import { CheckoutCart, CheckoutPayment } from '~/sections/checkout';

// ----------------------------------------------------------------------

const STEPS = ['Shopping Cart', 'Payment'];

const Connector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function Checkout() {
  const dispatch = useAppDispatch();
  const { cart, activeStep } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart(cart));
  }, [dispatch, cart]);

  return (
    <Page title="Checkout">
      <Container maxWidth={'lg'} sx={{ mt: 11 }}>
        <Grid container justifyContent={'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<Connector />}
            >
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={StepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled',
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {activeStep === 0 && <CheckoutCart />}
        {activeStep === 1 && <CheckoutPayment />}
      </Container>
    </Page>
  );
}

interface StepIconProps {
  active: boolean;
  completed: boolean;
}

function StepIcon({ active, completed }: StepIconProps) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Iconify
          icon={'eva:checkmark-fill'}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}
