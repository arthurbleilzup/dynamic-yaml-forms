import { YamlInput } from '@/types/yaml-input'
import { FC } from 'react'
import { StackSpotDynamicForm } from './hooks/use-dynamic-form/types'

export type DynamicComponentHTMLType = HTMLInputElement | HTMLSelectElement

export type DynamicComponent<T> = FC<DynamicComponentProps<T>>

export type DynamicComponentProps<T> = 
  Omit<YamlInput, 'type' | 'label' | 'required' | 'condition'> & 
  { 
    onChange: StackSpotDynamicForm.InputChange
    onBlur: StackSpotDynamicForm.InputChange
  } &
  T
