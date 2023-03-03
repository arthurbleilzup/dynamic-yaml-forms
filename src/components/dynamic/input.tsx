import { StackSpotDynamicForm } from '@/components/dynamic/hooks/use-dynamic-form/types'
import styles from '@/styles/inputs.module.css'
import { FC } from 'react'
import { componentsMap } from './components/map'

interface DynamicInputComponentProps extends StackSpotDynamicForm.Field {
}

export const DynamicInputComponent: FC<DynamicInputComponentProps> =
  ({ type, label, required, condition, hasError, errorMessage, isTouched, ...props }) => {
    const displayError = isTouched && hasError && errorMessage
    return (
      <div className={`${type === 'bool' ? styles.formFieldCheck : styles.formField} ${displayError ? styles.hasError : ''}`}>
        <label>{label}{required && '*'}</label>
        {componentsMap[type](props)}
        {displayError ? (<span className={styles.errorMessage}>{errorMessage}</span>) : null}
      </div>
    )
  }
