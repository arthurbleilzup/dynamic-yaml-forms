export interface YamlInput {
  label: string
  type: YamlInput.Type
  name: string
  required: boolean
  condition?: YamlInput.Condition | null | undefined
  requirements?: YamlInput.Requirements | null | undefined
  [key: string]: any
}

export namespace YamlInput {
  export interface Condition {
    variable: string
    operator: string
    value: string
  }

  export interface Requirements {
    pattern: string
    message: string
  }

  export type Type = 'text' | 'select' | 'bool'

  export const defaultValues: Record<Type, any> = {
    'text': '',
    'select': '',
    'bool': false,
  }
}
