import { DynamicComponent } from '../types'

export const DynamicBool: DynamicComponent<void> = ({ name, placeholder, onChange }) => {
  return (
    <input
      onChange={onChange}
      type="checkbox"
      name={name}
      placeholder={placeholder}
    />
  )
}
