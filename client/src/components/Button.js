const widths = { xs: "w-28", sm: "w-40", md: "w-72", lg: "w-96" };
const heights = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const Button = ({
  text = "",
  btnColor = "btnRed",
  width = "xs",
  height = "lg",
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`btn ${
        disabled
          ? "bg-gray-500 cursor-default"
          : `${btnColor} focus:ring-4 hover:opacity-80`
      } ${widths[width]} ${heights[height]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};
