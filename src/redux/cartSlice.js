import { createSlice } from "@reduxjs/toolkit";

const getCurrentUserKey = () => {
  const user = localStorage.getItem("babafly-current-user");

  if (!user) return null;

  try {
    const parsedUser = JSON.parse(user);

    if (!parsedUser?.email) return null;

    return parsedUser.email.toLowerCase();
  } catch {
    return null;
  }
};

const getCartKey = () => {
  const userKey = getCurrentUserKey();

  if (!userKey) return null;

  return `babafly-cart-${userKey}`;
};

const loadSavedCart = () => {
  const cartKey = getCartKey();

  if (!cartKey) return [];

  const savedCart = localStorage.getItem(cartKey);

  try {
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  const cartKey = getCartKey();

  if (!cartKey) return;

  localStorage.setItem(
    cartKey,
    JSON.stringify(items)
  );
};

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: loadSavedCart(),
  },

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      saveCart(state.items);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (product) => product.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      saveCart(state.items);
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (product) => product.id === action.payload
      );

      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (product) => product.id !== action.payload
          );
        }
      }

      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );

      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];

      const cartKey = getCartKey();

      if (cartKey) {
        localStorage.removeItem(cartKey);
      }
    },

    resetCart: (state) => {
      state.items = [];
    },

    loadCart: (state) => {
      state.items = loadSavedCart();
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  resetCart,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;