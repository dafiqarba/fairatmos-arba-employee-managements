import { cn } from '../../../utils'

type TagProps = {
  onRemove?: (text: string) => void

  text: string
  size?: 'sm' | 'md'
  className?: string
  removable?: boolean // chip behavior if true
  variant?: 'pill' | 'chip'
}

const Tag = (props: TagProps) => {
  const { text, onRemove, variant, className, size = 'sm', removable = false } = props

  const kind = variant ?? (removable ? 'chip' : 'pill')

  return (
    <span
      className={cn(
        'inline-flex justify-center items-center gap-2 select-none',
        size === 'sm' ? 'px-2 py-1 text-sm' : 'px-3 py-1.5 text-sm sm:text-base',
        kind === 'pill' && 'rounded-xl bg-sage-50 text-slate-400',
        kind === 'chip' && 'rounded-full bg-sage-500 text-white',
        className
      )}
    >
      {text}
      {removable && onRemove && (
        <button
          type="button"
          aria-label={`Remove ${text}`}
          onClick={() => onRemove(text)}
          className="w-2 h-2 cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="4" />
            <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="4" />
          </svg>
        </button>
      )}
    </span>
  )
}

export default Tag
