/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { HomeSpecialProducts_GET_DATA } from '../../types';
import { URL } from '../../../env';

export const SpecialProductsAction = () => {
    return async (dispatch) => {
        var specialProductsList = [];
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/index`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--HomeSpecialProducts_GET_DATA Action:", response)
            specialProductsList = response.data
            isError = false;
            dispatch({
                type: HomeSpecialProducts_GET_DATA,
                payload: {
                    specialProductsList,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--HomeSpecialProducts_GET_DATA Action-error:", error)
            isError = true;
            errorMessage = error.response
            dispatch({
                type: HomeSpecialProducts_GET_DATA,
                payload: {
                    specialProductsList,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};



