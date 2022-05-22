// ----------------------------------------------------------------------

import { VariantType } from '@/models';

export const varContainer = ({ staggerIn = 0.05 }: VariantType) => {
  const delayIn = staggerIn;
  const staggerOut = staggerIn;

  return {
    animate: {
      transition: {
        staggerChildren: staggerIn,
        delayChildren: delayIn,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerOut,
        staggerDirection: -1,
      },
    },
  };
};
