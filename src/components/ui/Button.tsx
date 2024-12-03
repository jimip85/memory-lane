interface ButtonProps {
  onClick: (e: React.FormEvent) => void
  label: string
  backgroundColor?: string
  ariaLabel?: string
}

const Button = ({
  onClick,
  label,
  backgroundColor = 'black',
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 text-white font-semibold rounded-md ${backgroundColor} focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#050708] hover:ring-2 hover:ring-opacity-50 hover:ring-[#050708]`}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  )
}

export default Button
