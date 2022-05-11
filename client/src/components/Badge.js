export const Badge = ({ className, text, ...props }) => {
  return (
    <div className={`badge ${className}`} {...props}>
      {text}
    </div>
  );
};
