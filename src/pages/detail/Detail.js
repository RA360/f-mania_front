import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import NProgress from "nprogress";
import { validQuantityInput } from "../../utils";
import { Loading } from "../../components/Loading";
import "./detail.scss";

class Ratings extends React.Component {
  constructor() {
    super();
    this.state = {
      ratings: null,
    };
  }
  componentDidMount() {
    const ratings = [];
    for (let i = 1; i < 6; i++)
      ratings.push(
        <svg
          className="detail__review--rating"
          xmlns="http://www.w3.org/2000/svg"
          width="13.967"
          height="13.801"
          viewBox="0 0 13.967 13.801"
          fill={i > this.props.rating ? "#d7d7d7" : "#edc207"}
        >
          <path d="M13.954,5.253a.253.253,0,0,0-.2-.177L9.23,4.394,7.207.145a.246.246,0,0,0-.448,0L4.737,4.395.214,5.076a.253.253,0,0,0-.2.177.266.266,0,0,0,.063.265L3.348,8.826,2.575,13.5a.264.264,0,0,0,.1.254.241.241,0,0,0,.263.02l4.045-2.205,4.045,2.205a.243.243,0,0,0,.264-.02.263.263,0,0,0,.1-.254l-.773-4.671,3.273-3.308A.266.266,0,0,0,13.954,5.253Z" />
        </svg>
      );
    this.setState({ ratings });
  }
  render() {
    return this.state.ratings && this.state.ratings.map((rating) => rating);
  }
}

class Reviews extends React.Component {
  constructor() {
    super();
    this.state = {
      empty: false,
      reviews: null,
      errors: null,
      success: "",
      rating: 0,
    };
    this.getReviews = this.getReviews.bind(this);
    this.chooseStar = this.chooseStar.bind(this);
    this.postReview = this.postReview.bind(this);
  }
  componentDidMount() {
    this.getReviews();
  }
  getReviews() {
    axios
      .get(`http://api.f-mania/v1/products/${this.props.id}/reviews`)
      .then(({ data }) => this.setState({ reviews: data }))
      .catch(
        ({ response }) =>
          response.status === 404 && this.setState({ empty: true })
      );
  }
  chooseStar(e) {
    const { rating } = e.currentTarget.dataset;
    e.currentTarget.parentNode.dataset.totalRating = rating;
    this.setState({ rating });
  }
  postReview(e) {
    const formData = new FormData(e.target);
    formData.set("rating", this.state.rating);
    e.preventDefault();
    this.setState({
      errors: null,
      success: "",
    });
    axios
      .post(`http://api.f-mania/v1/products/${this.props.id}/reviews`, formData)
      .then(({ data }) => this.setState({ success: data }))
      .catch(
        ({ response }) =>
          response.status === 400 && this.setState({ errors: response.data })
      );
  }
  render() {
    const { empty, reviews, errors, success } = this.state;
    return (
      <>
        <h2 className="detail__offer">Customer Review</h2>
        {!empty && !reviews && <Loading />}
        {empty && (
          <h3 className="not-found">
            There are yet no reviews for this product
          </h3>
        )}
        {reviews &&
          reviews.map(({ id, rating, text, firstName, lastName, date }) => (
            <article className="detail__review" key={id}>
              <Ratings rating={rating} />
              <p className="detail__review--desc">{text}</p>
              <p className="detail__review--info">
                by {`${firstName} ${lastName}`}, {date}
              </p>
            </article>
          ))}
        <h2 className="detail__offer">Give Your Review</h2>
        <form onSubmit={this.postReview}>
          {errors &&
            errors.map((error, index) => (
              <p className="is-error" key={index}>
                {error}
              </p>
            ))}
          <div className="detail__form-ratings" data-total-rating="0">
            <svg
              onClick={this.chooseStar}
              className="detail__form-rating"
              data-rating="5"
              xmlns="http://www.w3.org/2000/svg"
              width="20.95"
              height="20.702"
              viewBox="0 0 20.95 20.702"
            >
              <path d="M20.932,7.879a.38.38,0,0,0-.3-.265L13.845,6.592,10.811.217a.369.369,0,0,0-.672,0L7.105,6.592.321,7.614a.38.38,0,0,0-.3.265.4.4,0,0,0,.095.4L5.022,13.24,3.863,20.247a.4.4,0,0,0,.149.38.361.361,0,0,0,.395.03l6.068-3.308,6.067,3.308a.364.364,0,0,0,.4-.03.4.4,0,0,0,.149-.38L15.928,13.24l4.909-4.963A.4.4,0,0,0,20.932,7.879Z" />
            </svg>
            <svg
              onClick={this.chooseStar}
              className="detail__form-rating"
              data-rating="4"
              xmlns="http://www.w3.org/2000/svg"
              width="20.95"
              height="20.702"
              viewBox="0 0 20.95 20.702"
            >
              <path d="M20.932,7.879a.38.38,0,0,0-.3-.265L13.845,6.592,10.811.217a.369.369,0,0,0-.672,0L7.105,6.592.321,7.614a.38.38,0,0,0-.3.265.4.4,0,0,0,.095.4L5.022,13.24,3.863,20.247a.4.4,0,0,0,.149.38.361.361,0,0,0,.395.03l6.068-3.308,6.067,3.308a.364.364,0,0,0,.4-.03.4.4,0,0,0,.149-.38L15.928,13.24l4.909-4.963A.4.4,0,0,0,20.932,7.879Z" />
            </svg>
            <svg
              onClick={this.chooseStar}
              className="detail__form-rating"
              data-rating="3"
              xmlns="http://www.w3.org/2000/svg"
              width="20.95"
              height="20.702"
              viewBox="0 0 20.95 20.702"
            >
              <path d="M20.932,7.879a.38.38,0,0,0-.3-.265L13.845,6.592,10.811.217a.369.369,0,0,0-.672,0L7.105,6.592.321,7.614a.38.38,0,0,0-.3.265.4.4,0,0,0,.095.4L5.022,13.24,3.863,20.247a.4.4,0,0,0,.149.38.361.361,0,0,0,.395.03l6.068-3.308,6.067,3.308a.364.364,0,0,0,.4-.03.4.4,0,0,0,.149-.38L15.928,13.24l4.909-4.963A.4.4,0,0,0,20.932,7.879Z" />
            </svg>
            <svg
              onClick={this.chooseStar}
              className="detail__form-rating"
              data-rating="2"
              xmlns="http://www.w3.org/2000/svg"
              width="20.95"
              height="20.702"
              viewBox="0 0 20.95 20.702"
            >
              <path d="M20.932,7.879a.38.38,0,0,0-.3-.265L13.845,6.592,10.811.217a.369.369,0,0,0-.672,0L7.105,6.592.321,7.614a.38.38,0,0,0-.3.265.4.4,0,0,0,.095.4L5.022,13.24,3.863,20.247a.4.4,0,0,0,.149.38.361.361,0,0,0,.395.03l6.068-3.308,6.067,3.308a.364.364,0,0,0,.4-.03.4.4,0,0,0,.149-.38L15.928,13.24l4.909-4.963A.4.4,0,0,0,20.932,7.879Z" />
            </svg>
            <svg
              onClick={this.chooseStar}
              className="detail__form-rating"
              data-rating="1"
              xmlns="http://www.w3.org/2000/svg"
              width="20.95"
              height="20.702"
              viewBox="0 0 20.95 20.702"
            >
              <path d="M20.932,7.879a.38.38,0,0,0-.3-.265L13.845,6.592,10.811.217a.369.369,0,0,0-.672,0L7.105,6.592.321,7.614a.38.38,0,0,0-.3.265.4.4,0,0,0,.095.4L5.022,13.24,3.863,20.247a.4.4,0,0,0,.149.38.361.361,0,0,0,.395.03l6.068-3.308,6.067,3.308a.364.364,0,0,0,.4-.03.4.4,0,0,0,.149-.38L15.928,13.24l4.909-4.963A.4.4,0,0,0,20.932,7.879Z" />
            </svg>
          </div>
          <textarea
            name="txt"
            placeholder="Write here"
            pattern=".{1,1000}"
            title="Length should not exceed 1000"
            required
          ></textarea>
          {success && <p className="is-success">{success}</p>}
          <button className="detail__form-btn btn_black btn" type="submit">
            Submit
          </button>
        </form>
      </>
    );
  }
}

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      products: null,
      images: null,
      viewImg: null,
      sizes: null,
      colors: null,
      size: "",
      color: "",
      quantity: 1,
      addedToWishlist: false,
      tab: "desc",
    };
    this.getProducts = this.getProducts.bind(this);
    this.setViewImg = this.setViewImg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterChoices = this.filterChoices.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.handleWishlist = this.handleWishlist.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
  }
  componentDidMount() {
    NProgress.done();
    this.getProducts();
  }
  getProducts() {
    const { id } = this.props.match.params;
    if (+id) {
      axios
        .get(`http://api.f-mania/v1/products/${id}`)
        .then(({ data }) => {
          const { products, images } = data,
            sizes = [...new Set(products.map(({ size }) => size))],
            colors = [...new Set(products.map(({ color }) => color))];
          document.title = `${products[0].title} – F-mania`;
          this.setState({
            products,
            images,
            viewImg: {
              index: 0,
              img: images[0].img,
            },
            sizes,
            size: sizes[0],
            colors,
            color: colors[0],
          });
        })
        .catch(
          ({ response }) =>
            response.status === 404 && this.props.history.push("/404")
        );
    } else this.props.history.push("/404");
  }
  setViewImg(e) {
    const { index } = e.currentTarget.dataset;
    this.setState({
      viewImg: {
        index: +index,
        img: this.state.images[index].img,
      },
    });
  }
  handleChange(e) {
    e.target.name === "quantity" && validQuantityInput(e);
    this.setState({ [e.target.name]: e.target.value });
  }
  filterChoices(e) {
    const { name, value } = e.target,
      key = name === "size" ? "color" : "size",
      arr = this.state.products
        .map((product) => product[name] === value && product[key])
        .filter(Boolean);
    this.setState({
      [name === "size" ? "colors" : "sizes"]: arr,
      [key]: arr[0],
    });
    this.handleChange(e);
  }
  addToCart() {
    const { products, size, color, quantity } = this.state;
    axios
      .post("http://api.f-mania/v1/cart", {
        productId: this.props.match.params.id,
        sizeId: products.find((product) => product.size === size).size_id,
        colorId: products.find((product) => product.color === color).color_id,
        quantity,
      })
      .then(({ data }) => alert(data));
  }
  handleWishlist() {
    const { id } = this.props.match.params,
      res = this.state.addedToWishlist
        ? axios.delete(`http://api.f-mania/v1/wishlist/${id}`)
        : axios.post("http://api.f-mania/v1/wishlist", id);
    res.then(() =>
      this.setState(({ addedToWishlist }) => ({
        addedToWishlist: !addedToWishlist,
      }))
    );
  }
  changeTab(e) {
    this.setState({ tab: e.target.dataset.tab });
  }
  render() {
    const {
      products,
      images,
      viewImg,
      sizes,
      colors,
      addedToWishlist,
      tab,
    } = this.state;
    return products ? (
      <section className="detail">
        <div className="container">
          <div className="detail__main">
            <div className="detail__view">
              <div className="detail__view--wrap product-card-img-wrap">
                <img
                  className="max-size"
                  src={require(`../../assets/img/${viewImg.img}`).default}
                  alt=""
                />
              </div>
              <div className="detail__thumbs">
                {images.map(({ thumb }, index) => (
                  <div
                    onMouseOver={this.setViewImg}
                    data-index={index}
                    className={`detail__thumb product-card-img-wrap ${
                      index === viewImg.index ? "is-active" : ""
                    }`}
                    key={index}
                  >
                    <img
                      className="max-size"
                      src={require(`../../assets/img/${thumb}`).default}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="detail__offer">{products[0].title}</h1>
              <p className="detail__price">${products[0].price}</p>
              <div className="detail__choice">
                <p className="detail__choice--offer">Size</p>
                <select onChange={this.filterChoices} name="size">
                  {sizes.map((size, index) => (
                    <option value={size} key={index}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="detail__choice">
                <p className="detail__choice--offer">Color</p>
                <select onChange={this.filterChoices} name="color">
                  {colors.map((color, index) => (
                    <option value={color} key={index}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="detail__choice">
                <p className="detail__choice--offer">QTY</p>
                <input
                  onChange={this.handleChange}
                  name="quantity"
                  className="detail__quantity"
                  data-max={products[0].quantity}
                  defaultValue="1"
                />
              </div>
              <div className="detail__main--btns">
                <Link
                  to="/checkout"
                  className="detail__main--btn btn_black btn"
                >
                  Buy Now
                </Link>
                <button
                  onClick={this.addToCart}
                  className="detail__main--btn btn_black btn"
                >
                  Add to Cart
                </button>
                <button
                  onClick={this.handleWishlist}
                  className="detail__wishlist detail__main--btn btn"
                >
                  <svg
                    className="detail__wishlist--icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14.284"
                    height="13.076"
                    viewBox="0 0 14.284 13.076"
                  >
                    <path
                      d="M6.5,12C-6.181,4.865,2.99-4.006,6.5,1.968,10.01-4.006,19.182,4.865,6.5,12Z"
                      transform="translate(0.642 0.503)"
                      fill={addedToWishlist ? "#211f1f" : "#fff"}
                      stroke="#211f1f"
                      strokeWidth="1"
                    />
                  </svg>
                  {addedToWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={this.changeTab}
            className={`detail__tab ${tab === "desc" ? "is-active" : ""}`}
            data-tab="desc"
          >
            Description
          </button>
          <button
            onClick={this.changeTab}
            className={`detail__tab ${tab === "reviews" ? "is-active" : ""}`}
            data-tab="reviews"
          >
            Ratings & Review
          </button>
          <div className="detail__tab-content">
            {tab === "desc" ? (
              <p>{products[0].text}</p>
            ) : (
              <Reviews id={this.props.match.params.id} />
            )}
          </div>
        </div>
      </section>
    ) : (
      <Loading />
    );
  }
}

export default withRouter(Detail);
