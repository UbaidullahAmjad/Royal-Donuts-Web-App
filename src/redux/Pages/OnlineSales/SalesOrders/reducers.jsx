/* eslint-disable no-unused-vars */
import {
    SALES_ORDERS_LIST,
    SALES_ORDER_CHANGE_STATUS,
    SALES_ORDER_CHANGE_STATUS_CHECK,
    SALES_ORDER_CREATE,
    SALES_ORDER_EDIT,
} from "../../../actionTypes";

const initialState = {
    salesOrdersList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SalesOrdersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SALES_ORDERS_LIST: {
            // console.log("--SALES_ORDERS_LIST REDUCER", payload);
            let allSalesOrders = [];
            if (payload.response != null) {
                allSalesOrders = payload.response.order;
                allSalesOrders.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allSalesOrders.length;
            }
            return {
                ...state,
                salesOrdersList: allSalesOrders,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case SALES_ORDER_CHANGE_STATUS: {
            // console.log("--SALES_ORDER_CHANGE_STATUS REDUCER", payload);
            // console.log("--SALES_ORDER_CHANGE_STATUS salesOrdersList", state.salesOrdersList);
            let payload_id = payload.id;
            let payload_value = payload.value;
            let sales_order_list = state.salesOrdersList;
            let new_objects_arr = [];
            if (payload_id) {
                if (state.salesOrdersList.length > 0 && payload.isError == false) {
                    // state.tempArrLength = state.tempArrLength - 1;

                    const get_order_status = sales_order_list.findIndex((item) => item.id == payload_id);
                    // console.log("--SALES_ORDER_CHANGE_STATUS get_order_status", get_order_status);
                    sales_order_list[get_order_status].order_status = payload_value.toString();
                    new_objects_arr = [...sales_order_list];
                }
            }
            // console.log("--SALES_ORDER_CHANGE_STATUS new_objects_arr", new_objects_arr);
            return {
                ...state,
                salesOrdersList: state.salesOrdersList.length > 0 && payload.isError ? new_objects_arr : state.salesOrdersList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case SALES_ORDER_CHANGE_STATUS_CHECK: {
            // console.log("--SALES_ORDER_CHANGE_STATUS_CHECK REDUCER", payload);
            // console.log("--SALES_ORDER_CHANGE_STATUS_CHECK categories", state.salesOrdersList);
            let newTempArrLength = state.salesOrdersList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                salesOrdersList: state.salesOrdersList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        default: {
            return state;
        }
    }
}

export default SalesOrdersReducer;