/* eslint-disable jsx-a11y/anchor-is-valid */
import { Grid, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./footer.css";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { translate } from "react-switch-lang";
import logo from "../../assets/logo.png"
import footer_top_slide from "../../assets/footer_top_slide.png"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { URL } from "../../env";

const blue = {
  500: "#fff",
  600: "#a9a9a9",
  700: "#a9a9a9",
};

const CustomButtonRoot = styled("button")`
  font-family: JellyDonuts;
  font-size: 16px;
  font-weight: bold;
  background-color: ${blue[500]};
  padding: 5px 18px;
  border-radius: 25px;
  margin-right: 10px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  color: #000;
  margin-left: 13%;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }
  @media screen and (max-width: 380px) {
    font-size: 24px;
  }
  @media screen and (max-width: 340px) {
    font-size: 18px;
  }
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

const Footer = (props) => {
  const trans = props.t;

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const id = 3;

  const [stores, setStores] = useState(null);

  useEffect(() => {
    const getStores = async () => {
      const response = await axios.get(
        `${URL}/pages`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      );
      const data = response.data.pages;
      setStores(data);
    };
    getStores();
  }, []);

  return (
    <div
      id="footer_main"
      className="container-fluid d-flex_ justify-content-center_"
    >
      <div className="footer-shape-divider-top">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>
      <div className="row d-flex justify-content-center pt-3 mx-0">
        <div className="col-12 col-sm-11 col-md-10 px-0">
          <div className="row w-100">
            <div className="col-12 col-sm-6 col-md-4 infoCol grid_section mb-3">
              {/* <h1 id="heading_links" className="mb-2">{trans("Social Links")}</h1> */}
              <img src={`/images/footerLogo.png`} id="logoImage" alt="" />
              <div className="firstCol">
                <span id="para">
                  {trans(
                    "Our donuts are always freshly made and decorated in each store, each donut is absolutely unique and handmade.."
                  )}
                </span>
              </div>
              <div
                className="social_div mb-4">
                {/* <img src="/images/facebook.png" id="social_link" alt="" />
                <img src="/images/instagram.png" id="social_link" alt="" />
                <img src="/images/twitter.png" id="social_link" alt="" />
                <img src="/images/linkedin.png" id="social_link" alt="" /> */}
                <div className="icon_box">
                  <FacebookIcon />
                </div>
                <div className="icon_box">
                  <InstagramIcon />
                </div>
                <div className="icon_box">
                  <TwitterIcon />
                </div>
                <div className="icon_box">
                  <LinkedInIcon />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 pagesCol grid_section  mb-3">
              <h3 id="heading">Pages</h3>
              {stores != null &&
                stores.map((item) => (
                  <>
                    {item.is_footer === 1 && (
                      <span className="d-flex align-items-center">
                        <i
                          className="fas fa-angle-right"
                          style={{
                            color: "white",
                            marginTop: "5px",
                            marginRight: "5px",
                          }}
                        ></i>
                        <Link
                          to={`/pages/${item.slug}`}
                          state={{
                            page_id: item.id,
                            status: item.status,
                            is_footer: item.is_footer,
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <h5 id="text"> {item.title_fr}</h5>
                        </Link>
                      </span>
                    )}
                  </>
                ))}
            </div>
            <div className="col-12 col-sm-6 col-md-3 infoCol grid_section  mb-3">
              <h1 id="heading">{trans("Information")}</h1>
              <span className="d-flex align-items-center">
                <i
                  className="fas fa-angle-right"
                  style={{ color: "white", marginTop: "5px", marginRight: "5px" }}
                ></i>{" "}
                <a id="text">{trans("Our Blog")}</a>
              </span>
              <span className="d-flex align-items-center">
                <i
                  className="fas fa-angle-right"
                  style={{ color: "white", marginTop: "5px", marginRight: "5px" }}
                ></i>{" "}
                <a id="text">{trans("About Us")}</a>
              </span>
              <span className="d-flex align-items-center">
                <i
                  className="fas fa-angle-right"
                  style={{ color: "white", marginTop: "5px", marginRight: "5px" }}
                ></i>{" "}
                <a id="text">{trans("Shop Secure")}</a>
              </span>
              <span className="d-flex align-items-center">
                <i
                  className="fas fa-angle-right"
                  style={{ color: "white", marginTop: "5px", marginRight: "5px" }}
                ></i>{" "}
                <a id="text">{trans("Shopping")}</a>
              </span>
              {/* <span className="d-flex align-items-center">
          <i
            className="fas fa-angle-right"
            style={{ color: "white", marginTop: "5px", marginRight: "5px" }}
          ></i>{" "}
          <a id="text">{trans("Privacy")}</a>
        </span>
        <span className="d-flex align-items-center">
          <i
            className="fas fa-angle-right"
            style={{ color: "white", marginTop: "5px", marginRight: "5px" }}
          ></i>{" "}
          <a id="text">{trans("Policy")}</a>
        </span>
        <span className="d-flex align-items-center">
          <i
            className="fas fa-angle-right"
            style={{ color: "white", marginTop: "5px", marginRight: "5px" }}
          ></i>{" "}
          <a id="text">{trans("Delivery")}</a>
        </span>
        <span className="d-flex align-items-center">
          <i
            className="fas fa-angle-right"
            style={{ color: "white", marginTop: "5px", marginRight: "5px" }}
          ></i>{" "}
          <a id="text">{trans("Information")}</a>
        </span> */}
            </div>
            <div className="col-12 col-sm-6 col-md-2 grid_section mb-3">
              <img className="img-fluid footer_logo" src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <Grid>
          <Grid item md={12}>
            <div>
              <img src="/images/footer_line.png" />
            </div>
            <h1
              style={{
                textAlign: "center",
                color: "#fff",
                // fontFamily: "LingLengLang",
              }}
            >
              Copyright © 2022 Royal Donuts. Tous les droits sont réservés.
            </h1>
          </Grid>
        </Grid>
      </div> */}
    </div>
  );
};

export default translate(Footer);
