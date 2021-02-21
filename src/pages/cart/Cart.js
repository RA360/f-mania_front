import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NProgress from "nprogress";
import { validQuantityInput } from "../../utils";
import { Loading } from "../../components/Loading";
import "./cart.scss";

export class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      empty: false,
      products: null,
    };
    this.getProducts = this.getProducts.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.changeTotalPrice = this.changeTotalPrice.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
    document.title = "Your Shopping Cart – F-mania";
  }
  componentDidMount() {
    NProgress.done();
    this.getProducts();
  }
  getProducts() {
    axios
      .get("http://api.f-mania/v1/cart")
      .then(({ data }) => this.setState({ products: data }))
      .catch(
        ({ response }) =>
          response.status === 404 && this.setState({ empty: true })
      );
  }
  removeProduct(index) {
    const { products } = this.state;
    axios
      .delete(`http://api.f-mania/v1/cart/${products[index].id}`)
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
  changeTotalPrice(e, index) {
    validQuantityInput(e);
    const { products } = this.state;
    products[index].quantity = e.target.value;
    this.setState({
      products,
    });
    axios.put(
      `http://api.f-mania/v1/cart/${products[index].id}`,
      e.target.value
    );
  }
  render() {
    const { empty, products } = this.state;
    return (
      <section className="cart">
        <div className="container">
          {!empty && !products && <Loading />}
          {empty && <h3 className="not-found">Your cart is empty</h3>}
          {products && (
            <>
              <div className="cart__box">
                {products.map(
                  (
                    {
                      product_id,
                      img,
                      title,
                      price,
                      color,
                      size,
                      quantity,
                      maxQuantity,
                    },
                    index
                  ) => (
                    <div className="cart__products" key={index}>
                      <Link
                        to={`/products/${product_id}`}
                        className="cart__products--img-wrap product-card-img-wrap"
                      >
                        <img
                          className="max-size"
                          src={require(`../../assets/img/${img}`).default}
                          alt=""
                        />
                      </Link>
                      <div className="cart__products--content">
                        <Link
                          to={`/products/${product_id}`}
                          className="cart__products--title"
                        >
                          {title.substr(0, 35)}...
                        </Link>
                        <p className="product-properties">
                          Size: {size}, Color: {color}
                        </p>
                        <div className="cart__products--pricing">
                          <p>${price}</p>
                          <p className="cart__quantity-title">Quantity</p>
                          <input
                            onChange={(e) => this.changeTotalPrice(e, index)}
                            className="cart__quantity-input"
                            data-max={maxQuantity}
                            defaultValue={quantity}
                          />
                        </div>
                        <button
                          onClick={() => this.removeProduct(index)}
                          className="remove"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                )}
                <div className="cart__box--bottom">
                  <Link className="cart__continue" to="/">
                    Continue Shopping
                  </Link>
                  <Link className="btn_black btn" to="/checkout">
                    Checkout
                  </Link>
                </div>
              </div>
              <div>
                <h2 className="cart__details-offer cart__details-item">
                  Price Details
                </h2>
                {
                  <>
                    <div className="cart__details-item">
                      <p>Price</p>
                      <p>
                        $
                        {products.reduce(
                          (sum, { price, quantity }) =>
                            +(sum + price * quantity).toFixed(2),
                          0
                        )}
                      </p>
                    </div>
                    <div className="cart__details-item">
                      <p>Delivery Charge</p>
                      <p>$0</p>
                    </div>
                    <div className="cart__total cart__details-item">
                      <p>Amount Payable</p>
                      <p>
                        $
                        {products.reduce(
                          (sum, { price, quantity }) =>
                            +(sum + price * quantity).toFixed(2),
                          0
                        )}
                      </p>
                    </div>
                  </>
                }
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
}
