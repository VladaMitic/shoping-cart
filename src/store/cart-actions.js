import { uiAction } from './ui-slice';
import {cartAction } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-377bb-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      );
      if (!response.ok) {
        throw new Error('Sending data failed!');
      }
      const data = await response.json();
      //console.log(data)
      const dataArrayIds = Object.keys(data);
      const lastCartId = dataArrayIds[dataArrayIds.length - 1];

      return data[lastCartId];
    };

    try {
      const cartItems = await fetchData();
      dispatch(cartAction.replaceCart(cartItems))
    } catch (err) {
      dispatch(
        uiAction.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sent cart data failed',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiAction.showNotification({
        status: 'sending',
        title: 'Sending cart...',
        message: 'Sending cart data!',
      })
    );

    const sendRquest = async () => {
      const response = await fetch(
        'https://react-http-377bb-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'POST',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending data failed!');
      }
    };

    try {
      await sendRquest();
      dispatch(
        uiAction.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfuly',
        })
      );
    } catch (err) {
      dispatch(
        uiAction.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sent cart data failed',
        })
      );
    }
  };
};
