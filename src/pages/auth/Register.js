import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import NProgress from "nprogress";
import "./auth.scss";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: null,
    };
    this.register = this.register.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
    document.title = "Create Account – F-mania";
  }
  componentDidMount() {
    NProgress.done();
  }
  register(e) {
    e.preventDefault();
    this.setState({ errors: null });
    axios
      .post("http://api.f-mania/v1/account/register", new FormData(e.target))
      .then(({ data }) => {
        this.props.setLogged(data.fullName);
        this.props.history.push("/account");
      })
      .catch(
        ({ response }) =>
          response.status === 400 &&
          this.setState({ errors: response.data.errors })
      );
  }
  render() {
    const { errors } = this.state;
    return (
      <section className="auth">
        <div className="container">
          <div className="auth__box">
            <h2 className="auth__offer">Create New Customer Account</h2>
            <p className="auth__subtitle">Personal Information</p>
            {errors &&
              errors.map((error, index) => (
                <p className="is-error" key={index}>
                  {error}
                </p>
              ))}
            <form onSubmit={this.register} className="auth__form">
              <input
                name="firstName"
                className="auth__input"
                placeholder="First Name"
                pattern="^[a-zA-Z]+$"
                title="Only letters allowed"
                autoFocus
                required
              />
              <input
                name="lastName"
                className="auth__input"
                placeholder="Last Name"
                pattern="^[a-zA-Z]+$"
                title="Only letters allowed"
                required
              />
              <p className="auth__subtitle">Signin Information</p>
              <input
                name="email"
                className="auth__input"
                type="email"
                placeholder="Email"
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                title="Enter valid format"
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
              <input
                name="confirmPassword"
                className="auth__input"
                type="password"
                placeholder="Confirm Password"
                required
              />
              <button className="auth__btn btn_violet btn" type="submit">
                Create an Account
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Register);
