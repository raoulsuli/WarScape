export const Button = ({ text, btnColor, onClick, size, className }) => {
  const sizes = { sm: "px-2.5", md: "px-5", lg: "px-20" };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`btn ${btnColor} ${sizes[size]} ${className}`}
    >
      {text}
    </button>
  );
};
