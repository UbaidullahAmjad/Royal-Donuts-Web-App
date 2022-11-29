import axios from "axios";
import { URL } from "../../../env";
import * as actionTypes from "../../types";

export const getSpecificStore = (storeId) => async (dispatch) => {
  console.log('store id actions', storeId)
  if (storeId != null) {
    const response = await axios.get(`${URL}/royal/Description_store/${storeId}`)
    dispatch({
      type: actionTypes.GET_SPECIFIC_STORE,
      data: response.data
    })
  }
}