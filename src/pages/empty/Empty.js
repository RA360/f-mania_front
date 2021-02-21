import React from "react";
import { Link } from "react-router-dom";
import NProgress from "nprogress";
import "./empty.scss";

export class Empty extends React.Component {
  UNSAFE_componentWillMount() {
    NProgress.start();
    document.title = "Page Not Found – F-mania";
  }
  componentDidMount() {
    NProgress.done();
  }
  render() {
    return (
      <div className="empty">
        <h3 className="empty__title">404</h3>
        <p className="empty__desc">
          The page you are looking for cannot be found.
        </p>
        <Link className="empty__btn btn_black btn" to="/">
          Back to Homepage
        </Link>
      </div>
    );
  }
}
