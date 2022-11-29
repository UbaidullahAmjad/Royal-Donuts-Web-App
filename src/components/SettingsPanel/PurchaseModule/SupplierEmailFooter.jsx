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
} from "reactstrap";
import { footerSignature } from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
import { URL } from "../../../env";
import { useDispatch, useSelector } from "react-redux";
import {
  SupplierEmailFooterGetDataAction,
  SupplierEmailFooterSaveDataAction
} from "../../../redux/SettingsPanel/PurchaseModule/SupplierEmailFooter/actions";

const SupplierEmailFooter = (props) => {
  const trans = props.t;
  const dispatch = useDispatch();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [content, setContent] = useState(null);
  const [SettingData, setSettingData] = useState(null);
  const [Method, setMethod] = useState(null);

  const supplierFooterData = useSelector((state) => state.getSupplierEmailFooter);
  console.log("supplierFooter", supplierFooterData);

  useEffect(() => {
    if (supplierFooterData.supplierFooter == null) {
      dispatch(SupplierEmailFooterGetDataAction())
    }
    if (supplierFooterData && supplierFooterData.supplierFooterLength != supplierFooterData.tempArrLength) {
      dispatch(SupplierEmailFooterGetDataAction())
      console.log("supplierFooter-called", supplierFooterData?.supplierFooter)
    }
  }, []);

  useEffect(() => {
    if (supplierFooterData.supplierFooter != null) {
      console.log("findStore-description-useEffect", supplierFooterData.supplierFooter)
      setContent(supplierFooterData.supplierFooter && supplierFooterData.supplierFooter?.description ? supplierFooterData.supplierFooter.description : "");
    }
  }, [supplierFooterData.supplierFooter])

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await axios.get(`${URL}/footer`, {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token123"),
  //       },
  //     });
  //     console.log("resp-supplierfooter", response);
  //     if (response.data.setting != null || response.data.setting != undefined) {
  //       setSettingData(response.data.setting);
  //       setMethod("update");
  //     } else {
  //       setMethod("create");
  //     }

  //     setContent(response.data.setting.description);
  //   };
  //   getData();
  // }, []);

  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
    if (newContent == "" || newContent == "" || newContent == null) {
      setValue("description", "");
    } else {
      setValue("description", newContent);
    }
  };

  const onSubmit = (data) => {
    console.log("this is submitted data", data);

    const formData = new FormData();
    formData.append("description", data.description);
    // if (Method == "update") {
    //   formData.append("id", SettingData.id);
    //   formData.append("update", "update");
    // } else {
    //   formData.append("create", "create");
    // }
    if (supplierFooterData.method == "update") {
      formData.append("id", supplierFooterData.supplierFooter?.id);
      formData.append("update", "update");
    } else {
      formData.append("create", "create");
    }

    dispatch(SupplierEmailFooterSaveDataAction(formData))

    // axios({
    //   method: "post",
    //   url: `${URL}/footerupdate`,
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token123"),
    //   },
    //   data: formData,
    // }).then((response) => {
    //   if (response.data.success === true) {
    //     toast.success(trans("successfull"), {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   } else {
    //     toast.error(trans("failed"), {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   }
    // });
  };

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Supplier")} title={trans("Email Footer")} /> */}

      {/* <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card> */}
      <CardHeader className="p-0 pb-4 mb-4">
        <h5>{trans(footerSignature)}</h5>
      </CardHeader>
      {/* <CardBody> */}
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
              key={supplierFooterData.supplierFooter?.description != null ? supplierFooterData.supplierFooter.description : ""}
              defaultValue={supplierFooterData.supplierFooter?.description != null ? supplierFooterData.supplierFooter.description : ""}
              render={() => (
                <CKEditors
                  activeclassName="p10"
                  content={content}
                  events={{
                    change: onChange,
                  }}
                />
              )}
            />

            <span>{errors.description && trans("field is required")}</span>
            <div className="valid-feedback">{"Looks good!"}</div>
          </Col>
        </div>
        <Button color="success">{trans("Save")}</Button>
      </Form>
      {/* </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </Fragment>
  );
};

export default translate(SupplierEmailFooter);
