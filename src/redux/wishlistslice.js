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

const getWishlistKey = () => {
  const userKey = getCurrentUserKey();

  if (!userKey) return null;

  return `babafly-wishlist-${userKey}`;
};

const loadSavedWishlist = () => {
  const wishlistKey = getWishlistKey();

  if (!wishlistKey) return [];

  const savedWishlist = localStorage.getItem(wishlistKey);

  try {
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
};

const saveWishlist = (items) => {
  const wishlistKey = getWishlistKey();

  if (!wishlistKey) return;

  localStorage.setItem(
    wishlistKey,
    JSON.stringify(items)
  );
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    items: loadSavedWishlist(),
  },

  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.items.some(
        (item) => item.id === product.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.items.push(product);
      }

      saveWishlist(state.items);
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );

      saveWishlist(state.items);
    },

    clearWishlist: (state) => {
      state.items = [];

      const wishlistKey = getWishlistKey();

      if (wishlistKey) {
        localStorage.removeItem(wishlistKey);
      }
    },

    resetWishlist: (state) => {
      state.items = [];
    },

    loadWishlist: (state) => {
      state.items = loadSavedWishlist();
    },
  },
});

export const {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
  resetWishlist,
  loadWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;