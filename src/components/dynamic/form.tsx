import { FC } from 'react'
import { useDynamicForm, DynamicFormProps } from '@/components/dynamic/hooks/use-dynamic-form'
import { DynamicInputComponent } from './input'
import styles from '@/styles/form.module.css'

export interface DynamicFormComponentProps extends DynamicFormProps {
  submitText?: string
  onSubmit: (formValue: any) => void
}

export const DynamicForm: FC<DynamicFormComponentProps> = ({ submitText = 'Submit Form', onSubmit, ...props }) => {
  const { inputChange, inputBlur, submit, getValue, fields, isValid } = useDynamicForm(props)
  const submitFormCallback = () => onSubmit(getValue())

  return (
    <form onSubmit={submit(submitFormCallback)}>
      {fields.filter(f => f.visible).map((input, index) => (
        <DynamicInputComponent key={`input-${index}`} {...input} onChange={inputChange} onBlur={inputBlur} />
      ))}
      <button type="submit" disabled={!isValid} className={styles.submit}>{submitText}</button>
    </form>
  )
}
