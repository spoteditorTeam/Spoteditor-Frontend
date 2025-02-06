interface PenIconProps {
  className?: string;
}

function PenIcon({ className }: PenIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 16 17"
      fill="none"
      className={className}
    >
      <path
        d="M2.6 13.8062V12.1548L11.2172 3.53762C11.3734 3.38141 11.6266 3.38141 11.7828 3.53762L12.8686 4.62341C13.0248 4.77962 13.0248 5.03288 12.8686 5.18909L4.25147 13.8062H2.6Z"
        strokeWidth="1.2"
      />
      <line x1="6.64062" y1="13.8062" x2="12.7109" y2="13.8062" stroke="black" strokeWidth="1.2" />
      <line x1="11.6285" y1="6.70259" x2="9.48592" y2="4.53037" stroke="black" strokeWidth="1.2" />
    </svg>
  );
}

export default PenIcon;
