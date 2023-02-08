import { combineReducers } from "redux";
import {
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
  EMPTY_CART,
} from "../actions";

const initProduct = {
  numberCart: 0,
  Carts: [],
};

function todoProduct(state = initProduct, action) {
  console.log("prod", action);
  switch (action.type) {
    case GET_NUMBER_CART:
      return {
        ...state,
      };
    case ADD_CART:
      if (state.Carts?.length === 0) {
        let _cart = {
          id: action.payload.id,
          quantity: action.payload.quantity,
          name: action.payload.name,
          image: action.payload.images,
          price: action.payload.price,
        };
        state.Carts.push(_cart);
      } else {
        let check = false;
        console.log(state?.Carts);
        state?.Carts?.map((item, key) => {
          if (item.id == action.payload.id) {
            state.Carts[key].quantity = item.quantity + action.payload.quantity;
            check = true;
          }
        });
        console.log("asdasd");
        if (!check) {
          let _cart = {
            id: action.payload.id,
            quantity: action.payload.quantity,
            name: action.payload.name,
            image: action.payload.images,
            price: action.payload.price,
          };
          state.Carts.push(_cart);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    case INCREASE_QUANTITY:
      state.numberCart++;
      state.Carts[action.payload].quantity++;

      return {
        ...state,
      };
    case DECREASE_QUANTITY:
      let quantity = state.Carts[action.payload].quantity;
      if (quantity > 1) {
        state.numberCart--;
        state.Carts[action.payload].quantity--;
      }

      return {
        ...state,
      };
    case DELETE_CART:
      return {
        ...state,
        Carts: state.Carts.filter((item) => {
          return item.id !== action.payload.id;
        }),
      };
    case EMPTY_CART:
      return {
        ...state,
        numberCart: 0,
        Carts: [],
      };
    default:
      return state;
  }
}
const ShopApp = combineReducers({
  _todoProduct: todoProduct,
});
export default ShopApp;
