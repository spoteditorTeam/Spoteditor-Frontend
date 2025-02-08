interface BookMarkIconProps {
  className?: string;
}

function BookMarkIcon({ className }: BookMarkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      hanging="100%"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M10.435 13.5675L9.99985 13.2576L9.56473 13.5675L5.31155 16.5969C5.14604 16.7148 4.91651 16.5965 4.91651 16.3933L4.91653 3.5C4.91653 3.36193 5.02845 3.25 5.16653 3.25L14.8332 3.25C14.9713 3.25 15.0832 3.36193 15.0832 3.5V16.3933C15.0832 16.5965 14.8536 16.7148 14.6881 16.5969L10.435 13.5675Z"
        stroke="black"
        stroke-width="1.5"
      />
    </svg>
  );
}

export default BookMarkIcon;
