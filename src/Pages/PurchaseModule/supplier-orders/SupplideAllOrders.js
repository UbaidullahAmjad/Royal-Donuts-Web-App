/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  Form,
  Input,
  Media,
} from "reactstrap";
import { useForm } from "react-hook-form";
import DataTable from "../../../components/dataTable/dataTable";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import SweetAlert from "sweetalert2";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  SuppliersOrdersListAction,
} from "../../../redux/Pages/PurchaseModule/SupplierOrders/actions";

const SupplideAllOrders = (props) => {
  const trans = props.t;
  const dispatch = useDispatch();
  const [OrderListCount, setOrderListCount] = useState(0);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [generateMail, setGenerateMail] = useState(false);
  const [OrderId, setOrderId] = useState(null);
  const generateMailToggle = (id) => {
    setGenerateMail(!generateMail);
    setOrderId(id);
  };

  const orderList = useSelector((state) => state.getSuppliersOrders);
  console.log("suppliersOrdersList", orderList)

  useEffect(() => {
    if (orderList?.suppliersOrdersList.length == 0) {
      dispatch(SuppliersOrdersListAction())
    }
    if (orderList && orderList.suppliersOrdersList.length > 0
      && orderList.tempArrLength != 0
      && orderList.suppliersOrdersList.length != orderList.tempArrLength) {
      dispatch(SuppliersOrdersListAction())
    }
  }, []);

  const onSubmit = (data) => {
    console.log("this is submitted data", data, " IDDDD --- ", OrderId);
    navigate({
      pathname: `/apiData/supplierApiData/allOrders/${OrderId}`,
      state: { formData: data },
    });
  };

  const getOrderStatus = (order_status) => {
    if (order_status == 0) {
      return (
        <Badge color="primary" pill>
          {trans("Pending")}
        </Badge>
      );
    } else if (order_status == 1) {
      return (
        <Badge color="info" pill>
          {trans("Confirmed")}
        </Badge>
      );
    } else if (order_status == 2) {
      return (
        <Badge color="primary" pill>
          {trans("In-Deliverd")}
        </Badge>
      );
    } else if (order_status == 3) {
      return (
        <Badge color="success" pill>
          {trans("Deliverd")}
        </Badge>
      );
    } else if (order_status == 4) {
      return (
        <Badge color="warning" pill>
          {trans("Treated")}
        </Badge>
      );
    } else if (order_status == 5) {
      return (
        <Badge color="primary" pill>
          {trans("Rectify")}
        </Badge>
      );
    } else {
      return (
        <Badge color="primary" pill>
          {trans("Pending")}
        </Badge>
      );
    }
  };

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 80 },
    { field: "order_no", title: trans("Order No."), flex: 1, minWidth: 120 },
    { field: "user_name", title: trans("User Name"), flex: 1.3, minWidth: 180 },
    { field: "supplier_name", title: trans("Supplier Name"), flex: 1.5, minWidth: 220 },
    // { field: "item_count", title: trans("Total Items"), flex: 1, minWidth: 120 },
    // {
    //     field: "total", title: trans("Total") + " €", flex: 1, minWidth: 120,
    //     render: (cellValues) => <p>{cellValues.total + " "}€</p>,
    // },
    // {
    //     field: "discount", title: trans("Discount") + " €", flex: 1, minWidth: 120,
    //     render: (cellValues) => <p>{cellValues.discount + " "}€</p>,
    // },
    // {
    //     field: "grand_total", title: trans("Grand Total") + " €", flex: 1, minWidth: 120,
    //     render: (cellValues) => <p>{cellValues.grand_total + " "}€</p>,
    // },
    {
      field: "order_status",
      title: trans("Order Status"),
      flex: 2,
      minWidth: 230,
      // renderCell: (cellValues) => <p>{getOrderStatus(cellValues.value)}</p>,
      render: (cellValues) => {
        if (cellValues.order_status == "0") {
          return (
            <div>
              <Badge color="primary" pill>
                {trans("Pending")}
              </Badge>
              <i className="fa fa-long-arrow-right ml-2 mr-2"></i>
              <a onClick={() => ChangeOrderStatus(cellValues.id, 1)}>
                <Badge style={{ cursor: "pointer" }} color="success">
                  {trans("Confirmed")}
                </Badge>
              </a>
            </div>
          );
        } else if (cellValues.order_status == "1") {
          return (
            <div>
              <Badge color="primary" pill>
                {trans("Confirmed")}
              </Badge>
              {/* <i className="fa fa-long-arrow-right ml-2 mr-2"></i>
                <a onClick={() => ChangeOrderStatus(cellValues.id, 2)}>
                    <Badge style={{ cursor: "pointer" }} color="success">
                        {trans("In-Delivery")}
                    </Badge>
                </a> */}
            </div>
          );
        } else if (cellValues.order_status == "2") {
          return (
            <div>
              <Badge color="primary" pill>
                {trans("In-Delivery")}
              </Badge>
              <i className="fa fa-long-arrow-right ml-2 mr-2"></i>
              <a onClick={() => ChangeOrderStatus(cellValues.id, 3)}>
                <Badge style={{ cursor: "pointer" }} color="success">
                  {trans("Delivered")}
                </Badge>
              </a>
            </div>
          );
        } else if (cellValues.order_status == "3") {
          return (
            <div>
              <Badge color="success" pill>
                {trans("Delivered")}
              </Badge>
            </div>
          );
        } else if (cellValues.value == "4") {
          return (
            <div>
              <Badge color="warning" pill>
                {trans("Treated")}
              </Badge>
              <i className="fa fa-long-arrow-right ml-2 mr-2"></i>
              <a onClick={() => ChangeOrderStatus(cellValues.id, 2)}>
                <Badge style={{ cursor: "pointer" }} color="success">
                  {trans("In-Delivery")}
                </Badge>
              </a>
            </div>
          );
        }
      },
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 2,
      minWidth: 200,
      render: (cellValues) => {
        return (
          <div className="text-center">
            {/* to={`/supplier/orders/invoice/${order.order.id}`} */}
            {(role == "SuperAdmin" || permissions.match("show") != null) && (
              <Link to={`/supplier/orders/invoice/${cellValues.id}`}>
                <Button color="primary mr-2 mb-1" outline>
                  <i className="fa fa-eye"></i>
                </Button>
              </Link>
            )}

            {cellValues.order_status === "1" && (
              <Button
                // color="primary"
                className="mr-2 mb-1"
                onClick={() => generateMailToggle(cellValues.id)}
              >
                {/* {trans("Generate") + " " + trans("Email")} */}
                <i className="fa fa-envelope-o"></i>
              </Button>
            )}

            <Modal
              isOpen={generateMail}
              toggle={() => generateMailToggle(cellValues.id)}
              centered
            >
              <Form
                className="needs-validation"
                noValidate=""
                onSubmit={handleSubmit((data) => onSubmit(data))}
              >
                <ModalHeader
                  toggle={() => generateMailToggle(cellValues.id)}
                >
                  {trans("Comments")}
                </ModalHeader>
                <ModalBody>
                  <Input
                    className="form-control"
                    name="comments"
                    type="textarea"
                    innerRef={register({
                      required: false,
                    })}
                  />
                  <span>{errors.comments && trans("field is required")}</span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    onClick={() => generateMailToggle(null)}
                  >
                    {trans("Cancel")}
                  </Button>
                  <Button color="primary">{trans("Generate")}</Button>
                </ModalFooter>
              </Form>
            </Modal>
          </div>
        );
      },
    },
  ];

  const ChangeOrderStatus = (id, value) => {
    console.log("IDDD ---", id, " ---- value ---", value);

    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Do you want to change the current Status !"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Change"),
      reverseButtons: true,
    }).then((result) => {
      console.log("result value", result);
      if (result.value) {
        OrderStatus(id, value);
      }
    });
  };

  const OrderStatus = (order_id, order_status) => {
    axios
      .get(URL + "/supplier/order/status", {
        params: {
          order_id: order_id,
          order_status: order_status,
          admin_id: atob(localStorage.getItem("user_id")),
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((res) => {
        console.log("ORDER STATUS RESS", res);
        if (res.data.success) {
          SweetAlert.fire({
            icon: "success",
            title: trans("Order") + " " + trans("Status"),
            text: trans("Order Status Is Changed Successfully") + " !!",
            confirmButtonText: trans("OK"),
          });
          console.log(
            "ORDER_IDD ---- ",
            order_id,
            "RDER STATUS --- ",
            order_status
          );

          // getOrders();
          dispatch(SuppliersOrdersListAction());
        }
      })
      .catch((error) => {
        console.log("ERROR ORDER STATUS ---", error);
      });
  };

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Purchase Module") + " " + trans("Orders")}
        parent={trans("Purchase Module")}
        title={trans("Orders")}
        subtitle={trans("List")}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>{/* <h5>{trans("Supplier Orders")}</h5> */}</CardHeader>
          <CardBody>
            <DataTable
              height={100}
              columns={columns}
              data={orderList.suppliersOrdersList}
              isLoading={orderList.suppliersOrdersList?.length == 0 ? true : false}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default translate(SupplideAllOrders);