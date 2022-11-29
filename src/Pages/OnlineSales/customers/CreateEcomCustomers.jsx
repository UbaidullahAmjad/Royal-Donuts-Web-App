/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import { Controller, useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Label,
  Input,
} from "reactstrap";
import { CustomStyles, Category, Image } from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../env";
import { useNavigate, useParams } from "react-router-dom";
import { translate } from "react-switch-lang";
import { useDispatch, } from "react-redux";
import {
  SalesCustomerCreateAction,
} from "../../../redux/Pages/OnlineSales/SalesCustomers/actions"

const CreateEcomCustomers = (props) => {
  const trans = props.t;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("CreateEcomCustomers - this is submitted data", data);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobilenumber", data.mobilenumber);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("zip_code", data.zip_code);
    formData.append("country", data.country);

    dispatch(SalesCustomerCreateAction(formData));
  };

  const goBack = () => {
    navigate(`/ecommerce/customers/list`);
  };

  return (
    <Fragment>
      {/* trans("Create Ecommerce Customer") */}
      <Breadcrumb
        breadcrumbtitle={trans("Create Customer")}
        parent={trans("Online Sales")}
        title={trans("Customers")}
        subtitle={trans("Create")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-end">
                <Button onClick={goBack}>{trans("Go Back")}</Button>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Name")} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder={trans("Enter name")}
                        innerRef={register({
                          required: true,
                          maxLength: 60,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                        defaultValue={""}
                      />
                      <span>
                        {errors.name?.type == "required" &&
                          trans("field is required")}
                        {errors.name?.type == "maxLength" &&
                          trans("Maximum Length: ") + "60"}
                        {errors.name?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Email")} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder={trans("Enter email")}
                        innerRef={register({ required: true, maxLength: 60 })}
                        defaultValue={""}
                      />
                      <span>
                        {errors.email?.type === "required"
                          ? trans("field is required")
                          : errors.email && errors.email.message}
                        {errors.email?.type === "maxLength" &&
                          trans("Maximum Length: ") + "60"}
                        {/* {errors.email?.type === "pattern" && trans("Email Format is: abcd@email.com")} */}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Mobile Number")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="mobilenumber"
                        type="text"
                        placeholder={trans("Enter phone number")}
                        innerRef={register({
                          required: true,
                          maxLength: 18,
                          pattern: /^[0-9 ()+-]+$/,
                        })}
                        defaultValue={""}
                      />
                      <span>
                        {errors.mobilenumber?.type === "required" &&
                          trans("field is required")}
                        {errors.mobilenumber?.type === "maxLength" &&
                          trans("Maximum Length: ") + "18"}
                        {errors.mobilenumber?.type === "pattern" &&
                          trans(
                            "Please write numerical values or + or - or ( or )"
                          )}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Address")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="address"
                        type="text"
                        placeholder={trans("Enter address")}
                        innerRef={register({ required: true, maxLength: 80 })}
                        defaultValue={""}
                      />
                      <span>
                        {errors.address?.type === "required" &&
                          trans("field is required")}
                        {errors.address?.type === "maxLength" &&
                          trans("Maximum Length: ") + "80"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("City")} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="city"
                        type="text"
                        placeholder={trans("Enter city")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                        defaultValue={""}
                      />
                      <span>
                        {errors.city?.type === "required" &&
                          trans("field is required")}
                        {errors.city?.type === "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.city?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Zip")} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="zip_code"
                        type="text"
                        placeholder={trans("Enter zip")}
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                          pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                        })}
                        defaultValue={""}
                      />
                      <span>
                        {errors.zip_code?.type == "required" &&
                          trans("field is required")}
                        {errors.zip_code?.type == "maxLength" &&
                          trans("Maximum Length: ") + "12"}
                        {errors.zip_code?.type == "pattern" &&
                          trans(
                            "zip code must be 5 digits and can be up to 9 digits and must be positive value"
                          )}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Country")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="country"
                        type="text"
                        placeholder={trans("Enter country")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                        defaultValue={""}
                      />
                      <span>
                        {errors.country?.type === "required" &&
                          trans("field is required")}
                        {errors.country?.type === "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.country?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
                  <Button color="success">{trans("Save")}</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(CreateEcomCustomers);