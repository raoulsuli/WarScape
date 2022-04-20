const sizes = { sm: "w-50", md: "w-72", lg: "w-96" };

export const Input = ({ size, className, ...props }) => {
  const { type } = props;

  const classes =
    type === "checkbox" ? `${className} checkboxField` : className;

  return (
    <input {...props} className={`inputField ${classes} ${sizes[size]}`} />
  );
};
