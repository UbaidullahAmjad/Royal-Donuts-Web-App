/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from "react";
import axios from "axios";
import Breadcrumb from "../../../../layout/breadcrumb";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
} from "reactstrap";
import SweetAlert from "sweetalert2";
import { useState } from "react";
import DataGrid from "../../../dataTable/dataTable";

import { URL } from "../../../../env";
import { translate } from "react-switch-lang";

const SupplierAssociateRules = (props) => {
  const trans = props.t;
  const [assoRules, setAssoRules] = useState(null);
  const [AssociatedLength, setAssociatedLength] = useState(0);
  const [alert, setalert] = useState(false);

  const Displayalert = (name, id) => {
    setalert(true);
    if (name === "alertDanger") {
      SweetAlert.fire({
        title: trans("Are you sure?"),
        text: trans("Once deleted, you will not be able to recover it!"),
        icon: "error",
        showCancelButton: true,
        cancelButtonText: trans("Cancel"),
        confirmButtonText: trans("Delete"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          console.log("result value", id);
          DeleteItem(id);
          SweetAlert.fire({
            icon: "success",
            title: trans("Deleted"),
            text: trans("Your item has been deleted."),
            confirmButtonText: trans("OK"),
          });
        }
      });
    }
  };
  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 80 },
    {
      field: "customer",
      title: trans("Customer"),
      flex: 1.5,
      minWidth: 240,
      render: (values) => {
        return (
          <p>{values?.customer !== null && values.customer?.name}</p>
        );
      },
      valueGetter: (cellValues) =>
        cellValues?.customer !== null && cellValues?.customer?.name,
    },
    {
      field: "supplier",
      title: trans("Supplier"),
      flex: 1.5,
      minWidth: 240,
      render: (values) => {
        return (
          <p>{values.supplier !== null && values.supplier?.name}</p>
        );
      },
      valueGetter: (cellValues) =>
        cellValues.supplier !== null && cellValues.supplier?.name,
    },
    {
      field: "rule",
      title: trans("Rule"),
      flex: 1.2,
      minWidth: 160,
      render: (values) => {
        return <p>{values.rule !== null && values.rule?.name}</p>;
      },
      valueGetter: (cellValues) =>
        cellValues.rule !== null && cellValues.rule?.name,
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 2,
      minWidth: 190,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link
                to={"/associate/rules/edit/" + cellValues.id + "/" + "RD"}
              >
                <Button color="warning" className="mr-2">
                  <i className="fa fa-edit"></i>
                </Button>
              </Link>
            )}
            {(role == "SuperAdmin" || permissions.match("delete") != null) && (
              <Button
                color="danger"
                className="sweet-7"
                name="alertDanger"
                onClick={(e) => Displayalert(e.target.name, cellValues.id)}
              >
                {" "}
                <i
                  className="fa fa-trash-o"
                  // title="alertDanger"
                  onClick={(e) =>
                    Displayalert("alertDanger", cellValues.id)
                  }
                ></i>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getAssoRules = async () => {
      const response = await axios.get(`${URL}/associate_rule`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("associate", response);
      const associate = response.data.associate;
      associate.map((item, index) => (item["index"] = index + 1));
      setAssoRules(associate);
      setAssociatedLength(associate.length == 0 ? 0 : associate.length);
    };
    getAssoRules();
  }, []);

  const DeleteItem = (id) => {
    const res = axios
      .delete(`${URL}/associate_rule/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_associate = assoRules.filter((item) => item.id != id);
        const index_update_associate = deleted_associate;
        index_update_associate.map(
          (item, index) => (item["index"] = index + 1)
        );
        setAssoRules(index_update_associate);
      });
  };
  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));
  return (
    <>
      <Fragment>
        {/* <Breadcrumb
          parent={trans("Supplier")}
          title={trans("Rule Associations")}
          subtitle={trans("List")}
        />
        <Container fluid={true}>
          <Card> */}
        <CardHeader className="p-0 pb-4 mb-4 d-flex">
          <Col md="6">
            {/* <h5>
              {trans("Supplier")} {trans("Associate Rules")}
            </h5> */}
          </Col>
          {(role == "SuperAdmin" || permissions.match("create") != null) && (
            <Col md="6" className="text-right">
              <Link to="/associate/rules/create">
                <Button>
                  <i className="fa fa-plus mr-2"></i>
                  {trans("Create Associate Rules")}{" "}
                </Button>
              </Link>
            </Col>
          )}
        </CardHeader>
        {/* <CardBody> */}
        <DataGrid
          columns={columns}
          data={assoRules}
          isLoading={assoRules == null ? true : false}
        />
        {/* </CardBody> */}
        {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default translate(SupplierAssociateRules);
