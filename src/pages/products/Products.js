import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NProgress from "nprogress";
import Slider from "react-slick";
import { Loading } from "../../components/Loading";
import "./products.scss";
import banner2 from "../../assets/img/banner2.jpg";
import { Pags } from "../../components/pags/Pags";

export class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      empty: false,
      products: [],
      count: 0,
      categories: null,
      colors: null,
      sizes: null,
      view: "gallery",
      catsId: [],
      colorsId: [],
      sizesId: [],
      sort: "default",
    };
    this.getFilters = this.getFilters.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.setView = this.setView.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
    document.title = "Products – F-mania";
  }
  componentDidMount() {
    NProgress.done();
    this.getFilters();
    this.getProducts();
  }
  getFilters() {
    axios.get("http://api.f-mania/v1/filters").then(({ data }) => {
      const { categories, colors, sizes } = data;
      this.setState({ categories, colors, sizes });
    });
  }
  getProducts(page = 0) {
    this.setState({
      empty: false,
      products: null,
    });
    !page && this.setState({ count: 0 });

    const { catsId, colorsId, sizesId, sort } = this.state;
    axios
      .get(
        `http://api.f-mania/v1/products?${
          catsId.length ? `catsId=${catsId.join(",")}&` : ""
        }${colorsId.length ? `colorsId=${colorsId.join(",")}&` : ""}${
          sizesId.length ? `sizesId=${sizesId.join(",")}&` : ""
        }sort=${sort}${page ? `&page=${page}` : ""}&limit=9`
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
  setQuery(e) {
    const checkbox = e.target.querySelector(".checkbox"),
      { key, id } = e.target.dataset;
    this.setState(
      {
        [key]: checkbox.checked
          ? this.state[key].filter((item) => item !== id)
          : [...this.state[key], id],
      },
      this.getProducts
    );
    checkbox.checked = !checkbox.checked;
  }
  handleSelect(e) {
    this.setState({ sort: e.target.value });
    this.getProducts();
  }
  setView(e) {
    this.setState({ view: e.currentTarget.dataset.view });
  }
  render() {
    const {
        empty,
        products,
        count,
        categories,
        colors,
        sizes,
        view,
      } = this.state,
      settings = {
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        customPaging: () => <div className="slider-dot"></div>,
      };
    return (
      <section className="products">
        <div className="container">
          <div className="products__wrap">
            <div className="products__filters">
              <h2 className="products__filters--offer">Filters</h2>
              <div className="products__filters--item">
                <h3 className="products__filters--subtitle">Category</h3>
                {categories ? (
                  categories.map(({ id, title }) => (
                    <button
                      onClick={this.setQuery}
                      className="products__filter"
                      data-key="catsId"
                      data-id={id}
                      key={id}
                    >
                      <input className="checkbox" type="checkbox" />
                      {title}
                    </button>
                  ))
                ) : (
                  <Loading />
                )}
              </div>
              <div className="products__filters--item">
                <h3 className="products__filters--subtitle">Color</h3>
                {colors ? (
                  colors.map(({ id, color }) => (
                    <button
                      onClick={this.setQuery}
                      className="products__filter"
                      data-key="colorsId"
                      data-id={id}
                      key={id}
                    >
                      <input className="checkbox" type="checkbox" />
                      {color}
                    </button>
                  ))
                ) : (
                  <Loading />
                )}
              </div>
              <div className="products__filters--item">
                <h3 className="products__filters--subtitle">Size</h3>
                {sizes ? (
                  sizes.map(({ id, size }) => (
                    <button
                      onClick={this.setQuery}
                      className="products__filter"
                      data-key="sizesId"
                      data-id={id}
                      key={id}
                    >
                      <input className="checkbox" type="checkbox" />
                      {size}
                    </button>
                  ))
                ) : (
                  <Loading />
                )}
              </div>
            </div>
            <div className="products__main">
              <Slider {...settings}>
                <Link to="/products">
                  <img src={banner2} alt="" />
                </Link>
                <Link to="/products">
                  <img src={banner2} alt="" />
                </Link>
                <Link to="/products">
                  <img src={banner2} alt="" />
                </Link>
              </Slider>
              <div className="products__other-filters">
                <select className="mr-auto" onChange={this.handleSelect}>
                  <option value="default">Sort by:</option>
                  <option value="priceHigh">Price high to low</option>
                  <option value="priceLow">Price low to high</option>
                  <option value="new">Newness</option>
                  <option value="rating">Rating</option>
                </select>
                <button
                  onClick={this.setView}
                  className={`products__view ${
                    view === "gallery" ? "is-active" : ""
                  }`}
                  data-view="gallery"
                  title="Gallery View"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    width="24"
                    height="24"
                  >
                    <path d="M409.6 411.733333a2.133333 2.133333 0 0 0 2.133333-2.133333V204.8a2.133333 2.133333 0 0 0-2.133333-2.133333H204.8a2.133333 2.133333 0 0 0-2.133333 2.133333v204.8c0 1.152 0.981333 2.133333 2.133333 2.133333h204.8z m0 64H204.8A66.133333 66.133333 0 0 1 138.666667 409.6V204.8c0-36.522667 29.610667-66.133333 66.133333-66.133333h204.8c36.522667 0 66.133333 29.610667 66.133333 66.133333v204.8a66.133333 66.133333 0 0 1-66.133333 66.133333zM819.2 411.733333a2.133333 2.133333 0 0 0 2.133333-2.133333V204.8a2.133333 2.133333 0 0 0-2.133333-2.133333h-204.8a2.133333 2.133333 0 0 0-2.133333 2.133333v204.8c0 1.152 0.981333 2.133333 2.133333 2.133333h204.8z m0 64h-204.8a66.133333 66.133333 0 0 1-66.133333-66.133333V204.8c0-36.522667 29.610667-66.133333 66.133333-66.133333h204.8c36.522667 0 66.133333 29.610667 66.133333 66.133333v204.8a66.133333 66.133333 0 0 1-66.133333 66.133333zM409.6 821.333333a2.133333 2.133333 0 0 0 2.133333-2.133333v-204.8a2.133333 2.133333 0 0 0-2.133333-2.133333H204.8a2.133333 2.133333 0 0 0-2.133333 2.133333v204.8c0 1.152 0.981333 2.133333 2.133333 2.133333h204.8z m0 64H204.8a66.133333 66.133333 0 0 1-66.133333-66.133333v-204.8c0-36.522667 29.610667-66.133333 66.133333-66.133333h204.8c36.522667 0 66.133333 29.610667 66.133333 66.133333v204.8a66.133333 66.133333 0 0 1-66.133333 66.133333zM819.2 821.333333a2.133333 2.133333 0 0 0 2.133333-2.133333v-204.8a2.133333 2.133333 0 0 0-2.133333-2.133333h-204.8a2.133333 2.133333 0 0 0-2.133333 2.133333v204.8c0 1.152 0.981333 2.133333 2.133333 2.133333h204.8z m0 64h-204.8a66.133333 66.133333 0 0 1-66.133333-66.133333v-204.8c0-36.522667 29.610667-66.133333 66.133333-66.133333h204.8c36.522667 0 66.133333 29.610667 66.133333 66.133333v204.8a66.133333 66.133333 0 0 1-66.133333 66.133333z"></path>
                  </svg>
                </button>
                <button
                  onClick={this.setView}
                  className={`products__view ${
                    view === "list" ? "is-active" : ""
                  }`}
                  data-view="list"
                  title="List View"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    width="24"
                    height="24"
                  >
                    <path d="M128 236.8v-64h768v64zM128 544v-64h768v64zM128 851.2v-64h768v64z"></path>
                  </svg>
                </button>
              </div>
              <div className="products-sheet">
                {!empty && !products && <Loading />}
                {empty && <h3 className="not-found">No products found</h3>}
                {products &&
                  products.map(({ id, img, title, price }) => (
                    <div
                      className={`products-sheet__card ${
                        view === "list" ? "products-card-list" : ""
                      }`}
                      key={id}
                    >
                      <Link
                        to={`/products/${id}`}
                        className="product-card-img-wrap"
                      >
                        <img
                          className="max-size"
                          src={require(`../../assets/img/${img}`).default}
                          alt=""
                        />
                      </Link>
                      <div className="products__content">
                        <Link
                          to={`/products/${id}`}
                          className="product-card-title"
                        >
                          {title.substr(0, 35)}...
                        </Link>
                        <p className="product-card-price">${price}</p>
                      </div>
                    </div>
                  ))}
              </div>
              {count ? (
                <Pags handle={this.getProducts} count={count} limit="9" />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
