import React, { useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { translate } from "react-switch-lang";

const Header = ({ single_store }, props) => {
  const trans = props.t;
  return (
    <div
      style={{
        background: "rgb(245,145,178)",
        background:
          "linear-gradient(90deg, rgba(245,145,178,1) 0%, rgba(240,91,140,1) 50%, rgba(236,56,115,1) 100%)",
        overflow: "visible",
      }}
    >
      <Grid container>
        <Grid item xs={12} md={12}>
          <Navbar />
        </Grid>
      </Grid>
      {/* {single_store === true ? (
        <div className="single_custom-shape-divider-bottom-1642677977">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="custom-shape-divider-bottom-1642677977">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      )} */}
    </div>
  );
};

export default translate(Header);
