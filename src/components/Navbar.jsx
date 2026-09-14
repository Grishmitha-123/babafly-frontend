import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { resetCart } from "../redux/cartSlice";
import { resetWishlist } from "../redux/wishlistslice";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated
  );

  const user = useSelector(
    (state) => state.auth?.user
  );

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
  dispatch(resetCart());
  dispatch(resetWishlist());
  dispatch(logout());

  navigate("/");
};

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center gap-8 px-6">

        {/* LOGO */}
        <Link
          to="/"
          className="shrink-0 font-['Manrope'] text-[25px] font-extrabold tracking-[-1.5px]"
        >
          Baba<span className="text-[#ff3f6c]">Fly</span>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden h-full items-center gap-7 lg:flex">

          <Link
            to="/categories/men"
            className={`relative flex h-full items-center text-[13px] font-bold uppercase tracking-[0.6px] transition ${
              location.pathname === "/categories/men"
                ? "text-[#ff3f6c]"
                : "text-[#282828] hover:text-[#ff3f6c]"
            }`}
          >
            Men
          </Link>

          <Link
            to="/categories/women"
            className={`flex h-full items-center text-[13px] font-bold uppercase tracking-[0.6px] transition ${
              location.pathname === "/categories/women"
                ? "text-[#ff3f6c]"
                : "text-[#282828] hover:text-[#ff3f6c]"
            }`}
          >
            Women
          </Link>

          <Link
            to="/categories/kids"
            className={`flex h-full items-center text-[13px] font-bold uppercase tracking-[0.6px] transition ${
              location.pathname === "/categories/kids"
                ? "text-[#ff3f6c]"
                : "text-[#282828] hover:text-[#ff3f6c]"
            }`}
          >
            Kids
          </Link>

          <Link
            to="/categories"
            className={`flex h-full items-center text-[13px] font-bold uppercase tracking-[0.6px] transition ${
              location.pathname.startsWith("/categories")
                ? "text-[#ff3f6c]"
                : "text-[#282828] hover:text-[#ff3f6c]"
            }`}
          >
            Categories
          </Link>

          <Link
            to="/categories/sale"
            className={`flex h-full items-center text-[13px] font-bold uppercase tracking-[0.6px] transition ${
              location.pathname === "/categories/sale"
                ? "text-[#ff3f6c]"
                : "text-[#ff3f6c]"
            }`}
          >
            Sale
          </Link>

        </nav>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="ml-auto hidden h-[42px] max-w-[400px] flex-1 items-center bg-[#f6f6f6] md:flex"
        >

          <button
            type="submit"
            aria-label="Search"
            className="flex h-full w-[46px] items-center justify-center text-[#555]"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20L16.2 16.2" />
            </svg>
          </button>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for products, brands and more"
            className="h-full w-full bg-transparent pr-4 text-[13px] outline-none placeholder:text-[#999]"
          />

        </form>

        {/* ACTIONS */}
        <div className="flex items-center gap-5">

          {/* PROFILE */}
          {isAuthenticated ? (
            <div className="group relative">

              <button
                type="button"
                className="flex min-w-[42px] flex-col items-center gap-1 text-[#222] transition hover:text-[#ff3f6c]"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" />
                </svg>

                <span className="hidden text-[11px] font-semibold sm:block">
                  Profile
                </span>
              </button>

              {/* PROFILE MENU */}
              <div className="invisible absolute right-0 top-full mt-2 w-[190px] translate-y-2 border border-gray-100 bg-white p-4 opacity-0 shadow-lg transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                <p className="truncate text-[13px] font-bold text-[#222]">
                  Hi, {user?.name || "User"}
                </p>

                <p className="mt-1 truncate text-[11px] text-[#999]">
                  {user?.email || ""}
                </p>

                <div className="my-3 border-t border-gray-100" />

                <Link
                  to="/orders"
                  className="block py-2 text-[11px] font-semibold uppercase tracking-[0.8px] text-[#444] hover:text-[#ff3f6c]"
                >
                  My Orders
                </Link>

                <Link
                  to="/wishlist"
                  className="block py-2 text-[11px] font-semibold uppercase tracking-[0.8px] text-[#444] hover:text-[#ff3f6c]"
                >
                  Wishlist
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full py-2 text-left text-[11px] font-semibold uppercase tracking-[0.8px] text-[#ff3f6c]"
                >
                  Logout
                </button>

              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex min-w-[42px] flex-col items-center gap-1 text-[#222] transition hover:text-[#ff3f6c]"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" />
              </svg>

              <span className="hidden text-[11px] font-semibold sm:block">
                Profile
              </span>
            </Link>
          )}

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="flex min-w-[42px] flex-col items-center gap-1 text-[#222] transition hover:text-[#ff3f6c]"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M20.8 8.7c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" />
            </svg>

            <span className="hidden text-[11px] font-semibold sm:block">
              Wishlist
            </span>
          </Link>

          {/* BAG */}
          <Link
            to="/cart"
            className="flex min-w-[42px] flex-col items-center gap-1 text-[#222] transition hover:text-[#ff3f6c]"
          >
            <div className="relative">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M5 8h14l-1 13H6L5 8Z" />
                <path d="M9 9V6a3 3 0 0 1 6 0v3" />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#ff3f6c] px-1 text-[8px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </div>

            <span className="hidden text-[11px] font-semibold sm:block">
              Bag
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}

export default Navbar;