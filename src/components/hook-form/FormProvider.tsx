import React, { ReactNode, FormEventHandler } from 'react';
import { FormProvider as RHFormProvider } from 'react-hook-form';

// ----------------------------------------------------------------------

export interface FormProviderProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  methods: any;
}

export default function FormProvider({
  children,
  onSubmit,
  methods,
}: FormProviderProps) {
  return (
    <RHFormProvider {...methods}>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        {children}
      </form>
    </RHFormProvider>
  );
}
