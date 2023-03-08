import { Box, Flex, IconBox, Input, Label } from '@citric/core'
import { TimesCircle } from '@citric/icons'
import { FormHelper, FormItem as CitricFormItem } from '@citric/ui'
import { ComponentPropsWithoutRef, ElementType } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

interface FormGroupProps<T extends ElementType> {
  name: string
  component?: T
  label?: string
  registerOptions?: RegisterOptions
  required?: boolean
}

type Props<T extends ElementType> = FormGroupProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FormGroupProps<T>>

const FormGroup = <T extends ElementType = typeof Input>({
  name,
  component = Input,
  label,
  registerOptions = {},
  required,
  ...props
}: Props<T>) => {
  const Component = component as unknown as ElementType
  const { register, formState } = useFormContext()
  const formItemError = formState.errors?.[name]

  return (
    <CitricFormItem>
      {label && (<Label appearance="body2" htmlFor={name}>{label}</Label>)}

      <Component
        {...props}
        {...register(name, { required: required ? 'Required field' : false, ...registerOptions })}
        required={required}
      />

      {formItemError && (
        <Flex alignItems="center">
          <IconBox radius="full" size="xs" sx={{ bg: 'danger.500' }}>
            <TimesCircle />
          </IconBox>
          <Box ml="3">
            <FormHelper colorScheme="danger">{(formItemError.message as string) || 'Invalid field'}</FormHelper>
          </Box>
        </Flex>
      )}
    </CitricFormItem>
  )
}

export default FormGroup
