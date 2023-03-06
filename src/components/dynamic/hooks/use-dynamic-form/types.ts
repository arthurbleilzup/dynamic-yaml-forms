import { YamlInput } from '@/types/yaml-input'
import { ChangeEvent, FormEventHandler } from 'react'
import { DynamicComponentHTMLType } from '../../types'

export interface StackSpotDynamicForm {
  getValue: () => Record<string, any>
  inputChange: StackSpotDynamicForm.InputChange
  inputBlur: StackSpotDynamicForm.InputChange
  submit: StackSpotDynamicForm.Submit
  fields: StackSpotDynamicForm.Field[]
  isValid: boolean
}

export namespace StackSpotDynamicForm {
  export type InputChange = (event: ChangeEvent<DynamicComponentHTMLType>) => void
  export type Submit = (callback: () => void) => FormEventHandler<HTMLFormElement>

  export interface Field extends YamlInput {
    visible: boolean
    value: any
    isTouched: boolean
    hasError?: boolean
    errorMessage?: string
  }
}
