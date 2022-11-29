/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { GET_PRODUCT_LIST } from '../types';
import { URL } from '../../env';

const productsAction = () => {
    return async (dispatch) => {
        var productsList = [];
        var loading = false;
        var isError = false;
        var errorMessage = null

        console.log("PRODUCT ACTIONS -----------");

        axios.get(`${URL}/products`, {
            // headers: {
            //     Authorization: "Bearer " + localStorage.getItem("token123"),
            // },
        }).then((response) => {
            console.log("--productsAction:", response)
            productsList = response.data
            isError = false;
            dispatch({
                type: GET_PRODUCT_LIST,
                payload: {
                    productsList,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            console.log("--productsAction-error:", error)
            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_PRODUCT_LIST,
                payload: {
                    productsList,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export default productsAction



