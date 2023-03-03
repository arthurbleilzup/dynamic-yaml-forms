import { FC, useState } from 'react'
import { useDynamicForm, DynamicFormProps } from '@/components/dynamic/hooks/use-dynamic-form'
import { DynamicInputComponent } from './input'

export const DynamicForm: FC<DynamicFormProps> = (props) => {
  const { inputChange, inputBlur, submit, getValue, fields, isValid } = useDynamicForm(props)
  const [json, setJSON] = useState('')

  return (
    <form style={{ margin: '0 auto', maxWidth: '400px', padding: '24px' }}>
      {fields.filter(f => f.visible).map((input, index) => (
        <DynamicInputComponent key={`input-${index}`} {...input} onChange={inputChange} onBlur={inputBlur} />
      ))}
      <button onClick={e => { e.preventDefault(); setJSON(JSON.stringify(getValue(), null, 2)) }} disabled={!isValid}>View JSON</button>
      {json ? <pre>{json}</pre> : null}
    </form>
  )
}
