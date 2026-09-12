import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

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
            to="/products"
            className={`relative flex h-full items-center text-[13px] font-bold uppercase tracking-[0.6px] transition ${
              location.pathname === "/products"
                ? "text-[#ff3f6c]"
                : "text-[#282828] hover:text-[#ff3f6c]"
            }`}
          >
            Men
          </Link>

          <Link
            to="/products"
            className="flex h-full items-center text-[13px] font-bold uppercase tracking-[0.6px] text-[#282828] transition hover:text-[#ff3f6c]"
          >
            Women
          </Link>

          <Link
            to="/products"
            className="flex h-full items-center text-[13px] font-bold uppercase tracking-[0.6px] text-[#282828] transition hover:text-[#ff3f6c]"
          >
            Kids
          </Link>

          <Link
            to="/categories"
            className="flex h-full items-center text-[13px] font-bold uppercase tracking-[0.6px] text-[#282828] transition hover:text-[#ff3f6c]"
          >
            Categories
          </Link>

          <Link
            to="/products"
            className="flex h-full items-center text-[13px] font-bold uppercase tracking-[0.6px] text-[#ff3f6c]"
          >
            Sale
          </Link>

        </nav>

        {/* SEARCH */}
        <div className="ml-auto hidden h-[42px] max-w-[400px] flex-1 items-center bg-[#f6f6f6] md:flex">

          <div className="flex w-[46px] items-center justify-center text-[#555]">
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
          </div>

          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="h-full w-full bg-transparent pr-4 text-[13px] outline-none placeholder:text-[#999]"
          />

        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-5">

          {/* PROFILE */}
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

          {/* WISHLIST */}
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
              <path d="M20.8 8.7c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" />
            </svg>

            <span className="hidden text-[11px] font-semibold sm:block">
              Wishlist
            </span>
          </button>

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

              <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#ff3f6c] px-1 text-[8px] font-bold text-white">
                0
              </span>
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