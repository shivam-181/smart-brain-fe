import React, { Component } from "react";
import { withRouter } from "../withRouter"; // Import the HOC to use navigation

class Navigation extends Component {
  onSignOut = () => {
    this.props.navigate("/"); // Redirect to Sign-In page
  };

  render() {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={this.onSignOut} className="f3 link dim black underline pa3 pointer">
          Sign Out
        </p>
      </nav>
    );
  }
}

export default withRouter(Navigation);
