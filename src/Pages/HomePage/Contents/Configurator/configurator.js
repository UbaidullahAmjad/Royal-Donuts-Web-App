import React, { useState } from "react";
import "./configurator.css";
import { styled } from "@mui/system";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { translate } from "react-switch-lang";
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from "react-router";
import getWindowDimensions from '../../../../Components/Hooks/useWindowDimensions';
import ConfiguratorDesk from "./ConfiguratorDesk";
import ConfiguratorMobi from "./ConfiguratorMobi";


const Configurator = (props) => {
  const trans = props.t;
  const { screenWidth, screenHeight } = getWindowDimensions();

  return (
    <>
      {
        screenWidth < 768 ? <ConfiguratorMobi /> : <ConfiguratorDesk />
      }
    </>
  );
};

export default translate(Configurator);
