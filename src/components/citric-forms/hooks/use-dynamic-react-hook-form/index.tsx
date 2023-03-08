
import { YamlInput } from '@/types/yaml-input'
import { useForm } from 'react-hook-form'
import { ConditionalDynamicInput, DynamicInput } from './components'
import { DynamicFormProps, DynamicReactHookFormReturn } from './types'

const getFieldDefaultValue = (type: YamlInput.Type) => YamlInput.defaultValues[type]

const getDefaultValues = (inputs: YamlInput[]): Record<string, any> => {
  const defaultValues: Record<string, any> = {}
  for (let input of inputs) {
    if (!input.condition) {
      const { name, type } = input
      defaultValues[name] = getFieldDefaultValue(type)
    }
  }
  return defaultValues
}

export const useDynamicReactHookForm = ({ inputs }: DynamicFormProps): DynamicReactHookFormReturn => {
  const defaultValues = getDefaultValues(inputs || [])
  const form = useForm({ defaultValues })
  const children = (inputs || []).map((input, index) => {
    if (input.condition) {
      return <ConditionalDynamicInput key={`${input.name}-${index}-conditional-input`} {...{ form, input }}></ConditionalDynamicInput>
    }
    return <DynamicInput key={`${input.name}-${index}-dynamic-input`} input={input} unregister={form.unregister} />
  })
  
  return { form, children }
}
