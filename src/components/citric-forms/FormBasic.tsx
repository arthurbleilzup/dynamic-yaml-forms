import { get } from 'lodash'
import { FormEvent, ReactNode } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export interface FormProps {
  name: string
  defaultValues?: FieldValues
  children?: ReactNode
  onSubmit?: (params: FieldValues) => unknown
}

function handleGraphqlErrors(error: unknown, methods: UseFormReturn<FieldValues>) {
  const errors: any = get(error, 'cause.extensions.fields')

  Object.keys(errors).forEach((key) => {
    if (methods.getFieldState(key)) {
      methods.setError(key, { type: 'server', message: errors[`${key}`] })
    }
  })
}

const handleFormSubmit = async (
  data: FormEvent<HTMLFormElement>,
  methods: UseFormReturn,
  onError: () => void,
  onSubmit?: (params: Record<string, any>) => Promise<unknown> | unknown,
) => {
  if (!onSubmit) {
    return
  }

  const result = methods.handleSubmit(onSubmit)(data)
  const isPromise = result instanceof Promise

  if (!isPromise) {
    return result
  }

  return result.catch((error) => {
    const isGraphqlError = error.message === 'GraphqlError'

    if (!isGraphqlError) {
      return Promise.reject(error)
    }

    handleGraphqlErrors(error, methods)
    onError()
  })
}

const BasicForm = ({ onSubmit, name, children, methods }: FormProps & { methods: UseFormReturn<FieldValues> }) => {
  return (
    <form
      name={name}
      onSubmit={(data: FormEvent<HTMLFormElement>) => handleFormSubmit(data, methods, () => {}, onSubmit)}
      noValidate
    >
      {children}
    </form>
  )
}

export default BasicForm