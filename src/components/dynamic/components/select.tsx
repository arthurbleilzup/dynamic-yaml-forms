import { DynamicComponent } from '../types'

interface DynamicSelectProps {
  items: string[]
}

export const DynamicSelect: DynamicComponent<DynamicSelectProps> = ({ name, items, value, onChange, onBlur }) => {
  return (
    <select name={name} onChange={onChange} onBlur={onBlur}>
      <option key="-1" value=""></option>
      {items.map((item, index) => (<option key={index} value={item}>{item}</option>))}
    </select>
  )
}
