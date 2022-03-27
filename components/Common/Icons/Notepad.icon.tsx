const NotepadIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 6.1875V13.5C15 15.75 13.6575 16.5 12 16.5H6C4.3425 16.5 3 15.75 3 13.5V6.1875C3 3.75 4.3425 3.1875 6 3.1875C6 3.6525 6.18748 4.0725 6.49498 4.38C6.80248 4.6875 7.2225 4.875 7.6875 4.875H10.3125C11.2425 4.875 12 4.1175 12 3.1875C13.6575 3.1875 15 3.75 15 6.1875Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.1875C12 4.1175 11.2425 4.875 10.3125 4.875H7.6875C7.2225 4.875 6.80248 4.6875 6.49498 4.38C6.18748 4.0725 6 3.6525 6 3.1875C6 2.2575 6.7575 1.5 7.6875 1.5H10.3125C10.7775 1.5 11.1975 1.6875 11.505 1.995C11.8125 2.3025 12 2.7225 12 3.1875Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 9.75H9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 12.75H12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default NotepadIcon
