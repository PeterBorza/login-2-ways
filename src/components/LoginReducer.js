import { useReducer } from "react";
import { login } from "../utils/login";

const reducer = (state, action) => {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "login":
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    case "success":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        password: "",
      };
    case "error":
      return {
        ...state,
        error: "Incorrect username or password!",
        isLoading: false,
        username: "",
        password: "",
      };
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        username: "",
      };

    default:
      return state;
  }
};

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

const LoginReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;
  console.log(
    `name: ${username}\npassword: ${password}\nis loading: ${isLoading}\nerror: ${error}\nis logged in: ${isLoggedIn}`
  );

  // **********************************************
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Hello {username}, you logged in</h1>
          <button
            className="submit"
            onClick={() => dispatch({ type: "logout" })}
          >
            Log Out
          </button>
        </>
      ) : (
        <form className="form" onSubmit={onSubmit}>
          {error && <p className="error">{error}</p>}
          <p>Please Login!</p>
          <input
            style={error ? { outline: "1px solid red" } : null}
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) =>
              dispatch({
                type: "field",
                field: "username",
                value: e.currentTarget.value,
              })
            }
          />
          <input
            style={error ? { outline: "1px solid red" } : null}
            type="password"
            placeholder="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) =>
              dispatch({
                type: "field",
                field: "password",
                value: e.currentTarget.value,
              })
            }
          />
          <button className="submit" type="submit" disabled={isLoading}>
            {isLoading ? "is logging in..." : "Log In"}
          </button>
        </form>
      )}
    </>
  );
};

export default LoginReducer;
