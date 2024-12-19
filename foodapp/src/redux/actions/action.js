// Add an item to the cart
export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};

// Update the quantity of an item
export const UPDATE_QTY = (id, qnty) => {
  return {
    type: "UPDATE_QTY",
    payload: { id, qnty },
  };
};

// Remove an item from the cart
export const DLT = (id) => {
  return {
    type: "RMV_CART",
    payload: id,
  };
};

// Remove one quantity of an item
export const REMOVE = (id) => {
  return {
    type: "RMV_ONE",
    payload: { id },
  };
};
