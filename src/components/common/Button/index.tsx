import { cn } from '../../../utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md'
  variant?: 'primary' | 'save' | 'cancel'
}

const Button = (props: ButtonProps) => {
  const { variant = 'primary', size = 'md', className, ...rest } = props

  return (
    <button
      className={cn(
        'rounded-lg font-bold disabled:opacity-60 hover:opacity-90 w-full cursor-pointer',
        size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-base',
        {
          save: 'bg-slate-700 text-white',
          primary: 'bg-green-600 text-white',
          cancel: 'bg-sky-100 text-slate-600',
        }[variant],
        className
      )}
      {...rest}
    />
  )
}

export default Button
