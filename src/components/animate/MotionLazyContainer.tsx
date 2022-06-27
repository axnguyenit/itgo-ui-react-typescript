import { ReactNode } from 'react';
import { LazyMotion } from 'framer-motion';

// ----------------------------------------------------------------------

const loadFeatures = () => import('./features.js').then((res) => res.default);

interface MotionLazyContainerProps {
  children: ReactNode;
}

export default function MotionLazyContainer({
  children,
}: MotionLazyContainerProps) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
