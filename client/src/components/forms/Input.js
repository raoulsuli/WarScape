const widths = { sm: "w-48", md: "w-60", lg: "w-96" };
const heights = { sm: "h-8" };

export const Input = ({
  width,
  height = "sm",
  className,
  label,
  parentClassName,
  ...props
}) => {
  const { type } = props;

  const classes =
    type === "checkbox" ? `${className} checkboxField` : className;

  return (
    <div className={`grid ${parentClassName}`}>
      {label && <label className="label">{label}</label>}
      <input
        {...props}
        className={`inputField ${classes} w-40 md:${widths[width]} ${heights[height]}`}
      />
    </div>
  );
};
