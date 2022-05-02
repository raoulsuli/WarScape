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
  ...props
}) => {
  return (
    <button
      type="button"
      className={`btn ${btnColor} ${widths[width]} ${heights[height]} ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};
