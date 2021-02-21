import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NProgress from "nprogress";
import { Loading } from "../../components/Loading";
import { Pags } from "../../components/pags/Pags";
import "./account.scss";

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      empty: false,
      products: null,
      count: 0,
    };
    this.getProducts = this.getProducts.bind(this);
  }
  componentDidMount() {
    this.getProducts();
  }
  getProducts(page = 0) {
    this.setState({ products: null });
    axios
      .get(`http://api.f-mania/v1/orders?${page ? `page=${page}&` : ""}limit=6`)
      .then(({ data }) => {
        this.setState({ products: data.products });
        !page && this.setState({ count: data.count });
      })
      .catch(
        ({ response }) =>
          response.status === 404 && this.setState({ empty: true })
      );
  }
  render() {
    const { empty, products, count } = this.state;
    return (
      <>
        {!empty && !products && <Loading />}
        {empty && <h3 className="not-found">Your orders is empty</h3>}
        {products &&
          products.map(
            ({ id, img, title, price, color, size, date }, index) => (
              <div className="account__products" key={index}>
                <Link
                  to={`/products/${id}`}
                  className="account__products--img-wrap product-card-img-wrap"
                >
                  <img
                    className="max-size"
                    src={require(`../../assets/img/${img}`).default}
                    alt=""
                  />
                </Link>
                <div className="account__products--content">
                  <div className="account__products--head">
                    <Link
                      to={`/products/${id}`}
                      className="account__products--title"
                    >
                      {title.substr(0, 35)}...
                    </Link>
                    <p className="account__products--price">${price}</p>
                  </div>
                  <p className="product-properties">
                    Size: {size}, Color: {color}
                  </p>
                  <p className="account__products--date">
                    Ordered On <b>{date}</b>
                  </p>
                </div>
              </div>
            )
          )}
        {count ? (
          <Pags handle={this.getProducts} count={count} limit="6" />
        ) : null}
      </>
    );
  }
}

class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      info: null,
      disabled: true,
      errors: null,
      success: "",
    };
    this.getInfo = this.getInfo.bind(this);
    this.saveInfo = this.saveInfo.bind(this);
  }
  componentDidMount() {
    this.getInfo();
  }
  getInfo() {
    axios
      .get(`http://api.f-mania/v1/account`)
      .then(({ data }) => this.setState({ info: data }));
  }
  saveInfo(e) {
    e.preventDefault();
    if (this.state.disabled) this.setState({ disabled: false });
    else {
      const formData = new FormData(e.target),
        firstName = formData.get("firstName"),
        lastName = formData.get("lastName");
      this.setState({
        errors: null,
        success: "",
      });
      axios
        .put("http://api.f-mania/v1/account", {
          firstName,
          lastName,
          email: formData.get("email"),
          phone: formData.get("phone"),
        })
        .then(({ data }) => {
          this.setState({
            disabled: true,
            success: data.msg,
          });
          this.props.setLogged(`${firstName} ${lastName}`);
        })
        .catch(
          ({ response }) =>
            response.status === 400 &&
            this.setState({ errors: response.data.errors })
        );
    }
  }
  render() {
    const { info, disabled, errors, success } = this.state;
    return info ? (
      <>
        <h2 className="account__info--title">Personal Informaton</h2>
        {errors &&
          errors.map((error, index) => (
            <p className="is-error" key={index}>
              {error}
            </p>
          ))}
        {success && <p className="is-success">{success}</p>}
        <form onSubmit={this.saveInfo} className="account__info--form">
          <div className="account__info--item">
            <label htmlFor="firstName">First Name</label>
            <input
              className="account__info--input"
              id="firstName"
              name="firstName"
              defaultValue={info["firstName"]}
              pattern="^[a-zA-Z]+$"
              title="Only letters allowed"
              required
              disabled={disabled}
            />
          </div>
          <div className="account__info--item">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="account__info--input"
              id="lastName"
              name="lastName"
              defaultValue={info["lastName"]}
              pattern="^[a-zA-Z]+$"
              title="Only letters allowed"
              required
              disabled={disabled}
            />
          </div>
          <div className="account__info--item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="account__info--input"
              id="email"
              name="email"
              defaultValue={info["email"]}
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
              title="Enter valid format"
              required
              disabled={disabled}
            />
          </div>
          <div className="account__info--item">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="account__info--input"
              id="phone"
              name="phone"
              defaultValue={info["phone"]}
              pattern="^[0-9]{1,15}$"
              title="Only digits with a maximum length of 15 are allowed"
              disabled={disabled}
            />
          </div>
          <button type="submit" className="account__info--btn btn btn_black">
            {disabled ? "Edit" : "Save"}
          </button>
        </form>
      </>
    ) : (
      <Loading />
    );
  }
}

class Wishlist extends React.Component {
  constructor() {
    super();
    this.state = {
      empty: false,
      products: null,
      count: 0,
    };
    this.getProducts = this.getProducts.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }
  componentDidMount() {
    this.getProducts();
  }
  getProducts(page = 0) {
    this.setState({ products: null });
    axios
      .get(
        `http://api.f-mania/v1/wishlist?${page ? `page=${page}&` : ""}limit=6`
      )
      .then(({ data }) => {
        this.setState({ products: data.products });
        !page && this.setState({ count: data.count });
      })
      .catch(
        ({ response }) =>
          response.status === 404 && this.setState({ empty: true })
      );
  }
  removeProduct(index) {
    const { products } = this.state;
    axios
      .delete(`http://api.f-mania/v1/wishlist/${products[index].id}`)
      .then(() => {
        products.splice(index, 1);
        products.length
          ? this.setState({ products })
          : this.setState({
              products: null,
              empty: true,
            });
      });
  }
  render() {
    const { empty, products, count } = this.state;
    return (
      <>
        {!empty && !products && <Loading />}
        {empty && <h3 className="not-found">Your wishlist is empty</h3>}
        {products &&
          products.map(({ id, img, title, price }, index) => (
            <div className="account__products" key={id}>
              <Link
                to={`/products/${id}`}
                className="account__products--img-wrap product-card-img-wrap"
              >
                <img
                  className="max-size"
                  src={require(`../../assets/img/${img}`).default}
                  alt=""
                />
              </Link>
              <div className="account__products--content">
                <div className="account__products--head">
                  <Link
                    to={`/products/${id}`}
                    className="account__products--title"
                  >
                    {title.substr(0, 35)}...
                  </Link>
                  <button
                    onClick={() => this.removeProduct(index)}
                    className="remove"
                  >
                    Remove
                  </button>
                </div>
                <p className="account__products--price">${price}</p>
              </div>
            </div>
          ))}
        {count ? (
          <Pags handle={this.getProducts} count={count} limit="6" />
        ) : null}
      </>
    );
  }
}

export class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: "orders",
    };
    this.changeTab = this.changeTab.bind(this);
    this.logout = this.logout.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
    document.title = "Account – F-mania";
  }
  componentDidMount() {
    NProgress.done();
  }
  changeTab(e) {
    this.setState({ tab: e.target.dataset.tab });
  }
  logout() {
    this.props.setLogged("");
    localStorage.removeItem("JWT");
  }
  render() {
    const { tab } = this.state;
    return (
      <section className="account">
        <div className="container">
          <div>
            <button
              onClick={this.changeTab}
              className={`account__tab ${tab === "orders" ? "is-active" : ""}`}
              data-tab="orders"
            >
              <svg
                className="account__tab--icon"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="17"
                viewBox="0 0 14 17"
              >
                <g>
                  <path
                    d="M.243,2.429h3.4a.214.214,0,0,0,.175-.085.338.338,0,0,0,.068-.218V.3A.338.338,0,0,0,3.82.085.214.214,0,0,0,3.646,0H.243A.214.214,0,0,0,.068.085.339.339,0,0,0,0,.3V2.125a.338.338,0,0,0,.068.218A.214.214,0,0,0,.243,2.429Z"
                    transform="translate(7 4.857)"
                  />
                  <path
                    d="M.233,2.429H2.1a.2.2,0,0,0,.168-.085.347.347,0,0,0,.065-.218V.3A.347.347,0,0,0,2.268.085.2.2,0,0,0,2.1,0H.233A.2.2,0,0,0,.066.085.349.349,0,0,0,0,.3V2.125a.348.348,0,0,0,.066.218A.2.2,0,0,0,.233,2.429Z"
                    transform="translate(7)"
                  />
                  <path d="M5.2,13.357H3.714V.3A.334.334,0,0,0,3.645.085.219.219,0,0,0,3.467,0H1.984a.219.219,0,0,0-.178.085A.335.335,0,0,0,1.736.3V13.357H.253a.235.235,0,0,0-.232.19.337.337,0,0,0,.054.332l2.472,3.036A.251.251,0,0,0,2.725,17a.234.234,0,0,0,.178-.085l2.464-3.026a.4.4,0,0,0,.077-.227.337.337,0,0,0-.069-.219A.219.219,0,0,0,5.2,13.357Z" />
                  <path
                    d="M6.93.085A.222.222,0,0,0,6.75,0H.25A.222.222,0,0,0,.07.085.332.332,0,0,0,0,.3V2.125a.332.332,0,0,0,.07.218.223.223,0,0,0,.18.085h6.5a.223.223,0,0,0,.18-.085A.332.332,0,0,0,7,2.125V.3A.331.331,0,0,0,6.93.085Z"
                    transform="translate(7 14.571)"
                  />
                  <path
                    d="M.247,2.429H5.2a.22.22,0,0,0,.178-.085.335.335,0,0,0,.069-.218V.3A.334.334,0,0,0,5.375.085.22.22,0,0,0,5.2,0H.247A.22.22,0,0,0,.07.085.334.334,0,0,0,0,.3V2.125a.334.334,0,0,0,.07.218A.22.22,0,0,0,.247,2.429Z"
                    transform="translate(7 9.714)"
                  />
                </g>
              </svg>
              My Orders
            </button>
            <button
              onClick={this.changeTab}
              className={`account__tab ${tab === "info" ? "is-active" : ""}`}
              data-tab="info"
            >
              <svg
                className="account__tab--icon"
                xmlns="http://www.w3.org/2000/svg"
                width="19.979"
                height="17.953"
                viewBox="0 0 19.979 17.953"
              >
                <g>
                  <path
                    d="M5.347,10.074A5.208,5.208,0,0,1,0,5.03,5.2,5.2,0,0,1,5.347,0,5.2,5.2,0,0,1,10.7,5.03,5.209,5.209,0,0,1,5.347,10.074Zm0-8.76A3.835,3.835,0,0,0,1.41,5.03,3.834,3.834,0,0,0,5.347,8.744,3.836,3.836,0,0,0,9.286,5.03,3.837,3.837,0,0,0,5.347,1.315Z"
                    transform="translate(4.609 0)"
                  />
                  <path
                    d="M19.275,6.994H.7A.678.678,0,0,1,0,6.33,6.535,6.535,0,0,1,6.709,0h6.563A6.534,6.534,0,0,1,19.979,6.33.678.678,0,0,1,19.275,6.994ZM6.709,1.33a5.221,5.221,0,0,0-5.25,4.334h17.06A5.213,5.213,0,0,0,13.271,1.33Z"
                    transform="translate(0 10.959)"
                  />
                </g>
              </svg>
              Personal Information
            </button>
            <button
              onClick={this.changeTab}
              className={`account__tab ${
                tab === "wishlist" ? "is-active" : ""
              }`}
              data-tab="wishlist"
            >
              <svg
                className="account__tab--icon"
                xmlns="http://www.w3.org/2000/svg"
                width="21.938"
                height="18.919"
                viewBox="0 0 21.938 18.919"
              >
                <g>
                  <path d="M10.975,18.918a.951.951,0,0,1-.184-.017.936.936,0,0,1-.494-.256L1.783,10.253a5.951,5.951,0,0,1,0-8.494,6.157,6.157,0,0,1,8.618,0l.568.558.565-.558a6.16,6.16,0,0,1,8.621,0,5.951,5.951,0,0,1,0,8.494L11.64,18.645A.939.939,0,0,1,10.975,18.918ZM6.091,1.856A4.218,4.218,0,0,0,3.113,3.072a4.112,4.112,0,0,0,0,5.871l7.856,7.74,7.854-7.74a4.112,4.112,0,0,0,0-5.871,4.254,4.254,0,0,0-5.955,0L11.635,4.288a.979.979,0,0,1-1.33,0L9.071,3.072A4.223,4.223,0,0,0,6.091,1.856Z" />
                </g>
              </svg>
              Wishlist
            </button>
            <Link onClick={this.logout} className="account__tab" to="/">
              <svg
                className="account__tab--icon"
                xmlns="http://www.w3.org/2000/svg"
                width="21.938"
                height="18.919"
                viewBox="0 0 21.938 18.919"
              >
                <path
                  d="M12.552.112a.906.906,0,0,0-1.235.369.924.924,0,0,0,.366,1.247A6.755,6.755,0,0,1,8.5,14.4,6.755,6.755,0,0,1,5.295,1.74.924.924,0,0,0,5.656.492.906.906,0,0,0,4.419.127,8.6,8.6,0,0,0,8.5,16.237,8.6,8.6,0,0,0,12.552.112Z"
                  transform="translate(0 2.763)"
                  fill="#211f1f"
                />
                <path
                  d="M.911,7.968a.915.915,0,0,0,.911-.919V.919A.911.911,0,1,0,0,.919V7.048A.915.915,0,0,0,.911,7.968Z"
                  transform="translate(7.589)"
                  fill="#211f1f"
                />
              </svg>
              Logout
            </Link>
          </div>
          <div className="account__tab-content">
            {tab === "orders" && <Orders />}
            {tab === "info" && <Info setLogged={this.props.setLogged} />}
            {tab === "wishlist" && <Wishlist />}
          </div>
        </div>
      </section>
    );
  }
}
