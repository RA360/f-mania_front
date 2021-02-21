import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import NProgress from "nprogress";
import { Pags } from "../../components/pags/Pags";
import { Loading } from "../../components/Loading";
import "./search.scss";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      empty: false,
      products: null,
      count: 0,
    };
    this.getProducts = this.getProducts.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
  }
  componentDidMount() {
    NProgress.done();
    this.getProducts();
  }
  getProducts(page = 0) {
    const params = new URLSearchParams(this.props.location.search),
      query = params.get("q");
    document.title = `Search results for "${query}" – F-mania`;
    query
      ? axios
          .get(
            `http://api.f-mania/v1/search?q=${query}&${
              page ? `page=${page}&` : ""
            }limit=12`
          )
          .then(({ data }) => {
            this.setState({ products: data.products });
            !page && this.setState({ count: data.count });
          })
          .catch(
            ({ response }) =>
              response.status === 404 && this.setState({ empty: true })
          )
      : this.setState({ empty: true });
  }
  render() {
    const { empty, products, count } = this.state;
    return (
      <section className="search">
        <div className="container">
          {!empty && !products && <Loading />}
          {empty && (
            <h3 className="not-found">Sorry, we couldn't find any products</h3>
          )}
          {products && (
            <div className="products-sheet">
              {products.map(({ id, img, title, price }) => (
                <div className="products-sheet__card" key={id}>
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
                </div>
              ))}
            </div>
          )}
          {count ? (
            <Pags handle={this.getProducts} count={count} limit="12" />
          ) : null}
        </div>
      </section>
    );
  }
}

export default withRouter(Search);
