import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import axios from "axios";
import NProgress from "nprogress";
import { Breadcrumb } from "./components/breadcrumb/Breadcrumb";
import { Home } from "./pages/home/Home";
import Search from "./pages/search/Search";
import { Account } from "./pages/account/Account";
import { Login } from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import { Products } from "./pages/products/Products";
import Detail from "./pages/detail/Detail";
import { Cart } from "./pages/cart/Cart";
import { AboutUs } from "./pages/aboutUs/AboutUs";
import { ContactUs } from "./pages/contactUs/ContactUs";
import { Empty } from "./pages/empty/Empty";
import logo from "./assets/img/logo.jpg";
import paymentCards from "./assets/img/paymentCards.jpg";

const CancelToken = axios.CancelToken;
let cancel;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      unauthorized: false,
      searchedLength: "",
      suggests: [],
      fullName: "",
      cartCount: 0,
      subscribeError: "",
      subscribeSuccess: "",
    };
    this.getSuggests = this.getSuggests.bind(this);
    this.checkLogged = this.checkLogged.bind(this);
    this.setLogged = this.setLogged.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  UNSAFE_componentWillMount() {
    axios.interceptors.request.use((config) => {
      NProgress.start();
      this.setState({ unauthorized: false });
      const JWT = localStorage.getItem("JWT");
      if (JWT) config.headers.Authorization = `Bearer ${JWT}`;
      return config;
    });
    axios.interceptors.response.use(
      (res) => {
        NProgress.done();
        res.data.JWT && localStorage.setItem("JWT", res.data.JWT);
        return res;
      },
      (err) => {
        NProgress.done();
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("JWT");
          !err.config.cancelErrHandle &&
            this.setState({
              unauthorized: true,
              fullName: "",
            });
        }
        return Promise.reject(err);
      }
    );
  }
  componentDidMount() {
    this.checkLogged();
  }
  getSuggests(e) {
    cancel && cancel();
    const input = e.target,
      { value } = input,
      removeSuggests = (elem) => {
        if (elem.target !== input) {
          cancel && cancel();
          this.setState({ suggests: [] });
          document.removeEventListener("click", removeSuggests);
        }
      };
    value.trim()
      ? axios
          .get(`http://api.f-mania/v1/search?q=${value}&limit=10`, {
            cancelToken: new CancelToken(function executor(c) {
              cancel = c;
            }),
          })
          .then(({ data }) =>
            this.setState({
              searchedLength: value.length,
              suggests: data.products,
            })
          )
      : this.setState({ suggests: [] });
    document.addEventListener("click", removeSuggests);
  }
  checkLogged() {
    axios
      .get("http://api.f-mania/v1/account", {
        cancelErrHandle: true,
      })
      .then(({ data }) => this.setLogged(`${data.firstName} ${data.lastName}`));
  }
  setLogged(fullName) {
    this.setState({ fullName });
    axios
      .get("http://api.f-mania/v1/cart")
      .then(({ data }) => this.setState({ cartCount: data.length }));
  }
  subscribe(e) {
    e.preventDefault();
    this.setState({
      subscribeError: "",
      subscribeSuccess: "",
    });
    axios
      .post("http://api.f-mania/v1/subscribers", new FormData(e.target))
      .then(({ data }) => this.setState({ subscribeSuccess: data }))
      .catch(
        ({ response }) =>
          response.status === 400 &&
          this.setState({ subscribeError: response.data.error })
      );
  }
  render() {
    const {
      unauthorized,
      searchedLength,
      suggests,
      fullName,
      cartCount,
      subscribeError,
      subscribeSuccess,
    } = this.state;
    return (
      <Router>
        {unauthorized && <Redirect to="/account/login" />}
        <header className="header">
          <div className="container">
            <div className="header__row">
              <Link to="/">
                <img src={logo} alt="F-mania" />
              </Link>
              <form className="search-form" action="/search">
                <input
                  onChange={this.getSuggests}
                  className="full-size"
                  name="q"
                  placeholder="Search"
                  maxLength="50"
                  required
                />
                <button className="search-form__btn" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.002"
                    height="16.999"
                    viewBox="0 0 16.002 16.999"
                  >
                    <path
                      d="M15.126,17a.851.851,0,0,1-.627-.271l-3.975-4.242a6.5,6.5,0,0,1-3.832,1.244A6.787,6.787,0,0,1,0,6.866,6.789,6.789,0,0,1,6.692,0a6.788,6.788,0,0,1,6.69,6.866,6.978,6.978,0,0,1-1.57,4.411l3.945,4.206a.911.911,0,0,1-.026,1.266A.849.849,0,0,1,15.126,17ZM6.689,1.79A5.017,5.017,0,0,0,1.746,6.866a5.015,5.015,0,0,0,4.943,5.072,5.016,5.016,0,0,0,4.946-5.072A5.018,5.018,0,0,0,6.689,1.79Z"
                      fill="#211f1f"
                    />
                  </svg>
                </button>
                {suggests.length ? (
                  <div className="suggests">
                    {suggests.map(({ id, title }) => (
                      <Link
                        to={`products/${id}`}
                        className="suggest"
                        target="_blank"
                        key={id}
                      >
                        <b>{title.substr(0, searchedLength)}</b>
                        {title.substr(searchedLength, 50)}...
                      </Link>
                    ))}
                  </div>
                ) : null}
              </form>
              <Link to="/cart" className="cart-link">
                <span className="cart-link__count">{cartCount}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17.967"
                  height="19.983"
                  viewBox="0 0 17.967 19.983"
                >
                  <path
                    d="M13.088,17.744a2.26,2.26,0,0,1,.3-1.129H8.562a2.25,2.25,0,0,1,.3,1.129,2.208,2.208,0,0,1-2.165,2.238,2.205,2.205,0,0,1-2.165-2.238,2.3,2.3,0,0,1,.31-1.15,2.246,2.246,0,0,1-1.912-2.246V2.2L.329,1.067A.561.561,0,0,1,.042.339a.529.529,0,0,1,.7-.3L3.675,1.317l.051.025s.008,0,.012.008a.263.263,0,0,1,.032.021c.008.008.016.012.024.02A.111.111,0,0,0,3.81,1.4a.153.153,0,0,1,.028.025l.012.012.023.025.013.012c0,.008.012.017.015.025a.228.228,0,0,1,.012.02c0,.009.008.013.013.021a.1.1,0,0,1,.015.025s0,.012.008.016a.155.155,0,0,1,.016.032s0,.013,0,.017.008.024.012.037,0,.012,0,.021,0,.02.008.032,0,.024,0,.037a.029.029,0,0,1,0,.016.291.291,0,0,1,0,.058V3.781l13.5,1.926c.008,0,.012,0,.016,0a.094.094,0,0,1,.031,0,.169.169,0,0,0,.02,0,.082.082,0,0,1,.028.008c.008,0,.016,0,.024.008l.023.013.024.013.023.012a.1.1,0,0,0,.024.017c.007,0,.012.008.02.012a.216.216,0,0,0,.023.016c.008,0,.012.013.02.017l.02.021a.046.046,0,0,1,.016.016c0,.008.012.012.016.021s.012.012.015.02a.077.077,0,0,1,.016.021c0,.008.012.016.016.025a.228.228,0,0,0,.012.02c0,.009.008.017.012.025a.07.07,0,0,1,.012.021.3.3,0,0,0,.013.029c0,.008,0,.016.007.024s0,.016.008.024,0,.021.008.029,0,.017,0,.025,0,.02,0,.029a.057.057,0,0,1,0,.024V10.89a2.236,2.236,0,0,1-2.193,2.267H5.121A2.163,2.163,0,0,1,4,12.845v1.5a1.141,1.141,0,0,0,1.121,1.158H15.253a2.24,2.24,0,1,1-2.165,2.238Z"
                    fill="#000"
                  />
                </svg>
              </Link>
              <div>
                {fullName ? (
                  <Link className="account-link" to="/account">
                    <b>Hello</b> {fullName}
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/account/login"
                      className="auth-link btn btn_violet"
                    >
                      Login
                    </Link>
                    <Link
                      to="/account/register"
                      className="auth-link btn btn_black"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/account" exact>
            {!fullName && <Redirect to="/account/login" />}
            <Breadcrumb />
            <Account setLogged={this.setLogged} />
          </Route>
          <Route path="/account/login">
            {fullName && <Redirect to="/account" />}
            <Login setLogged={this.setLogged} />
          </Route>
          <Route path="/account/register">
            {fullName && <Redirect to="/account" />}
            <Register setLogged={this.setLogged} />
          </Route>
          <Route path="/account/reset/:id/:JWT">
            {fullName && <Redirect to="/account" />}
            <Reset setLogged={this.setLogged} />
          </Route>
          <Route path="/products" exact>
            <Breadcrumb />
            <Products />
          </Route>
          <Route path="/products/:id">
            <Breadcrumb />
            <Detail />
          </Route>
          <Route path="/cart">
            <Breadcrumb />
            <Cart />
          </Route>
          <Route path="/about-us">
            <Breadcrumb />
            <AboutUs />
          </Route>
          <Route path="/contact-us">
            <Breadcrumb />
            <ContactUs />
          </Route>
          <Route path="/404">
            <Empty />
          </Route>
          <Redirect to="/404" />
        </Switch>
        <section className="features">
          <div className="container">
            <p className="features__item">
              <span className="features__icon"></span>
              Track Your
              <br />
              Orders
            </p>
            <p className="features__item">
              <span className="features__icon"></span>
              Free & Easy
              <br />
              Returns
            </p>
            <p className="features__item">
              <span className="features__icon"></span>
              Online
              <br />
              Cancellations
            </p>
          </div>
        </section>
        <footer className="footer">
          <div className="container">
            <div className="footer__box">
              <div>
                <h3 className="footer__offer">Quick Links</h3>
                <Link to="/" className="footer__txt">
                  Home
                </Link>
                <Link to="/self-definition" className="footer__txt">
                  Self Definition
                </Link>
                <Link to="/procedure" className="footer__txt">
                  Procedure
                </Link>
                <Link to="/offline-stores" className="footer__txt">
                  Offline Stores
                </Link>
                <Link to="/customer-services" className="footer__txt">
                  Customers services
                </Link>
              </div>
              <div>
                <h3 className="footer__offer">Help</h3>
                <Link to="/payments" className="footer__txt">
                  Payments
                </Link>
                <Link to="/shipping" className="footer__txt">
                  Shipping
                </Link>
                <Link to="/returns" className="footer__txt">
                  Cancellation & Returns
                </Link>
                <Link to="/faq" className="footer__txt">
                  FAQ
                </Link>
                <Link to="/track-order" className="footer__txt">
                  Track your order
                </Link>
              </div>
              <div>
                <h3 className="footer__offer">Contact Us</h3>
                <Link to="/about-us" className="footer__txt">
                  About Us
                </Link>
                <Link to="/contact-us" className="footer__txt">
                  Contact Us
                </Link>
                <Link to="/work-with-us" className="footer__txt">
                  Work with Us
                </Link>
                <Link to="/privacy-policy" className="footer__txt">
                  Privacy Policy
                </Link>
                <Link to="/terms-and-conditions" className="footer__txt">
                  Terms & Conditions
                </Link>
              </div>
              <div className="footer__newsletter">
                <h3 className="footer__offer">Newsletter</h3>
                <p className="footer__newsletter--txt footer__txt">
                  Our email subscribers get the inside scoop on new products,
                  Promotions, Contests and more. Sign up, it's right thing to
                  do.
                </p>
                <form onSubmit={this.subscribe} className="subscribe">
                  <input
                    className="subscribe__input"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    title="Enter valid format"
                    required
                  />
                  <button className="subscribe__btn" type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="15"
                      viewBox="0 0 17 15"
                    >
                      <path
                        d="M16.913.06a.264.264,0,0,0-.275-.038L.147,7.328a.238.238,0,0,0,0,.437L4.809,9.949a.264.264,0,0,0,.264-.023L9.611,6.692,6.049,10.185a.236.236,0,0,0-.071.187l.355,4.4a.245.245,0,0,0,.174.212A.266.266,0,0,0,6.586,15a.26.26,0,0,0,.192-.084l2.477-2.737,3.062,1.395a.265.265,0,0,0,.211,0,.247.247,0,0,0,.141-.15L16.988.315A.235.235,0,0,0,16.913.06Z"
                        fill="#6f6f6f"
                      />
                    </svg>
                  </button>
                </form>
                {subscribeError && <p className="is-error">{subscribeError}</p>}
                {subscribeSuccess && (
                  <p className="is-success">{subscribeSuccess}</p>
                )}
              </div>
            </div>
            <div className="footer__others">
              <img src={paymentCards} alt="Payment Cards" />
              <div className="footer__socials">
                <a
                  href="https://www.facebook.com/f-mania/"
                  className="footer__social"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8.97"
                    height="18.98"
                    viewBox="0 0 8.97 18.98"
                  >
                    <path d="M5.969,6.219V4.584A3.555,3.555,0,0,1,6,4.014a1.1,1.1,0,0,1,.158-.4.644.644,0,0,1,.4-.271,2.865,2.865,0,0,1,.73-.075H8.947V0H6.3A4.353,4.353,0,0,0,2.99,1.077a4.5,4.5,0,0,0-1,3.173V6.219H0V9.49H1.986v9.49H5.969V9.49H8.62l.35-3.271Z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/f-mania/"
                  className="footer__social"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16.97"
                    viewBox="0 0 20 16.97"
                  >
                    <g>
                      <path d="M20,2.008a7.922,7.922,0,0,1-2.356.675,4.276,4.276,0,0,0,1.8-2.369,8.061,8.061,0,0,1-2.607,1.04A4.012,4.012,0,0,0,13.846,0a4.2,4.2,0,0,0-4.1,4.285,4.481,4.481,0,0,0,.106.977A11.491,11.491,0,0,1,1.393.783,4.4,4.4,0,0,0,.839,2.937,4.337,4.337,0,0,0,2.663,6.5,3.971,3.971,0,0,1,.8,5.966V6.02a4.248,4.248,0,0,0,3.291,4.2,3.989,3.989,0,0,1-1.081.15,3.776,3.776,0,0,1-.772-.08,4.132,4.132,0,0,0,3.832,2.977A8.011,8.011,0,0,1,.979,15.1,8.352,8.352,0,0,1,0,15.042,11.241,11.241,0,0,0,6.289,16.97c7.547,0,11.673-6.53,11.673-12.193l-.014-.555A8.4,8.4,0,0,0,20,2.008Z" />
                    </g>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/f-mania"
                  className="footer__social"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19.959"
                    height="18.954"
                    viewBox="0 0 19.959 18.954"
                  >
                    <g>
                      <path d="M15.682,18.954V12.112c0-1.719-.619-2.893-2.167-2.893a2.34,2.34,0,0,0-2.2,1.555,2.883,2.883,0,0,0-.142,1.037v7.142H6.9s.058-11.588,0-12.789h4.28V7.978c-.009.014-.021.028-.029.041h.029V7.978a4.251,4.251,0,0,1,3.856-2.113c2.816,0,4.927,1.828,4.927,5.756v7.333Zm-15.428,0V6.165H4.532V18.954ZM2.364,4.42A2.217,2.217,0,1,1,2.422,0a2.218,2.218,0,1,1-.029,4.42Z" />
                    </g>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/f-mania/"
                  className="footer__social"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.001"
                    height="20.001"
                    viewBox="0 0 20.001 20.001"
                  >
                    <g>
                      <path d="M14.191,20H5.81A5.817,5.817,0,0,1,0,14.191V5.81A5.817,5.817,0,0,1,5.81,0h8.382A5.817,5.817,0,0,1,20,5.81v8.381A5.817,5.817,0,0,1,14.191,20ZM5.81,1.562A4.253,4.253,0,0,0,1.562,5.81v8.381A4.251,4.251,0,0,0,5.81,18.436h8.382a4.249,4.249,0,0,0,4.244-4.245V5.81a4.251,4.251,0,0,0-4.244-4.248Z" />
                      <path
                        d="M5.391,10.782a5.392,5.392,0,1,1,5.39-5.39A5.4,5.4,0,0,1,5.391,10.782Zm0-9.22a3.828,3.828,0,1,0,3.83,3.83A3.833,3.833,0,0,0,5.391,1.562Z"
                        transform="translate(4.609 4.609)"
                      />
                      <circle
                        id="Oval"
                        cx="0.781"
                        cy="0.781"
                        r="0.781"
                        transform="translate(14.688 3.75)"
                      />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            <p className="copyrights">
              Copyright © 2018 F-mania. All Rights Reserved.
            </p>
          </div>
        </footer>
      </Router>
    );
  }
}

export default App;
