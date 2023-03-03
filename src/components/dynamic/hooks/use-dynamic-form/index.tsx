import { YamlInput } from '@/types/yaml-input'
import { ChangeEvent, useState } from 'react'
import { DynamicComponentHTMLType } from '../../types'
import { StackSpotDynamicForm } from './types'

export interface DynamicFormProps {
  inputs: YamlInput[]
}

const getDefaultValue = (type: YamlInput.Type) => YamlInput.defaultValues[type]

const getValueToEvaluate = (value: any): any => {
  if (typeof value === 'string') return `'${value}'`
  return value
}

const triggerConditions = (changedFields: StackSpotDynamicForm.Field[], source: string, newValue: any): void => {
  const fieldsToEvaluate = changedFields.filter(f => f.condition?.variable === source) ?? []
  for (let fte of fieldsToEvaluate) {
    fte.visible = eval(`${getValueToEvaluate(newValue)} ${fte.condition!.operator} ${getValueToEvaluate(fte.condition!.value)}`)
    if (!fte.visible) {
      fte.value = getDefaultValue(fte.type)
    }
  }
}

const getFieldValue = (type: YamlInput.Type, event: ChangeEvent<DynamicComponentHTMLType>): any => (
  type === 'bool' ? (event.target as HTMLInputElement).checked : event.target.value
)

const validateField = (field: StackSpotDynamicForm.Field) => {
  const { required, value, requirements } = field
  field.hasError = (required && (!value || (requirements && !(new RegExp(requirements.pattern).test(value))))) || false
  field.errorMessage = (field.hasError ? (requirements ? requirements.message : 'Required field') : '')
}

const isFormValid = (fields: StackSpotDynamicForm.Field[]): boolean => (!fields.filter(f => f.visible).some(f => f.hasError))

export const useDynamicForm = ({ inputs }: DynamicFormProps): StackSpotDynamicForm => {
  const [isValid, setIsValid] = useState<boolean>(false)
  const [fields, setFields] = useState<StackSpotDynamicForm.Field[]>(
    inputs.map(input => ({
      ...input,
      isTouched: false,
      visible: !input.condition,
      value: getDefaultValue(input.type),
    }))
  )

  const doChangesLifecycle = (changedFields: StackSpotDynamicForm.Field[], source: string, newValue: any) => {
    triggerConditions(changedFields, source, newValue)
    setFields(changedFields)
    setIsValid(isFormValid(fields))
  }

  const inputChange = (event: ChangeEvent<DynamicComponentHTMLType>) => {
    const changedFields = [...fields]
    const eventField = changedFields.find(f => f.name === event.target.name)
    if (eventField) {
      eventField.value = getFieldValue(eventField.type, event)
      validateField(eventField)
      doChangesLifecycle(changedFields, eventField.name, eventField.value)
    }
  }

  const inputBlur = (event: ChangeEvent<DynamicComponentHTMLType>) => {
    const evaluatedFields = [...fields]
    const eventField = evaluatedFields.find(f => f.name === event.target.name)
    if (eventField && !eventField.isTouched) eventField.isTouched = true
    evaluatedFields.forEach(cf => validateField(cf))
    setFields(evaluatedFields)
    setIsValid(isFormValid(fields))
  }

  const submit = (callback: () => void) => (event: Event) => {
    event.preventDefault()
    callback()
  }

  const getValue = (): Record<string, any> => (
    fields.filter(f => f.visible)
      .map(f => ({ [f.name]: f.value }))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {})
  )

  return { inputChange, inputBlur, submit, fields, getValue, isValid }
}
