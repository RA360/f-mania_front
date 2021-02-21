import React from "react";
import "./pags.scss";

export class Pags extends React.Component {
  constructor() {
    super();
    this.state = {
      pags: null,
      page: 1,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const pages = Math.ceil(this.props.count / this.props.limit);
    pages > 1 &&
      this.setState({ pags: Array.from({ length: pages }, (_, i) => ++i) });
  }
  handleClick(e) {
    const { page } = e.target.dataset;
    this.setState({ page: +page });
    this.props.handle(page);
  }
  render() {
    const { pags, page } = this.state;
    return (
        pags && (
          <div className="pags">
            {pags.map((digit) => (
              <button
                onClick={this.handleClick}
                className={`pag ${digit === page ? "is-active" : ""}`}
                data-page={digit}
                key={digit}
              >
                {digit}
              </button>
            ))}
          </div>
        )
    );
  }
}
