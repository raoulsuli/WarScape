const widths = { sm: "w-50", md: "w-60", lg: "w-96" };
const heights = { sm: "h-8" };

export const Input = ({ width, height = "sm", className, ...props }) => {
  const { type } = props;

  const classes =
    type === "checkbox" ? `${className} checkboxField` : className;

  return (
    <input
      {...props}
      className={`inputField ${classes} ${widths[width]} ${heights[height]}`}
    />
  );
};
