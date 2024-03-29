import {
  ADD_CART_ITEM,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
  REMOVE_CART_ITEM,
  DELETE_TOTAL_CART,
} from "../types";

const initialState = {
  cartGrandTotal: 0,
  cartItems: [],
  cartItem: null,
};

const myCartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CART_ITEM:
      console.log("myCartReducer --------- PAYLOAD-ADD_CART_ITEM", payload);

      if (state.cartItems.length == 0) {
        state.cartGrandTotal = 0;
      }
      // console.log("GRTANDTOTAL ----------", state.cartGrandTotal);
      // throw new Error("GRAND TOTAL");
      const newPayloadObject = {
        id: payload.id,
        quantity: payload.quantity,
        price: payload.product_detail
          ? payload.product_detail.price_euro
          : payload.singlePrice,
        product_detail: payload.product_detail,
        itemQtyTotal: payload.product_detail
          ? parseFloat(
              (payload.product_detail.price_euro * payload.quantity).toFixed(2)
            )
          : payload.total,
        donutType: payload.donutType,
        glaze: payload.glaze,
        topping: payload.topping,
        sauce: payload.sauce,
        filling: payload.filling,
        image: payload.image,
      };

      const totalCartPriceAdd = payload.product_detail
        ? (
            state.cartGrandTotal +
            payload.product_detail.price_euro * payload.quantity
          ).toFixed(2)
        : parseFloat(state.cartGrandTotal + payload.total).toFixed(2);

      console.log("total price add", state.cartGrandTotal);

      console.log(
        " parseFloat(totalCartPriceAdd)",
        parseFloat(totalCartPriceAdd)
      );
      // throw new Error("ADDING CONFG PRODUCT");
      return {
        ...state,
        cartItem: newPayloadObject,
        cartItems: [...state.cartItems, newPayloadObject],
        cartGrandTotal: parseFloat(totalCartPriceAdd),
      };
    case INCREMENT_ITEM_QUANTITY:
      const cartAddItemQuantity = state.cartItems.find(
        (product) => product.id === payload.id
      );
      cartAddItemQuantity["quantity"] = payload.quantity;
      cartAddItemQuantity["itemQtyTotal"] = parseFloat(
        (payload.quantity * cartAddItemQuantity.price).toFixed(2)
      );
      const addItemQuantity = state.cartItems.filter((prod) =>
        // prod.id === payload.id ? prod.quantity = payload.quantity : prod.quantity
        prod.id === payload.id
          ? ((prod.quantity = payload.quantity),
            (prod.itemQtyTotal = parseFloat(
              (payload.quantity * prod.price).toFixed(2)
            )))
          : (prod.quantity, prod.itemQtyTotal)
      );
      console.log("INCREMENT_ITEM_QUANTITY ----- ", payload);
      console.log("cart grand total", state.cartGrandTotal);
      console.log(
        "total price payload",
        payload.incremented_quantity * payload.price
      );
      const totalCartPriceInc = (
        state.cartGrandTotal +
        payload.incremented_quantity * payload.price
      ).toFixed(2);
      console.log("total price in", totalCartPriceInc);
      // throw new Error("CART ICREMENT ERROR");
      return {
        ...state,
        cartItem: cartAddItemQuantity,
        cartItems: addItemQuantity,
        cartGrandTotal: parseFloat(totalCartPriceInc),
      };
    case DECREMENT_ITEM_QUANTITY:
      console.log("myCartReducer --------- Decrement payload", payload);
      console.log("cart grand total", state.cartGrandTotal);
      const removeItemQuantity = state.cartItems.filter((prod) =>
        prod.id === payload.id
          ? ((prod.quantity = payload.quantity),
            (prod.itemQtyTotal = parseFloat(
              (payload.quantity * prod.price).toFixed(2)
            )))
          : (prod.quantity, prod.itemQtyTotal)
      );

      const totalCartPriceDec = (state.cartGrandTotal - payload.price).toFixed(
        2
      );
      console.log("DECREMENT_ITEM ----- ", totalCartPriceDec);
      return {
        ...state,
        cartItems: removeItemQuantity,
        cartGrandTotal: parseFloat(totalCartPriceDec),
      };
    case REMOVE_CART_ITEM:
      console.log("myCartReducer --------- PAYLOAD-REMOVE_CART_ITEM", payload);

      var get_cart_item = state.cartItems.find((prod) => prod.id == payload);
      const matced_product = state.cartItems.filter(
        (prod) => prod.id == payload
      );
      const filter_product = state.cartItems.filter(
        (prod) => prod.id != payload
      );
      console.log("FILTER PRODUCT ----- ", filter_product);
      console.log("MATCHED PRODUCT ----- ", matced_product);
      const totalCartPrice = (
        state.cartGrandTotal - matced_product[0].itemQtyTotal
      ).toFixed(2);
      if (get_cart_item != null) {
        get_cart_item = null;
      }
      return {
        ...state,
        cartItem: get_cart_item,
        cartItems: filter_product,
        cartGrandTotal: parseFloat(totalCartPrice),
      };
    case DELETE_TOTAL_CART:
      return initialState;
    default: {
      // console.log("myCartReducer --------- default-state");
      return state;
    }
  }
};
export default myCartReducer;
