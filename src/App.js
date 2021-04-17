import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginReducer from "./components/LoginReducer";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/loginreducer">LoginReducer</Link>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/loginreducer" component={LoginReducer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
