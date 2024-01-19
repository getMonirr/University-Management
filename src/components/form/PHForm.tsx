import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface IPHFormConfig {
  defaultValues?: Record<string, any>;
}

interface IPHFormProps extends IPHFormConfig {
  onSubmit: SubmitHandler<any>;
  children: React.ReactNode;
}

const PHForm = ({ onSubmit, children, defaultValues }: IPHFormProps) => {
  const formConfig: IPHFormConfig = {};

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
