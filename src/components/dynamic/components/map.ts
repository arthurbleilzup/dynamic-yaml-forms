import { YamlInput } from '@/types/yaml-input'
import { DynamicComponent } from '../types'
import { DynamicBool } from './bool'
import { DynamicSelect } from './select'
import { DynamicText } from './text'

export const componentsMap: Record<YamlInput.Type, DynamicComponent<any>> = {
  'bool': DynamicBool,
  'text': DynamicText,
  'select': DynamicSelect,
}