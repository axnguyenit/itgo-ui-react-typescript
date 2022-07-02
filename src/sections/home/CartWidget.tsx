import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// redux
import { selectCart } from '~/redux/slices/cart';
// routes
import { PATH_HOME } from '~/routes/paths';
// components
import Iconify from '~/components/Iconify';
// hooks
import { useAppSelector } from '~/hooks';

// ----------------------------------------------------------------------

const RootStyle = styled(RouterLink)(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

function CartWidget() {
  const { cart } = useAppSelector(selectCart);

  return (
    <RootStyle to={PATH_HOME.checkout}>
      <Badge showZero badgeContent={cart.length} color="error" max={99}>
        <Iconify icon={'eva:shopping-cart-fill'} width={24} height={24} />
      </Badge>
    </RootStyle>
  );
}

export default memo(CartWidget);
