import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./breadcrumb.scss";

export const Breadcrumb = () => {
  const { pathname } = useLocation();
  return (
    <section className="breadcrumb">
      <div className="container">
        <nav className="breadcrumb__nav">
          <Link className="breadcrumb__link" to="/">
            Home
          </Link>
          {pathname
            .split("/")
            .filter(Boolean)
            .map((path, index) => (
              <React.Fragment key={index}>
                <svg
                  className="breadcrumb__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="7"
                  viewBox="0 0 4 7"
                >
                  <path
                    d="M.451,6.928A.267.267,0,0,1,.264,7a.267.267,0,0,1-.187-.072.237.237,0,0,1,0-.35L3.362,3.5.077.422a.237.237,0,0,1,0-.35.277.277,0,0,1,.374,0L3.923,3.325a.237.237,0,0,1,0,.35L.451,6.928Z"
                    fill="#211f1f"
                  />
                </svg>
                <Link
                  className={`breadcrumb__link ${
                    pathname.endsWith(path) ? "is-active" : ""
                  }`}
                  to={`${pathname.match(new RegExp(".*" + path))}`}
                >
                  {path.includes("-")
                    ? path
                        .split("-")
                        .map((e) => e.replace(/^./, e[0].toUpperCase()))
                        .join(" ")
                    : path.replace(/^./, path[0].toUpperCase())}
                </Link>
              </React.Fragment>
            ))}
        </nav>
      </div>
    </section>
  );
};
