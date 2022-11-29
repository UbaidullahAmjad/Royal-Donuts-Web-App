import { ADD_CART_ITEM, INCREMENT_ITEM_QUANTITY, DECREMENT_ITEM_QUANTITY, REMOVE_CART_ITEM, DELETE_TOTAL_CART } from '../types'

export const addItemToCart = (formData) => {
    console.log("addItemToCart --------- formData", formData)
    return (dispatch) => {
        console.log("addItemToCart --------- formData- dispatch", formData)
        dispatch({
            type: ADD_CART_ITEM,
            payload: formData
        })
    }
}

export const incrementItemQuantity = (formData) => {
    console.log("incrementItemQuantity --------- formData", formData)
    return (dispatch) => {
        console.log("incrementItemQuantity --------- formData- dispatch", formData)
        dispatch({
            type: INCREMENT_ITEM_QUANTITY,
            payload: formData
        })
    }
}

export const decrementItemQuantity = (formData) => {
    console.log("decrementItemQuantity --------- formData", formData)
    return (dispatch) => {
        console.log("decrementItemQuantity --------- formData- dispatch", formData)
        dispatch({
            type: DECREMENT_ITEM_QUANTITY,
            payload: formData
        })
    }
}

export const removeItemFromCart = (id) => {
    console.log("removeItemFromCart --------- formData", id)
    return (dispatch) => {
        console.log("removeItemFromCart --------- formData- dispatch", id)
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id
        })
    }
}

export const deleteFullCart = () => {
    return (dispatch) => {
        dispatch({
            type: DELETE_TOTAL_CART,
        })
    }
}



