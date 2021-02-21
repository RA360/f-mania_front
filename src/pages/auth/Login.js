import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import NProgress from "nprogress";
import "./auth.scss";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      error: "",
    };
    this.login = this.login.bind(this);
  }
  login(e) {
    e.preventDefault();
    this.setState({ error: "" });
    axios
      .post("http://api.f-mania/v1/account/login", new FormData(e.target))
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
      <>
        <h2 className="auth__offer">Customer Login</h2>
        <p className="auth__subtitle">Registered Users</p>
        <p className="auth__hint">
          If you have an account, sign in with your email address.
        </p>
        {error && <p className="is-error">{error}</p>}
        <form onSubmit={this.login} className="auth__form_login auth__form">
          <input
            name="email"
            className="auth__input"
            type="email"
            placeholder="Email"
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            title="Enter valid format"
            autoFocus
            required
          />
          <input
            name="password"
            className="auth__input"
            type="password"
            placeholder="Password"
            pattern="^\S{5,}"
            title="Can't contain a space and the minimum length is 5 characters"
            required
          />
          <button
            onClick={() => this.props.changeTab("recoverForm")}
            className="auth__link"
          >
            Forgot Password?
          </button>
          <button
            className="auth__login-btn auth__btn btn_violet btn"
            type="submit"
          >
            Login
          </button>
        </form>
        <h2 className="auth__offer">New Customer</h2>
        <p className="auth__hint">
          Creating an account has many benefits: check out faster, keep more
          than one address, track orders and more.
        </p>
        <Link
          className="auth__register-btn auth__btn btn_black btn"
          to="/account/register"
        >
          Create an Account
        </Link>
      </>
    );
  }
}

const LoginFormWithRouter = withRouter(LoginForm);

class RecoverForm extends React.Component {
  constructor() {
    super();
    this.state = {
      error: "",
      success: "",
    };
    this.recover = this.recover.bind(this);
  }
  recover(e) {
    e.preventDefault();
    this.setState({
      error: "",
      success: "",
    });
    axios
      .post("http://api.f-mania/v1/account/recover", new FormData(e.target))
      .then(({ data }) => this.setState({ success: data }))
      .catch(
        ({ response }) =>
          response.status === 400 && this.setState({ error: response.data })
      );
  }
  render() {
    const { error, success } = this.state;
    return (
      <>
        <h2 className="auth__offer">Recover Password</h2>
        <p className="auth__hint">Please enter your email:</p>
        {error && <p className="is-error">{error}</p>}
        {success && <p className="is-success">{success}</p>}
        <form onSubmit={this.recover} className="auth__form">
          <input
            name="email"
            className="auth__input"
            type="email"
            placeholder="Email"
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            title="Enter valid format"
            autoFocus
            required
          />
          <button
            onClick={() => this.props.changeTab("loginForm")}
            className="auth__link"
          >
            Back to login
          </button>
          <button className="auth__btn btn_violet btn" type="submit">
            Recover
          </button>
        </form>
      </>
    );
  }
}

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: "loginForm",
    };
    this.changeTab = this.changeTab.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
    document.title = "Account – F-mania";
  }
  componentDidMount() {
    NProgress.done();
  }
  changeTab(tab) {
    this.setState({ tab });
  }
  render() {
    return (
      <section className="auth">
        <div className="container">
          <div className="auth__box">
            {this.state.tab === "loginForm" ? (
              <LoginFormWithRouter
                setLogged={this.props.setLogged}
                changeTab={this.changeTab}
              />
            ) : (
              <RecoverForm changeTab={this.changeTab} />
            )}
          </div>
        </div>
      </section>
    );
  }
}
