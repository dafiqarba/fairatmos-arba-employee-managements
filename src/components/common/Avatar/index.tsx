type AvatarProps = {
  url: string
}

const Avatar = (props: AvatarProps) => {
  const { url } = props

  return (
    <div className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-gray-300 rounded-full overflow-hidden flex shrink-0">
      <img className="w-full h-full p-0" src={url || ''} alt="User Avatar" />
    </div>
  )
}

export default Avatar
