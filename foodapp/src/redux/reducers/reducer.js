const initialState = {
  carts: [], // Initial state of the cart
};

export const cartreducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART": {
      // Check if item already exists in the cart
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        // If exists, increment quantity
        const updatedCarts = [...state.carts];
        updatedCarts[itemIndex].qnty += 1;
        return {
          ...state,
          carts: updatedCarts,
        };
      } else {
        // If new item, add it with quantity = 1
        const newItem = { ...action.payload, qnty: 1 };
        return {
          ...state,
          carts: [...state.carts, newItem],
        };
      }
    }

    case "UPDATE_QTY": {
      // Update quantity for an item
      return {
        ...state,
        carts: state.carts.map((item) =>
          item.id === action.payload.id
            ? { ...item, qnty: action.payload.qnty }
            : item
        ),
      };
    }

    case "RMV_CART": {
      // Remove an item from the cart
      return {
        ...state,
        carts: state.carts.filter((item) => item.id !== action.payload),
      };
    }

    case "RMV_ONE": {
      // Reduce quantity of an item by 1
      return {
        ...state,
        carts: state.carts
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, qnty: item.qnty - 1 }
              : item
          )
          .filter((item) => item.qnty > 0), // Remove item if quantity reaches 0
      };
    }

    default:
      return state;
  }
};
