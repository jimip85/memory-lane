interface ButtonProps {
  onClick: (e: React.FormEvent) => void
  label: string
  backgroundColor?: string
}

const Button = ({ onClick, label, backgroundColor = 'black' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 text-white font-semibold rounded-md ${backgroundColor} focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#050708] hover:ring-2 hover:ring-opacity-50 hover:ring-[#050708]`}
    >
      {label}
    </button>
  )
}

export default Button
