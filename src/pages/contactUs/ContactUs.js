import React from "react";
import axios from "axios";
import NProgress from "nprogress";
import "./contactUs.scss";

export class ContactUs extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: null,
      success: "",
    };
    this.postMsg = this.postMsg.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
    document.title = "Contact Us – F-mania";
  }
  componentDidMount() {
    NProgress.done();
  }
  postMsg(e) {
    e.preventDefault();
    this.setState({
      errors: null,
      success: "",
    });
    axios
      .post("http://api.f-mania/v1/contact", new FormData(e.target))
      .then(({ data }) => {
        this.setState({ success: data });
      })
      .catch(
        ({ response }) =>
          response.status === 400 &&
          this.setState({ errors: response.data.errors })
      );
  }
  render() {
    const { errors, success } = this.state;
    return (
      <section className="contact-us">
        <div className="container">
          <div className="contact-us__main">
            <h2 className="contact-us__offer">Leave a Message</h2>
            <p className="contact-us__hint">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC.
            </p>
            {errors &&
              errors.map((error, index) => (
                <p className="is-error" key={index}>
                  {error}
                </p>
              ))}
            {success && <p className="is-success">{success}</p>}
            <form onSubmit={this.postMsg} className="contact-us__form">
              <input
                name="fullName"
                className="contact-us__input"
                placeholder="Name"
                pattern="^[a-zA-Z]+\s[a-zA-Z]+$"
                title="Only allows letters and a space between"
                required
              />
              <input
                name="email"
                className="contact-us__input"
                type="email"
                placeholder="Email"
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                title="Enter valid format"
                required
              />
              <textarea
                className="contact-us__txt"
                name="txt"
                placeholder="Write here"
                pattern=".{1,1000}"
                title="Length should not exceed 1000"
                required
              ></textarea>
              <button type="submit" className="contact-us__btn btn btn_black">
                Submit
              </button>
            </form>
          </div>
          <div>
            <div className="contact-us__item">
              <div className="contact-us__circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.977"
                  height="12.959"
                  viewBox="0 0 16.977 12.959"
                >
                  <g transform="translate(0.001 -0.025)">
                    <path
                      d="M14.9,12.958H2.076A2.082,2.082,0,0,1,0,10.876V2.083A2.083,2.083,0,0,1,2.076,0H14.9a2.055,2.055,0,0,1,1.464.609,2.074,2.074,0,0,1,.608,1.477v8.79A2.082,2.082,0,0,1,14.9,12.958ZM2.076.954A1.131,1.131,0,0,0,.948,2.085v8.79a1.131,1.131,0,0,0,1.128,1.131H14.9a1.13,1.13,0,0,0,1.126-1.131l0-8.79A1.132,1.132,0,0,0,14.9.954Z"
                      transform="translate(0 0.026)"
                      fill="#1d1f1f"
                    />
                    <path
                      d="M8.748,4.568,12.9.833a.476.476,0,0,0-.636-.708L6.538,5.279l-1.117-1s-.007-.007-.007-.011A.7.7,0,0,0,5.337,4.2L.792.121A.473.473,0,0,0,.121.16.476.476,0,0,0,.16.833L4.361,4.6.177,8.527A.479.479,0,0,0,.156,9.2.484.484,0,0,0,.5,9.352a.474.474,0,0,0,.323-.127L5.074,5.24,6.226,6.273a.472.472,0,0,0,.632,0L8.042,5.205l4.222,4.023a.474.474,0,0,0,.671-.018.479.479,0,0,0-.018-.673Z"
                      transform="translate(1.958 1.829)"
                      fill="#1d1f1f"
                    />
                  </g>
                </svg>
              </div>
              <a href="mailto:f-mania@mail.ru">
                <b>support@f-mania.com</b>
              </a>
            </div>
            <div className="contact-us__item">
              <div className="contact-us__circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.977"
                  height="18.972"
                  viewBox="0 0 18.977 18.972"
                >
                  <g>
                    <path
                      d="M14.548,18.973c-.089,0-.183,0-.27-.007a10.39,10.39,0,0,1-3.758-1.106,20.076,20.076,0,0,1-6.691-5.214A18.291,18.291,0,0,1,.564,7.222,7.4,7.4,0,0,1,.017,4.069,3.1,3.1,0,0,1,.944,2.092L2.395.633,2.4.626A2.091,2.091,0,0,1,3.856,0a2.025,2.025,0,0,1,1.43.625c.268.244.521.5.8.789.129.139.267.276.4.4L7.65,2.979a2.08,2.08,0,0,1,.674,1.473A2.073,2.073,0,0,1,7.65,5.92l-.057.059-.026.027c-.09.092-.184.186-.275.277L7.274,6.3c-.292.3-.624.634-.972.952a8.5,8.5,0,0,0,1.151,1.81A14.607,14.607,0,0,0,10.97,12.25c.126.079.271.152.422.226.107.055.217.112.329.171l1.35-1.341a2.062,2.062,0,0,1,1.459-.654,1.989,1.989,0,0,1,1.443.659l2.344,2.342a2.033,2.033,0,0,1,.659,1.459,2.117,2.117,0,0,1-.646,1.471c-.158.165-.34.344-.554.547l-.041.039a8.5,8.5,0,0,0-.707.731.051.051,0,0,1-.007.008.04.04,0,0,0-.012.012A3.215,3.215,0,0,1,14.548,18.973ZM3.865,1.148a.972.972,0,0,0-.649.3L1.759,2.9a1.957,1.957,0,0,0-.588,1.263,6.051,6.051,0,0,0,.479,2.661,17.335,17.335,0,0,0,3.073,5.1,18.944,18.944,0,0,0,6.3,4.914,9.322,9.322,0,0,0,3.332.994c.063,0,.131,0,.2,0a2.064,2.064,0,0,0,1.605-.675,11.057,11.057,0,0,1,.823-.85l.1-.1.024-.024c.142-.136.27-.26.4-.4a.837.837,0,0,0,0-1.329l-2.354-2.342s0,0-.009-.009a.871.871,0,0,0-.613-.31.969.969,0,0,0-.646.319l-1.459,1.452a.908.908,0,0,1-.649.294.918.918,0,0,1-.422-.107l-.026-.015-.026-.015c-.107-.066-.231-.129-.363-.2l-.014-.007-.045-.023a5.214,5.214,0,0,1-.524-.285A15.6,15.6,0,0,1,6.554,9.78,9.409,9.409,0,0,1,5.172,7.537l-.007-.019L5.158,7.5a.869.869,0,0,1,.224-.964c0-.007.008-.011.014-.016l.007,0c.4-.358.766-.725,1.071-1.037l.249-.249.118-.118a.952.952,0,0,0,.341-.657.953.953,0,0,0-.341-.661L5.676,2.632c-.086-.089-.173-.177-.258-.263l-.042-.042L5.27,2.22c-.257-.264-.509-.521-.768-.762l-.014-.014A.893.893,0,0,0,3.865,1.148Z"
                      transform="translate(0.001 -0.001)"
                      fill="#1d1f1f"
                    />
                  </g>
                </svg>
              </div>
              <a href="tel:0112345678901">
                <b>01 123 4567 8901</b>
              </a>
            </div>
            <div className="contact-us__item">
              <div className="contact-us__circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="20"
                  viewBox="0 0 14 20"
                >
                  <g transform="translate(0 -0.001)">
                    <path
                      id="Shape"
                      d="M7.1,20h0a.58.58,0,0,1-.494-.278L1.045,10.728A7.011,7.011,0,1,1,14,7.032a7.055,7.055,0,0,1-.987,3.6L7.6,19.716A.586.586,0,0,1,7.1,20ZM7,1.164A5.86,5.86,0,0,0,2.037,10.11l5.051,8.178,4.924-8.256A5.868,5.868,0,0,0,7,1.164Z"
                      fill="#1d1f1f"
                    />
                    <path
                      d="M3.5,7.03A3.516,3.516,0,1,1,7,3.515,3.511,3.511,0,0,1,3.5,7.03Zm0-5.866a2.351,2.351,0,1,0,2.339,2.35A2.348,2.348,0,0,0,3.5,1.165Z"
                      transform="translate(3.5 3.516)"
                      fill="#1d1f1f"
                    />
                  </g>
                </svg>
              </div>
              <a
                href="https://goo.gl/maps/9aGZ51D5rxm1RivS6"
                rel="noopener noreferrer"
                target="_blank"
              >
                <b>402 Floor 12, LA Building - Street Name, CA</b>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
