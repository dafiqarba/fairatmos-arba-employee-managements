import React, { useCallback, useState } from 'react'

import Tag from '../Tag'

type InputTagProps = {
  name?: string
  value: string[]
  maxTags?: number
  placeholder?: string
  onChange: (next: string[]) => void
}

const InputTag = (props: InputTagProps) => {
  const {
    name,
    value,
    onChange,
    maxTags = 5,
    placeholder = 'Type interest and press Enter',
  } = props
  const [text, setText] = useState('')

  const commit = useCallback(
    (raw: string) => {
      const tag = raw.trim()
      if (!tag) return
      if (value.includes(tag)) return
      const next = [...value, tag].slice(0, maxTags)
      onChange(next)
      setText('')
    },
    [value, onChange, maxTags]
  )

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      commit(text)
    }
    if (e.key === 'Backspace' && text === '' && value.length) {
      e.preventDefault()
      onChange(value.slice(0, -1))
    }
  }

  const handleRemove = (text: string) => onChange(value.filter((tag) => tag !== text))

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-400 bg-gray-100 px-3 py-2 outline-none focus:ring-1 focus:ring-slate-400 text-sm sm:text-base">
      {value.map((t) => (
        <Tag key={t} onRemove={handleRemove} removable text={t} />
      ))}
      {value.length < maxTags && (
        <input
          id={name}
          value={text}
          onKeyDown={handleKeydown}
          placeholder={placeholder}
          onBlur={() => commit(text)}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-transparent outline-none font-normal disabled:bg-gray-500 text-sm sm:text-base"
        />
      )}
      {value.length === maxTags && (
        <p className="text-sm sm:text-base text-slate-500">Max {maxTags} reached.</p>
      )}
    </div>
  )
}

export default InputTag
