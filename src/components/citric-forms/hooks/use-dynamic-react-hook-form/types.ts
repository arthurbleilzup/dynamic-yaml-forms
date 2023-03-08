import { Checkbox, Select, Input } from '@citric/core'
import { YamlInput } from '@/types/yaml-input'
import { FormProps } from '../../FormBasic'
import { UseFormReturn } from 'react-hook-form'
import { ReactElement } from 'react'

export const dynamicComponentsMap: Record<YamlInput.Type, React.FunctionComponent> = {
  'bool': Checkbox,
  'text': Input,
  'select': Select,
}

export interface DynamicFormProps extends Omit<FormProps, 'children' | 'defaultValues'> {
  inputs?: YamlInput[]
}

export interface DynamicReactHookFormReturn {
  form: UseFormReturn
  children: ReactElement[]
}