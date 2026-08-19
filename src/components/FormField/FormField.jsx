import './FormField.css'

function FormField({ id, label, error, hint, children, ...inputProps }) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={error ? 'form-field has-error' : 'form-field'}>
      <label htmlFor={id}>{label}</label>

      {children || (
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          {...inputProps}
        />
      )}

      {hint ? (
        <p className="form-field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p className="form-field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default FormField
