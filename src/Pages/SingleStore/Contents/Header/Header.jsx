import React, { useRef, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Input,
} from "reactstrap";
import "./Header.css";
import { Button } from "react-bootstrap";
import { useMediaQuery } from "@mui/material";
import { translate } from "react-switch-lang";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast, ToastContainer } from "react-toastify";

const Header = (props) => {
  const trans = props.t;
  const small_screen_matches = useMediaQuery("(max-width:550px)");
  const extra_small_screen_matches = useMediaQuery("(max-width:400px)");

  const [Verticalcenter, setVerticalcenter] = useState(false);

  const Verticalcentermodaltoggle = () => setVerticalcenter(!Verticalcenter);

  let url = window.location.href;

  const copyURL = () => {
    navigator.clipboard.writeText(url);
    toast.success(trans("Text Copied"));
  };

  return (
    <div>
      <ToastContainer />
      {props.stores != undefined && (
        <div>
          <div
            className="shop_name"
            style={{ width: extra_small_screen_matches && "8pc" }}
          >
            <div className="shop_name_1" style={{ fontWeight: "bold" }}>
              {props.stores.name_fr}
            </div>
            <div className="shop_name_2">{props.stores.url_field}</div>
          </div>
          <div
            className="img_buttons"
            style={{ display: extra_small_screen_matches == true && "grid" }}
          >
            <Button
              variant="light"
              className="img_button_layout"
              id="order_btn"
              onClick={Verticalcentermodaltoggle}
            >
              <i className="fa fa-share" style={{ marginRight: 5 }}></i>{" "}
              <span>{trans(`share`)}</span>
            </Button>
            <Modal
              isOpen={Verticalcenter}
              toggle={Verticalcentermodaltoggle}
              centered
            >
              <ModalHeader toggle={Verticalcentermodaltoggle}>
                {trans("Share store")}
              </ModalHeader>
              <ModalBody className="social_media_share">
                <Col md="10">
                  <div className="d-flex justify-content-center align-items-center">
                    <Input readOnly defaultValue={url}></Input>
                    <Button onClick={copyURL}>{trans(`Copy`)}</Button>
                  </div>
                </Col>
                <div className="mt-4 d-flex align-items-center">
                  <FacebookShareButton url={url} className="m-2">
                    <FacebookIcon size={40} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={url} className="m-2">
                    <TwitterIcon size={40} round={true} />
                  </TwitterShareButton>
                  <WhatsappShareButton url={url} className="m-2">
                    <WhatsappIcon size={40} round={true} />
                  </WhatsappShareButton>
                  <EmailShareButton url={url} className="m-2">
                    <EmailIcon size={40} round={true} />
                  </EmailShareButton>
                </div>
                {/* <InstapaperShareButton url={url} className="m-2">  
                  <InstapaperIcon size={32} round={true} />
                </InstapaperShareButton> */}
              </ModalBody>
              {/* <ModalFooter>
                <Button color="secondary" onClick={Verticalcentermodaltoggle}>
                  {trans("Close")}
                </Button>
              </ModalFooter> */}
            </Modal>
            {/* <Button
              variant="outline-light"
              className="img_button_layout"
              id="review_btn"
              outline
            >
              <i className="fa fa-edit"></i> <span>{trans(`Review`)}</span>
            </Button> */}
            {/* <Button variant="outline-light" className="img_button_layout">
              <i className="fa fa-edit"></i> <span>{trans(`Order Now`)}</span>
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default translate(Header);
