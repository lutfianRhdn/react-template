import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/output.css";
import { actionType } from "../redux/constants/action-types";
import useLocalStorage from "../config/useLocalStorage";
import Index from "./Index";
function App(props) {
  // const [user] = useLocalStorage("user");
  // props.setUser(user);
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
      </Switch>
    </Router>
  );
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setUser: (payload) =>{}
    // dispatch({ type: actionType.SET_USER, payload: payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
