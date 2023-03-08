import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import BasicForm, { FormProps } from './FormBasic'

const FormWithProvider = (props: FormProps) => {
  const methods = useForm({ defaultValues: props.defaultValues })

  return (
    <FormProvider {...methods}>
      <BasicForm {...props} methods={methods} />
    </FormProvider>
  )
}

const Form = (props: FormProps) => {
  const useFormMethods = useFormContext()
  const hasFormProvider = !!useFormMethods

  if (hasFormProvider) {
    return <BasicForm {...props} methods={useFormMethods} />
  }

  return <FormWithProvider {...props} />
}

export default Form
