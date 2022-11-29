/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
import CKEditors from "react-ckeditor-component";
import { useDispatch, useSelector } from "react-redux";
import {
  GeneralSettingGetDataAction,
  GeneralSettingSaveDataAction,
} from "../../../redux/SettingsPanel/GlobalSettings/GeneralSettings/actions";

const GeneralSettings = (props) => {
  const trans = props.t;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();

  const [footerContent, setFooterContent] = useState("");
  const changeFooter = (evt) => {
    const newContent = evt.editor.getData();
    if (newContent != "" || newContent != null) {
      setFooterContent(newContent);
      setValue("footer", newContent);
    } else {
      setValue("footer", "");
    }
  };

  const GeneralSettings = useSelector((state) => state.getGeneralSettings);
  // console.log("GeneralSettings", GeneralSettings);

  useEffect(() => {
    if (GeneralSettings?.generalSettings == null) {
      dispatch(GeneralSettingGetDataAction())
    }
    if (GeneralSettings.generalSettingsLength != GeneralSettings.tempArrLength) {
      dispatch(GeneralSettingGetDataAction())
      // console.log("dddddddddata-GeneralSettings-useeffect-NO_1", GeneralSettings.generalSettings);
    }
  }, [GeneralSettings.tempArrLength]);

  useEffect(() => {
    setFooterContent(GeneralSettings.generalSettings?.footer);
    // if (footerContent == "") {
    //   setFooterContent(GeneralSettings.generalSettings?.footer);
    // }
    // if (GeneralSettings.isError == true) {
    //   setFooterContent(GeneralSettings.generalSettings?.footer);
    // }
  }, [GeneralSettings.tempArrLength]);

  console.log("footerContent", footerContent)


  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    if (status == "error_file_size") allFiles.forEach((f) => f.remove());
    {
      setError(
        "image",
        {
          type: "string",
          message: trans("Maximum file size is 2 MB"),
        },
        {
          shouldFocus: true,
        }
      );
    }
    if (status == "done") {
      setValue("image", file);
      setError("image", {
        shouldFocus: false,
      });
    }
  };

  const onSubmit = (data) => {
    console.log("data", data);
    let formData = new FormData();
    formData.append("background_color", data.background_color);
    formData.append("button_color", data.button_color);
    formData.append("image", data.image);
    formData.append("footer", data.footer);
    formData.append("fb_link", data.fb_link);
    formData.append("insta_link", data.insta_link);
    formData.append("t_link", data.t_link);
    formData.append("linkedin_link", data.linkedin_link);

    dispatch(GeneralSettingSaveDataAction(formData));
  };

  return (
    <>
      {/* <Breadcrumb
          parent={trans("Home Settings")}
          title={trans("Home Settings")}
        /> */}

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            {/* <CardHeader className="p-0 pb-4 mb-4">
              <h5>{trans("General Settings")}</h5>
            </CardHeader> */}
            <Form
              className="needs-validation"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-row">
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Background Color")}
                  </Label>
                  <Input
                    className="form-control"
                    name="background_color"
                    type="color"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.background_color : ""}
                    defaultValue={
                      GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.background_color : ""
                    }
                    innerRef={register({})}
                  />
                  <span>
                    {errors.background_color?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Button Color")}
                  </Label>
                  <Input
                    className="form-control"
                    name="button_color"
                    type="color"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.button_color : ""}
                    defaultValue={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.button_color : ""}
                    innerRef={register({})}
                  />
                  <span>
                    {errors.button_color?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Facebook Link")}
                  </Label>
                  <Input
                    className="form-control"
                    name="fb_link"
                    type="text"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.fb_link : ""}
                    defaultValue={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.fb_link : ""}
                    innerRef={register({})}
                  />
                  <span>
                    {errors.fb_link?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Instagram Link")}
                  </Label>
                  <Input
                    className="form-control"
                    name="insta_link"
                    type="text"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.insta_link : ""}
                    defaultValue={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.insta_link : ""}
                    innerRef={register({})}
                  />
                  <span>
                    {errors.insta_link?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Twitter Link")}
                  </Label>
                  <Input
                    className="form-control"
                    name="t_link"
                    type="text"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.t_link : ""}
                    defaultValue={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.t_link : ""}
                    innerRef={register({})}
                  />
                  <span>
                    {errors.t_link?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("LinkedIn Link")}
                  </Label>
                  <Input
                    className="form-control"
                    name="linkedin_link"
                    type="text"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.linkedin_link : ""}
                    defaultValue={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.linkedin_link : ""}
                    innerRef={register({})}
                  />
                  <span>
                    {errors.linkedin_link?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="12 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Footer Text")}
                  </Label>
                  <Controller
                    control={control}
                    name="footer"
                    rules={{ required: false }}
                    // defaultValue={" "}
                    render={() => (
                      <CKEditors
                        activeclassName="p10"
                        content={footerContent}
                        events={{
                          change: changeFooter,
                        }}
                      />
                    )}
                  />
                  <span>{errors.footer && trans("field is required")}</span>
                </Col>
              </div>
              <Button type="submit" color="success">
                {trans("Save")}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default translate(GeneralSettings);
