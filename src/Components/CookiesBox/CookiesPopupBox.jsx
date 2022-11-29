/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./CookiesPopupBox.css";
import { Button } from "reactstrap";
import { translate } from "react-switch-lang";
import { getLanguage } from "react-switch-lang";
import Cookies from "universal-cookie";

var CryptoJS = require("crypto-js");
var cookies = new Cookies();

const CookiesPopupBox = (props) => {
  const trans = props.t;
  const [ShowCookieBox, setShowCookieBox] = useState(true);

  // Decrypt
  const isCookieAllow_Encrypted = cookies.get("is_cookie_allow");
  const bytesIsCookieAllow = CryptoJS.AES.decrypt(
    isCookieAllow_Encrypted ? isCookieAllow_Encrypted : "no_value",
    "#is_cookie_allow"
  );
  console.log("bytesIsCookieAllow -----", bytesIsCookieAllow.toString().length);
  var isCookieAllowDecode = false;
  try {
    isCookieAllowDecode =
      bytesIsCookieAllow != null &&
      bytesIsCookieAllow != undefined &&
      bytesIsCookieAllow?.toString().length > 0 &&
      JSON.parse(bytesIsCookieAllow?.toString(CryptoJS?.enc?.Utf8));
  } catch (e) {
    console.log("ERROIR ---------", e);
  }

  // console.log("cooookieee-box-cookies.get('is_cookie_allow:')", cookies.get('is_cookie_allow'))
  // console.log("cooookieee-box:", isCookieAllowDecode)
  // console.log("cooookieee-box-type:", typeof(isCookieAllowDecode))
  // console.log("cooookieee-box", cookies.get('is_cookie_allow'))

  useEffect(() => {
    if (isCookieAllowDecode != true) {
      cookies.remove("language_cookie", { path: "/" });
    }
  }, []);

  return (
    <>
      {isCookieAllowDecode != true && ShowCookieBox == true && (
        <CookiesBox trans={trans} setShowCookieBox={setShowCookieBox} />
      )}
    </>
  );
};

export const CookiesBox = (props) => {
  const { trans, setShowCookieBox } = props;
  const handleAccept = () => {
    // Encrypt
    var is_cookie_data = true;
    const isCookieAllow_Encrypt = CryptoJS.AES.encrypt(
      JSON.stringify(is_cookie_data),
      "#is_cookie_allow"
    ).toString();

    const cookie_expires_date = new Date();
    cookie_expires_date.setFullYear(new Date().getFullYear() + 1);
    cookies.set("is_cookie_allow", isCookieAllow_Encrypt, {
      path: "/",
      expires: cookie_expires_date,
    });

    cookies.set("language_cookie", getLanguage(), {
      path: "/",
      expires: cookie_expires_date,
    });

    setShowCookieBox(false);
  };

  const handleDecline = () => {
    cookies.set("is_cookie_allow", "false", { path: "/" });
    setShowCookieBox(false);
  };

  return (
    <div className="cookies-popup-box">
      <div className="cookies-popup-box-body">
        <img
          className="cookie-img img-fluid"
          src={`${process.env.PUBLIC_URL}/images/rd-logo-footer.png`}
          alt=""
        />
        <p className="cookie-message">{trans("Cookies_Text")}</p>
      </div>
      <div className="cookies-popup-box-footer">
        <div className="cookies-popup-box-buttons">
          <Button className="cookie_accept_button" onClick={handleAccept}>
            {trans("I Accept")}
          </Button>
          {/* <Button className='cookie_decline_button' onClick={handleDecline}>{trans("I Decline")}</Button> */}
        </div>
      </div>
    </div>
  );
};

export default translate(CookiesPopupBox);
