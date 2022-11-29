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
import { useState } from "react";
import SweetAlert from "sweetalert2";
import DataGrid from "../../../dataTable/dataTable";
import { URL } from "../../../../env";
import { translate } from "react-switch-lang";

const SupplierRules = (props) => {
  const trans = props.t;
  const [rules, setRules] = useState([]);
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
    { field: "index", title: "#", flex: 0.6, minWidth: 100 },
    { field: "name", title: trans("Name"), flex: 1.4, minWidth: 220 },
    { field: "acceptance_time", title: trans("Accept Time"), flex: 1, minWidth: 120 },
    {
      field: "treatment_time",
      title: trans("Treatment Days"),
      flex: 1,
      minWidth: 140,
    },
    { field: "delivery_days", title: trans("Delivery Days"), flex: 2, minWidth: 260 },
    {
      field: "action",
      title: trans("ACTION"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 2,
      minWidth: 200,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link
                to={"/supplier/rules/edit/" + cellValues.id + "/" + "RD"}
              >
                <Button color="warning" className="mr-2">
                  <i className="fa fa-edit" outline></i>
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
    const getRules = async () => {
      const response = await axios.get(`${URL}/rule`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("rules", response);
      const rule = response.data.rule;
      rule.map((item, index) => (item["index"] = index + 1));
      setRules(rule);
    };
    getRules();
  }, []);

  const DeleteItem = async (id) => {
    const res = await axios
      .delete(`${URL}/rule/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_rule = rules.filter((item) => item.id != id);
        const index_update = deleted_rule;
        index_update.map((item, index) => (item["index"] = index + 1));
        setRules(index_update);
      });
  };
  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  console.log("RULES ------------------------------------------------", rules);
  return (
    <>
      <Fragment>
        {/* <Breadcrumb parent={trans("Supplier")} title={trans("Rules")} />
        <Container fluid={true}>
          <Card> */}
        <CardHeader className="p-0 pb-4 mb-4 d-flex">
          <Col md="6">
            {/* <h5>
              {trans("Supplier")} {trans("Rules")}
            </h5> */}
          </Col>
          {(role == "SuperAdmin" || permissions.match("create") != null) && (
            <Col md="6" className="text-right">
              <Link to="/supplier/rules/create">
                <Button>
                  <i className="fa fa-plus mr-2"></i>
                  {trans("Create Rules")}{" "}
                </Button>
              </Link>
            </Col>
          )}
        </CardHeader>
        {/* <CardBody> */}
        <DataGrid
          columns={columns}
          data={rules}
          isLoading={rules == null ? true : false}
        />
        {/* </CardBody> */}
        {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default translate(SupplierRules);
