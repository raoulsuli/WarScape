const sizes = { xs: "w-50", md: "w-72", lg: "w-96" };

export const Button = ({ text, btnColor, size, className, ...props }) => {
  return (
    <button
      type="button"
      className={`btn ${btnColor} ${sizes[size]} ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};
