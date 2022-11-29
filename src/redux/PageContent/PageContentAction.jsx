/* eslint-disable no-unused-vars */
import axios from 'axios';
import { PageContent_GET_DATA, PageContent_SEO_GET_DATA } from '../types';
import { URL } from '../../env';

export const PageContentGetDataAction = (page_url) => {
    return async (dispatch) => {
        var pageContentData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/getpage/${page_url}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--PageContent_GET_DATA Action:", response)
            // setPageContentSkeleton(false);
            pageContentData = response.data
            isError = false;
            dispatch({
                type: PageContent_GET_DATA,
                payload: {
                    pageContentData,
                    page_url,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--PageContent_GET_DATA Action-error:", error)
            isError = true;
            errorMessage = error.response
            dispatch({
                type: PageContent_GET_DATA,
                payload: {
                    pageContentData,
                    page_url: null,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};



