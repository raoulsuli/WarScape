const widths = { sm: "w-28", md: "w-72", lg: "w-96" };
const heights = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const Button = ({
  text = "",
  btnColor = "btnRed",
  width = "",
  height = "lg",
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`btn ${disabled ? "bg-gray-500" : btnColor} ${widths[width]} ${
        heights[height]
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};
