/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import CKEditors from "react-ckeditor-component";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Input,
} from "reactstrap";
import { Text } from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
import { URL } from "../../../env";
import { useDispatch, useSelector } from "react-redux";
import {
  StoreDescriptionGetDataAction,
  StoreDescriptionSaveDataAction
} from "../../../redux/Pages/Cms/HomeSettings/FindStore/actions";
import { display } from "@mui/system";

const FindStore = (props) => {
  const trans = props.t;

  const dispatch = useDispatch();
  const [findStore, setFindStore] = useState(null);
  // const [description, setDescription] = useState(null);
  const [id, setId] = useState(null);

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [content, setContent] = useState();
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    if (newContent != "" || newContent != null) {
      setContent(newContent);
      setValue("description", newContent);
    } else {
      setValue("description", "");
    }
  };

  const description = useSelector((state) => state.getStoresDescription);
  console.log("findStore-description", description);

  useEffect(() => {
    if (description.storeDescription == null) {
      dispatch(StoreDescriptionGetDataAction())
    }
    if (description && description.storeDescriptionLength != description.tempArrLength) {
      dispatch(StoreDescriptionGetDataAction())
      console.log("findStore-description-called", description?.storeDescription)
    }
  }, []);

  useEffect(() => {
    if (description.storeDescription != null) {
      console.log("findStore-description-useEffect", description?.storeDescription)
      setFindStore(description?.storeDescription);
      setContent(description?.storeDescription ? description?.storeDescription?.description : "");
      setId(description?.storeDescription?.id);
    }
  }, [description?.storeDescription])


  const onSubmit = (data) => {
    const formData = new FormData();

    if (id != null) {
      formData.append("text", data.description);
      formData.append("id", id);
    } else {
      formData.append("text", data.description);
      formData.append("id", "no_id");
    }
    console.log("this is submitted data", data);
    dispatch(StoreDescriptionSaveDataAction(formData));
  };

  console.log("description", description);

  return (
    <Fragment>
      {/* <Breadcrumb
        parent={trans("Site Settings")}
        title={trans("Store Description")}
      /> */}

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CardHeader>
                <h5>{trans("Store")}</h5>
              </CardHeader> */}
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
                      <Controller
                        control={control}
                        name="description"
                        rules={{ required: false }}
                        key={description != null ? description : ""}
                        defaultValue={description != null ? description : ""}
                        // key={description.storeDescription != null && description.storeDescription?.description != null ? description.storeDescription?.description : ""}
                        // defaultValue={description.storeDescription != null && description.storeDescription?.description != null ? description.storeDescription?.description : ""}
                        render={() => (
                          <CKEditors
                            activeclassName="p10"
                            content={content}
                            defaultValue={
                              description != null ? description : ""
                              // description.storeDescription != null && description.storeDescription?.description != null ? description.storeDescription?.description : ""
                            }
                            events={{
                              change: onChange,
                            }}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.description && trans("field is required")}
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

export default translate(FindStore);
