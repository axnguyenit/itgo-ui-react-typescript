import { ReactNode } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
//
import { Color } from '~/models';

// ----------------------------------------------------------------------

type VariantType = 'filled' | 'outlined' | 'ghost';

interface RootStyleProps {
  ownerState: {
    color: Color | 'default';
    variant: VariantType;
  };
}

const RootStyle = styled('span')<RootStyleProps>(({ theme, ownerState }) => {
  const { color, variant } = ownerState;

  const styleFilled = (color: Color) => ({
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
  });

  const styleOutlined = (color: Color) => ({
    color: theme.palette[color].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[color].main}`,
  });

  const styleGhost = (color: Color) => ({
    color: theme.palette[color]['dark'],
    backgroundColor: alpha(theme.palette[color].main, 0.16),
  });

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'default'
      ? {
          ...(variant === 'filled' && { ...styleFilled(color) }),
          ...(variant === 'outlined' && { ...styleOutlined(color) }),
          ...(variant === 'ghost' && { ...styleGhost(color) }),
        }
      : {
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey[500_32]}`,
          }),
          ...(variant === 'ghost' && {
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.grey[500_16],
          }),
        }),
  };
});

// ----------------------------------------------------------------------

interface LabelProps {
  color?: Color | 'default';
  variant?: VariantType;
  children: ReactNode;

  [key: string]: any;
}

export default function Label({
  color = 'default',
  variant = 'ghost',
  children,
  ...other
}: LabelProps) {
  return (
    <RootStyle ownerState={{ color, variant }} {...other}>
      {children}
    </RootStyle>
  );
}
