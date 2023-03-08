import { YamlInput } from '@/types/yaml-input'
import { FC, useLayoutEffect } from 'react'
import { Option } from '@citric/core'
import { UseFormReturn, UseFormUnregister, useWatch } from 'react-hook-form'
import FormGroup from '../../../FormGroup'
import { dynamicComponentsMap } from '../types'

interface DynamicInputProps {
  input: YamlInput,
  unregister: UseFormUnregister<Record<string, any>>
}

const getSelectOptions = (items: string[]) => {
  const options = ((items.map((item, index) => (<Option key={index} value={item}>{item}</Option>))))
  return [<Option key="-1" value=""></Option>, ...options]
}

export const DynamicInput: FC<DynamicInputProps> = ({ input, unregister }) => {
  const { name, label, required, type, condition, requirements, ...props } = input
  const registerOptions = {
    ...props,
    ...(required && requirements ? { pattern: { value: new RegExp(requirements.pattern), message: requirements.message } } : {}),
  }

  useLayoutEffect(() => {
    return () => unregister(name)
  }, [name, unregister])

  return (
    <FormGroup {...{ name, label, required, registerOptions, component: dynamicComponentsMap[type] }}>
      {type === 'select' ? getSelectOptions(props['items'] || []) : null}
    </FormGroup>
  )
}

const getValueToEvaluate = (value: any): any => {
  if (typeof value === 'string') return `'${value}'`
  return value
}

const canBeRendered = (newValue: any, operator: string, expectedValue: any) =>
  eval(`${getValueToEvaluate(newValue)} ${operator} ${getValueToEvaluate(expectedValue)}`)


interface ConditionalDynamicInputProps {
  form: UseFormReturn,
  input: YamlInput
}

export const ConditionalDynamicInput: FC<ConditionalDynamicInputProps> = ({ form: { control, unregister }, input }) => {
  const value = useWatch({
    name: input.condition!.variable,
    control,
  })

  if (canBeRendered(value, input.condition!.operator, input.condition!.value)) {
    return <DynamicInput {...{ input, unregister }} />
  }
  return null
}