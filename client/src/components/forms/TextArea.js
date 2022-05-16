export const TextArea = ({ label, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="inputField colorRed w-48 max-h-60"
        style={{ minHeight: "85px" }}
      />
    </div>
  );
};
