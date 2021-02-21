import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import NProgress from "nprogress";
import "./auth.scss";

class Reset extends React.Component {
  constructor() {
    super();
    this.state = {
      error: "",
    };
    this.reset = this.reset.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
    document.title = "Reset Account – F-mania";
  }
  componentDidMount() {
    NProgress.done();
  }
  reset(e) {
    const formData = new FormData(e.target),
      { id, JWT } = this.props.match.params;
    formData.set("id", id);
    e.preventDefault();
    this.setState({ error: "" });
    axios
      .post("http://api.f-mania/v1/account/reset", formData, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      })
      .then(({ data }) => {
        this.props.setLogged(data.fullName);
        this.props.history.push("/account");
      })
      .catch(
        ({ response }) =>
          response.status === 400 && this.setState({ error: response.data })
      );
  }
  render() {
    const { error } = this.state;
    return (
      <section className="auth">
        <div className="container">
          <div className="auth__box">
            <h2 className="auth__offer">Reset Password</h2>
            <p className="auth__hint">Please enter a new password:</p>
            {error && <p className="is-error">{error}</p>}
            <form onSubmit={this.reset} className="auth__form">
              <input
                name="password"
                className="auth__input"
                type="password"
                placeholder="Password"
                pattern="^\S{5,}"
                title="Can't contain a space and the minimum length is 5 characters"
                autoFocus
                required
              />
              <input
                name="confirmPassword"
                className="auth__input"
                type="password"
                placeholder="Confirm Password"
                required
              />
              <button
                className="auth__register-btn auth__btn btn_violet btn"
                type="submit"
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Reset);
