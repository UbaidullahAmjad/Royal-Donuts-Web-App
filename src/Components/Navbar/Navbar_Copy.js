/* eslint-disable no-unused-expressions */
/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import "./navbar.css";
import { Button } from "@mui/material";
import { Nav, Navbar, Dropdown, NavDropdown, Container } from "react-bootstrap";
import { ReactComponent as CartIcon } from "../../assets/Cart.svg";
import getDeviceType from '../Hooks/useDeviceDetector';
import getWindowDimensions from '../Hooks/useWindowDimensions';

import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  setLanguage,
  translate,
  getLanguage,
} from "react-switch-lang";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useDispatch, useSelector } from "react-redux";
import en from "../../assets/lang/en.json";
import fr from "../../assets/lang/fr.json";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { isTokenExpiryTime } from "../../redux/actions/tokenexpire";
import { isTokenAvailable } from "../../redux/actions/token";
import NavbarCart from "./NavbarCart";

setTranslations({ en, fr });
setDefaultLanguage("fr");
setLanguageCookie();

const Item = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  "&:hover": {
    backgroundColor: blue[700],
  },
}));

const blue = {
  500: "#f36292",
  600: "#C25C7C",
  700: "#C25C7C",
};

const CustomButtonRoot = styled(Button)({
  fontFamily: "JellyDonuts",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: `${blue[500]}`,
  padding: "0px 24px",
  borderRadius: "25px",
  marginRight: "10px",
  color: "white",
  transition: "all 150ms ease",
  cursor: "pointer",
  border: "none",

  "&:hover": {
    backgroundColor: `${blue[600]}`,
    borderColor: `${blue[600]}`,
    boxShadow: "none",
  },

  "&:active": {
    boxShadow: "none",
    backgroundColor: `${blue[700]}`,
    borderColor: `${blue[700]}`,
  },

  "&:focus": {
    boxShadow: `0 0 0 0.2rem ${blue[500]}`,
  },
});

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

const CompNavbar = (props) => {
  const trans = props.t;

  // const [selectedLang, setSelectedLang] = useState("fr");
  const [selectedLang, setSelectedLang] = useState(getLanguage());
  const [ShowNavbarCart, setShowNavbarCart] = useState(false)
  const { deviceType } = getDeviceType();
  const { screenWidth, screenHeight } = getWindowDimensions();
  const currentPage = window.location.pathname;
  const [bottomCartBtnMargin, setBottomCartBtnMargin] = useState(0);

  // OPEN SIDEBAR
  const [openNav, setOpenNav] = useState(false);
  // Change Navbar Bg Color on Scroll
  const [navBar, setNavBar] = useState(false);

  const navBarBg = () => {
    if (window.scrollY >= 10) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  console.log("deviceType", deviceType)
  // console.log("navbar-screenWidth", screenWidth)

  const handleSetLanguage = () => {
    if (getLanguage() === "en") {
      setLanguage("fr");
      setSelectedLang("fr");
    }
    if (getLanguage() === "fr") {
      setLanguage("en");
      setSelectedLang("en");
    }
  };

  const navigate = useNavigate();
  // let products = useSelector((state) => state.addItems?.products);
  let products = useSelector((state) => state.myProductsCart.cartItems);

  console.log("products123  ----------------", products);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScroll / height

    // setScrollYPosition(scrolled)
    if (currentPage.includes("/produit")) {
      if (scrolled >= 0.240) {
        setBottomCartBtnMargin(100)
      } else {
        setBottomCartBtnMargin(0)
      }
    }
  }

  const dispatch = useDispatch();
  useEffect(() => {
    setSelectedLang(getLanguage());
    window.addEventListener('scroll', listenToScroll);
    window.addEventListener("scroll", navBarBg);

    return () => {
      window.addEventListener('scroll', listenToScroll);
    };
  }, []);

  dispatch(isTokenAvailable());
  dispatch(isTokenExpiryTime());
  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);

  return (
    <>
      <div>
        {/* <div style={{ position: "relative" }}>
         <img src="/images/flow_1.png" alt="" id="flow_right_image" />
       </div> */}
        <Navbar bg="transparent" expand="lg">
          <Container>
            <Navbar.Brand
             /** href="/" */ onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <img
                src="/images/royal_donuts_logo.png"
                height={50}
                alt=""
                id="logo_image"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link
                 /*href="/produits"*/ onClick={() => navigate("/produits")}
                >
                  <CustomButton id="products" variant="contained">
                    {trans("Our Products")}
                  </CustomButton>
                </Nav.Link>
                <Nav.Link
                 /*href="/points-vente"*/ onClick={() =>
                    navigate("/points-vente")
                  }
                >
                  <CustomButton id="store_header" variant="contained">
                    {trans("Points of Sale")}
                  </CustomButton>
                </Nav.Link>
                {/* {products.length > 0 && (
                 <NavLink
                   to={`${process.env.PUBLIC_URL}/cart`}
                   className="prodCart_box mt-2 me-2"
                 >
                   <CartIcon className="prodCart_Icon" width="36" />
                   <span className="prodCart_items_added">
                     {Array.isArray(products) &&
                       products.length > 0 &&
                       products.reduce(
                         (prev, current) => prev + current.quantity,
                         0
                       )}
                   </span>
                 </NavLink>
               )} */}
                {/* NavbarCart of Tabs and Desktops */}
                {
                  screenWidth >= 768 && products.length > 0 && (
                    <span
                      className="prod_cart_box_wrapper mt-2 me-2"
                      onMouseEnter={() => setShowNavbarCart(true)}
                      onMouseLeave={() => setShowNavbarCart(false)}
                      onClick={() => (deviceType == "Mobile" && setShowNavbarCart(!ShowNavbarCart))}
                    >
                      <span className="prod_cart_box">
                        <span className="prod_cart_box_icon_box">
                          <ShoppingBasketIcon className="prod_cart_box_icon" />
                        </span>
                        <span className="prod_cart_item_count">
                          {Array.isArray(products) &&
                            products.length > 0 &&
                            products.reduce(
                              (prev, current) => prev + current.quantity,
                              0
                            )}
                        </span>
                        {
                          ShowNavbarCart == true && <NavbarCart
                            screenWidth={screenWidth}
                            deviceType={deviceType}
                            productLength={products.length}
                            opacity={ShowNavbarCart ? 1 : 0}
                          />
                        }
                      </span>
                    </span>
                  )
                }
                <>
                  {isTokenAvailableState ? (
                    <Dropdown>
                      <Dropdown.Toggle
                        as={AccountCircleIcon}
                        id="dropdown-custom-components"
                        className="nav_user_icon"
                      >
                        {trans("User Profile")}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ marginTop: 10 }}>
                        <Dropdown.Item eventKey="2" disabled>
                          {localStorage.getItem("name")}
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="1">
                          {" "}
                          <Link
                            to="/dashboard"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {trans("Dashboard")}
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="3"
                          onClick={() => {
                            localStorage.removeItem("user_id");
                            localStorage.removeItem("token");
                            localStorage.removeItem("token_expiry_time");
                            localStorage.removeItem("name");
                            dispatch(isTokenAvailable());
                            dispatch(isTokenExpiryTime());
                            localStorage.removeItem("user_temp");
                            localStorage.clear();

                            setTimeout(function () {
                              dispatch(isTokenAvailable());
                              dispatch(isTokenExpiryTime());
                            }, 1000);
                          }}
                        >
                          {trans("Logout")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <>
                      {/* <Nav.Link onClick={() => navigate("/login")}>
                     <CustomButton id="store_header" variant="contained">
                       {trans("Login")}
                     </CustomButton>
                   </Nav.Link> */}
                      <span
                        onClick={() => navigate("/login")}
                        style={{ cursor: "pointer" }}
                      >
                        {trans("Login")}
                      </span>
                    </>
                  )}
                </>
                <span
                  className="mx-2"
                  onClick={handleSetLanguage}
                  style={{
                    cursor: "pointer",
                    fontSize: 14,
                    zIndex: 9999,
                    display: "block",
                    margin: "auto",
                    padding: "6px",
                  }}
                >
                  {getLanguage() === "fr" ? "FR" : "EN"}
                </span>
                {/* <Nav.Link href="">
                 <ShoppingCartOutlined style={{ fill: "#fff" }} />
               </Nav.Link> */}
                {/* <Nav.Link href="#pricing">
                 <Menu style={{ fill: "#fff" }} />
               </Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* Show on Mobile Devices */}
      {
        screenWidth < 768 && products.length > 0 && (
          <span
            className="prod_cart_box_wrapper mt-2 me-2"
            onMouseEnter={() => setShowNavbarCart(true)}
            onMouseLeave={() => setShowNavbarCart(false)}
            onClick={() => (deviceType == "Mobile" && setShowNavbarCart(!ShowNavbarCart))}
            style={{ marginBottom: bottomCartBtnMargin }}
          >
            <span className="prod_cart_box">
              <span className="prod_cart_box_icon_box">
                <ShoppingBasketIcon className="prod_cart_box_icon" />
              </span>
              <span className="prod_cart_item_count">
                {Array.isArray(products) &&
                  products.length > 0 &&
                  products.reduce(
                    (prev, current) => prev + current.quantity,
                    0
                  )}
              </span>
              {
                ShowNavbarCart == true && <NavbarCart
                  screenWidth={screenWidth}
                  deviceType={deviceType}
                  productLength={products.length}
                  opacity={ShowNavbarCart ? 1 : 0}
                />
              }
            </span>
          </span>
        )
      }
    </>
  );
};

export default translate(CompNavbar);
