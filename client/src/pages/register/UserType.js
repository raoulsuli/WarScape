export const UserType = ({
  Icon,
  innerText,
  currentUser,
  userType,
  setUserType,
}) => {
  const selectedUserType = (type) =>
    type === userType ? "colorRed" : "textMuted";

  return (
    <div className="userTypeItem" onClick={() => setUserType(currentUser)}>
      <Icon className={`h-14 text-5xl ${selectedUserType(currentUser)}`} />
      <span className={`font-bold ${selectedUserType(currentUser)}`}>
        {innerText}
      </span>
    </div>
  );
};
