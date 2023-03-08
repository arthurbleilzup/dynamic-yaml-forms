import { Button } from '@citric/core'
import { FormProvider, useFormContext } from 'react-hook-form'
import BasicForm from './FormBasic'
import { useDynamicReactHookForm } from './hooks/use-dynamic-react-hook-form'
import { DynamicFormProps } from './hooks/use-dynamic-react-hook-form/types'

const FormWithProvider = (props: DynamicFormProps) => {
  const { form, children } = useDynamicReactHookForm(props)
  const formChildren = [
    ...children,
    <Button key="submitFormButtonKey" type="submit" disabled={!form.formState.isValid}>Submit</Button>
  ]

  return (
    <FormProvider {...form}>
      <BasicForm {...props} methods={form}>{formChildren}</BasicForm>
    </FormProvider>
  )
}

const DynamicForm = (props: DynamicFormProps) => {
  const useFormMethods = useFormContext()
  const hasFormProvider = !!useFormMethods

  if (hasFormProvider) {
    return <BasicForm {...props} methods={useFormMethods} />
  }

  return <FormWithProvider {...props} />
}

export default DynamicForm
