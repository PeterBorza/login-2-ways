import { useState } from "react";
import { login } from "../utils/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // **********************************************
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login({ username, password });
      setIsLoggedIn(true);
      // if (!check) {
      setUsername("");
      setPassword("");
      // }
      setError("");
    } catch (error) {
      setError("Username or password is wrong!");
      setUsername("");
      setPassword("");
    }
    setIsLoading(false);
  };
  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Hello {username}, you logged in</h1>
            <button className="submit" onClick={() => setIsLoggedIn(false)}>
              Log Out
            </button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "is logging in..." : "Log In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
