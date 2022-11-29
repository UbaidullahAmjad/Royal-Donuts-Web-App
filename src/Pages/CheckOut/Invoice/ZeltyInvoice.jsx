/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import moment from "moment";
import { Container } from "@material-ui/core";
import { Divider } from "@mui/material";
import logo from "../../../assets/logo.png";
import { NavLink, useLocation, useNavigate, Navigate, useParams, Link } from "react-router-dom";
import { Email } from "@material-ui/icons";
import { Col } from "react-bootstrap";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../../Components/Header/Header";
import { translate } from "react-switch-lang";
import { useDispatch, useSelector } from "react-redux";
import { deleteFullCart } from "../../../redux/CartPage/myCartAction";
import { ClearPaypalPaymentInvoiceAction } from "../../../redux/CheckOut/PaymentMethod/Paypal/PaypalPaymentAction";
import { ClearStripePaymentInvoiceAction } from "../../../redux/CheckOut/PaymentMethod/Stripe/StripePaymentAction"
// import "./styles.css"

const ZeltyInvoice = (props) => {
  const trans = props.t;
  const location = useLocation();
  const dispatch = useDispatch();
  console.log('locationh', location)

  let isInvoice = location.state ? location.state.isInvoice : false;
  let orderItems = location.state && location.state.orderItems;
  let order = location.state && location.state.order;
  let cardData = location.state && location.state.cardData;
  let user = location.state?.user ?? null;
  let userRole = location.state && location.state.user_role;
  let delivery_data_info = location.state && location.state.delivery_info_data;
  let isDefaultValues = location?.state?.isDefaultValues ?? false
  let user_new_info = location.state?.user_new_info ?? null;
  let couponSymbol = location.state ? location.state.symbol != "" && location.state.symbol != undefined ? location.state.symbol : "€" : "€";
  let zeltyData = location.state.zelty_data
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name);
  const [address, setAddress] = useState(user?.address);
  const [email, setEmail] = useState(user?.email);

  useEffect(() => {
    dispatch(deleteFullCart());
    dispatch(ClearPaypalPaymentInvoiceAction());
    dispatch(ClearStripePaymentInvoiceAction());

    if (isDefaultValues && isDefaultValues == false) {
      // setName(user_new_info.first_name + " " + user_new_info.last_name)
      // setEmail(user_new_info.email !== null ? user_new_info.email : user.email)
      // setEmail(user_new_info.custome_address !== null ? user_new_info.custome_address : user.address)

      if (user_new_info != undefined && user_new_info != null && user_new_info != "") {
        setName(user_new_info.first_name + " " + user_new_info.last_name);
        setEmail(
          user_new_info.email !== null ? user_new_info.email : user.email
        );
        setAddress(
          user_new_info.custome_address !== null
            ? user_new_info.custome_address
            : user.address
        );
      }

    } else {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
    }
  }, [user_new_info]);



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("DELIVEFY --- ", delivery_data_info);
  console.log("ORDER --- ", order);

  return (
    <>
      {isInvoice == false ? (
        <Navigate to="/produits" replace />
      ) : (
        <Container maxWidth="lg">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <img src={logo} alt="" />
            <div style={{ alignSelf: "center" }}>
              <h3 style={{ textAlign: "center" }}>
                {trans("Order")} # : {zeltyData?.order.id}
              </h3>
              <h6 style={{ textAlign: "center" }}>
                <b>{trans("Store")}:</b>{" "}
                {/* {delivery_data_info != undefined && delivery_data_info.address} */}
                {delivery_data_info != undefined && delivery_data_info}
              </h6>
            </div>
            <h6 style={{ alignSelf: "center" }}>info@royal-donuts.de</h6>
          </div>
          <div className="printmedia">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <div>
                <button
                  className="btn btn-primary_ p-2"
                  style={{ backgroundColor: "#FF6295", color: "#FFF" }}
                  onClick={() => navigate("/produits", { replace: true })}
                >
                  {trans("Keep Shopping")}
                </button>
              </div>
              <div>
              {/* <Link to = '/invoice' className="btn btn-secondary py-2 px-3 me-2">
               Go Back
              </Link> */}
              <button
                className="btn btn-secondary py-2 px-3 me-2 " 
                onClick={() => navigate(-1)}
              
              >
                Back
              </button>
              <button
                className="btn btn-success_ py-2 px-3"
                onClick={() => window.print()}
                style={{ backgroundColor: "#FF6295", color: "#FFF" }}
              >
                Print
              </button>
              </div>
            </div>
          </div>

          <h2 style={{ textAlign: "center" }}>{trans("Zelty Order Summary")}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            <div style={{ width: "50%" }}>
              <h6>
                <b>{trans("Name")}:</b> {name}
              </h6>
            </div>
            <div
              style={{ width: "50%", display: "flex", justifyContent: "end" }}
            >
              <h6>
                <b>{trans("Email")}:</b> {email}
              </h6>
            </div>
            {/* <div style={{ width: "50%" }}>
              <h6>
                <b>{trans("User")}:</b> {trans(user_role)}
              </h6>
            </div> */}
            <div style={{ width: "50%" }}>
              <h6>
                <b>{trans("Address")}:</b> {address}
              </h6>
            </div>
            <div
              style={{ width: "50%", display: "flex", justifyContent: "end" }}
            >
              <h6>
                <b>{trans("Payment-Type")}: </b>
                {cardData.card ? cardData.card.brand : cardData}
              </h6>
            </div>
            <div style={{ width: "50%" }}>
              <h6>
                <b>{trans("Order Method")}:</b>{" "}
                {order?.delivery_method == "Delivery"
                  ? trans("Delivery")
                  : trans("Takeaway")}
              </h6>
            </div>
            <div
              style={{ width: "50%", display: "flex", justifyContent: "end" }}
            >
              <h6>
                <b>{trans("Delivery Date")}: </b>
                {moment(order?.delivery_date).format("YYYY-MM-DD HH-MM")}
              </h6>
            </div>

            {/* <div style={{ width: '50%' }}>
        <h6><b>Postol Code:</b> {postalCode}</h6>
    </div> */}
          </div>

          <Divider />
          <Paper>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>{trans("Name")}</TableCell>
                    <TableCell align="right">{trans("Type")}</TableCell>
                    <TableCell align="right">{trans("Price")}</TableCell>
                    <TableCell align="right">{trans("Sub-Total")}</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  { zeltyData?.order.items.length > 0 &&
                    zeltyData?.order.items
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    // .filter((item) => item.subtotal > 0)
                    // .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((item) => {
                      return (
                       
                        <TableRow key={item.item_id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="right">{item.type} </TableCell>
                          <TableCell align="right">
                            {item.price.base_original_amount_inc_tax} <span>€</span>
                          </TableCell>
                          <TableCell align="right">
                            {item.price.original_amount_inc_tax}{" "}
                            <span>€</span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>

                    <TableCell align="left">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          float: "right",
                        }}
                      >
                        <strong className="">{trans("Grand Total")}</strong>
                        <strong>{trans("Discount")}</strong>
                        <strong>{trans("Total Amount")}</strong>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div className="d-flex flex-column ">
                        <strong>
                          {zeltyData?.order.price.final_amount_inc_tax} <span>€</span>
                        </strong>
                        <strong>
                          {order.discount} <span>{couponSymbol}</span>
                        </strong>
                        <strong>
                          {zeltyData?.order.price.final_amount_inc_tax} <span>€</span>
                        </strong>
                        {/* {
                          parseFloat(order.discount) >
                            parseFloat(order.total) ? (
                            <strong>
                              {(
                                parseFloat(order.total) - parseFloat(order.total)
                              ).toFixed(2)}{" "}
                              <span>€</span>
                            </strong>
                          ) : (
                            <strong>
                              {(
                                parseFloat(order.total) -
                                parseFloat(order.discount)
                              ).toFixed(2)}{" "}
                              <span>€</span>
                            </strong>
                          )
                        } */}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default translate(ZeltyInvoice);
