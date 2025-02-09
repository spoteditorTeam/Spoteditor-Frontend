interface XIconProps {
  className?: string;
}

function XIcon({ className }: XIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 34 35"
      fill="none"
      className={className}
    >
      <path
        d="M23.0106 11.3194L10.9897 23.3402M23.0106 23.3402L10.9897 11.3193"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default XIcon;
