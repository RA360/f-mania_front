import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NProgress from "nprogress";
import Slider from "react-slick";
import { Loading } from "../../components/Loading";
import "./home.scss";
import banner1 from "../../assets/img/banner1.jpg";

const NextArrow = ({ className, onClick }) => (
  <div className={className} onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4.992"
      height="8.997"
      viewBox="0 0 4.992 8.997"
    >
      <path d="M4.812,4.944,1.047,8.812a.6.6,0,0,1-.867,0,.642.642,0,0,1,0-.891L3.511,4.5.18,1.076a.642.642,0,0,1,0-.891.6.6,0,0,1,.867,0L4.812,4.053a.642.642,0,0,1,0,.891Z" />
    </svg>
  </div>
);

const PrevArrow = ({ className, onClick }) => (
  <div className={className} onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4.992"
      height="8.997"
      viewBox="0 0 4.992 8.997"
    >
      <g transform="translate(4.997 0)">
        <path d="M-4.812,4.944l3.765,3.868a.6.6,0,0,0,.867,0,.642.642,0,0,0,0-.891L-3.511,4.5-.18,1.076a.642.642,0,0,0,0-.891.6.6,0,0,0-.867,0L-4.812,4.053a.637.637,0,0,0-.179.445A.637.637,0,0,0-4.812,4.944Z" />
      </g>
    </svg>
  </div>
);

export class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      newProducts: null,
      featuredProducts: null,
    };
    this.getProducts = this.getProducts.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
    document.title = "Home – F-mania";
  }
  componentDidMount() {
    NProgress.done();
    this.getProducts();
  }
  getProducts() {
    axios
      .get("http://api.f-mania/v1/products?sortBy=new&limit=8")
      .then(({ data }) => this.setState({ newProducts: data.products }));

    axios
      .get("http://api.f-mania/v1/products?limit=8")
      .then(({ data }) => this.setState({ featuredProducts: data.products }));
  }
  render() {
    const { newProducts, featuredProducts } = this.state,
      settings = {
        className: "home__products",
        slidesToShow: 4,
        infinite: false,
        speed: 1000,
        dots: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      },
      bannerSettings = {
        ...settings,
        className: "",
        slidesToShow: 1,
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        customPaging: () => <div className="slider-dot"></div>,
      };
    return (
      <section className="home">
        <div className="container">
          <Slider {...bannerSettings}>
            <Link to="/products">
              <img src={banner1} alt="" />
            </Link>
            <Link to="/products">
              <img src={banner1} alt="" />
            </Link>
            <Link to="/products">
              <img src={banner1} alt="" />
            </Link>
          </Slider>
          <h2 className="home__offer">New Products</h2>
          {newProducts ? (
            <Slider {...settings}>
              {newProducts.map(({ id, img, title, price }) => (
                <React.Fragment key={id}>
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
                  <Link to={`/products/${id}`} className="product-card-title">
                    {title.substr(0, 35)}...
                  </Link>
                  <p className="product-card-price">${price}</p>
                </React.Fragment>
              ))}
            </Slider>
          ) : (
            <Loading />
          )}
          <div className="home__more">
            <div className="home__more--card">
              <div className="home__more--img"></div>
              <h2 className="home__more--offer">Exclusive Offers</h2>
              <Link to="/products" className="home__more--link">
                Know More
              </Link>
            </div>
            <div className="home__more--card">
              <div className="home__more--img"></div>
              <h2 className="home__more--offer">Men & Women</h2>
              <Link to="/products" className="home__more--link">
                Know More
              </Link>
            </div>
          </div>
          <h2 className="home__offer">Featured Products</h2>
          {featuredProducts ? (
            <Slider {...settings}>
              {featuredProducts.map(({ id, img, title, price }) => (
                <React.Fragment key={id}>
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
                  <Link to={`/products/${id}`} className="product-card-title">
                    {title.substr(0, 30)}
                  </Link>
                  <p className="product-card-price">${price}</p>
                </React.Fragment>
              ))}
            </Slider>
          ) : (
            <Loading />
          )}
        </div>
      </section>
    );
  }
}
