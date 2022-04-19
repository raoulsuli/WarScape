export const Login = () => {
  return (
    <div className="login">
      <div className="form">
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <form action="/home" method="get">
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  )
};
