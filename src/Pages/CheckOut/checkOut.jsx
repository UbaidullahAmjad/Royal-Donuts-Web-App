/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./checkOut.css";
import { translate } from "react-switch-lang";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import CopyRight from "../copy-right/CopyRight";
import { ArrowBack } from "@material-ui/icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../assets/royal_donuts_logo_checkout.png";
import CheckOutTabs from "./checkOutTabs";

const checkOut = (props) => {
  const trans = props.t;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  // console.log("checkout-location", location.state);
  const isCartFilled = location.state ? location.state.isCartFilled : false;
  const showGuestTabOnTabLogin =
    location.state && location.state.showGuestTabOnTabLogin;


  return (
    <>
      {isCartFilled === true ? (
        <>
          {/* <Header /> */}
          <div
            className="top_back_to_shipping_btn"
            onClick={() => navigate("/produits", { replace: true })}
          >
            <ArrowBackIcon className="icon" />
          </div>
          <div className="container-fluid">
            <div className="checkout__page_wrapped">
              <div className="row m-0 justify-content-center">
                <div className="col-sm-12 col-md-11 col-lg-10">
                  <div className="backBtn_config_cartPage col-12">
                    <button className="arrow_back_cartPage">
                      <ArrowBack
                        onClick={() => navigate("/cart")}
                        style={{ cursor: "pointer" }}
                      />
                    </button>
                  </div>
                  <CheckOutTabs isCartFilled={isCartFilled} showGuestTabOnTabLogin={showGuestTabOnTabLogin} />
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
          <CopyRight />
        </>
      ) : (
        <Navigate to="/cart" replace />
      )}
    </>
  );
};

export default translate(checkOut);
