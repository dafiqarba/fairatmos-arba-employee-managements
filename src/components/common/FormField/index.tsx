type BaseProps = {
  label: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

type FieldsetProps = BaseProps & { as: 'fieldset' }
type InputFieldProps = BaseProps & { as?: 'div'; htmlFor: string }

type FormFieldProps = InputFieldProps | FieldsetProps

const FormField = (props: FormFieldProps) => {
  const { label, required, error, children, className } = props

  if (props.as === 'fieldset') {
    return (
      <fieldset className={className}>
        <legend className="mb-1 block text-sm sm:text-base font-bold text-slate-800">
          {label}
          {required && <span className="inline text-red-600"> *</span>}
        </legend>
        {children}
        {error && <p className="mt-1 text-xs sm:text-sm text-red-600">{error}</p>}
      </fieldset>
    )
  }

  return (
    <div className={className}>
      <label
        className="mb-1 block text-sm sm:text-base font-bold text-slate-800"
        htmlFor={props.htmlFor}
      >
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}

      {error && <p className="mt-1 text-xs sm:text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default FormField
