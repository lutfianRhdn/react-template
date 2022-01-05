import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/output.css";
function Index(props) {
  return (
      <div>
          <h1>ok</h1>
      </div>
  );
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setUser: (payload) =>{}
    // dispatch({ type: actionType.SET_USER, payload: payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
