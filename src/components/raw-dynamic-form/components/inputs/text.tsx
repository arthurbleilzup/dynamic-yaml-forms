import { DynamicComponent } from '../../types'

interface DynamicTextProps {
  placeholder: string
}

export const DynamicText: DynamicComponent<DynamicTextProps> = ({ name, placeholder, onChange, onBlur }) => {
  return (
    <input
      onChange={onChange}
      onBlur={onBlur}
      type="text"
      name={name}
      placeholder={placeholder}
    />
  )
}
