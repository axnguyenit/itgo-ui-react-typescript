// ----------------------------------------------------------------------

import { VariantType } from '~/models';

export const varTranHover = ({
  duration = 0.32,
  ease = [0.43, 0.13, 0.23, 0.96],
}: VariantType) => {
  return { duration, ease };
};

export const varTranEnter = ({
  durationIn = 0.64,
  easeIn = [0.43, 0.13, 0.23, 0.96],
}: VariantType) => {
  const duration = durationIn;
  const ease = easeIn;
  return { duration, ease };
};

export const varTranExit = ({
  durationOut = 0.48,
  easeOut = [0.43, 0.13, 0.23, 0.96],
}: VariantType) => {
  const duration = durationOut;
  const ease = easeOut;

  return { duration, ease };
};
