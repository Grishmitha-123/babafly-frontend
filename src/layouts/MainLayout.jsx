import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <Navbar />

      <main>{children}</main>

      <footer className="mt-20 border-t border-[#eeeeee] bg-[#fafafa]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          
          <div>
            <Link
              to="/"
              className="font-['Manrope'] text-[25px] font-extrabold tracking-[-1.5px]"
            >
              Baba<span className="text-[#ff3f6c]">Fly</span>
            </Link>

            <p className="mt-4 max-w-[270px] text-[13px] leading-6 text-[#777]">
              Fashion that moves with you. Discover everyday styles,
              statement pieces and everything in between.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[1px]">
              Shop
            </h4>

            <div className="flex flex-col gap-3 text-[13px] text-[#666]">
              <Link to="/products" className="hover:text-[#ff3f6c]">
                Men
              </Link>
              <Link to="/products" className="hover:text-[#ff3f6c]">
                Women
              </Link>
              <Link to="/products" className="hover:text-[#ff3f6c]">
                Kids
              </Link>
              <Link to="/categories" className="hover:text-[#ff3f6c]">
                Categories
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[1px]">
              Help
            </h4>

            <div className="flex flex-col gap-3 text-[13px] text-[#666]">
              <Link to="/orders" className="hover:text-[#ff3f6c]">
                Track Order
              </Link>
              <Link to="/cart" className="hover:text-[#ff3f6c]">
                Shopping Bag
              </Link>
              <Link to="/login" className="hover:text-[#ff3f6c]">
                My Account
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[1px]">
              BabaFly
            </h4>

            <p className="text-[13px] leading-6 text-[#777]">
              Fresh drops. Better prices.
              <br />
              No boring wardrobes.
            </p>

            <div className="mt-6 flex gap-2">
              <span className="border border-[#ddd] px-3 py-2 text-[10px] font-bold uppercase tracking-wide">
                Secure payments
              </span>
              <span className="border border-[#ddd] px-3 py-2 text-[10px] font-bold uppercase tracking-wide">
                Easy returns
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#eeeeee]">
          <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-2 px-6 py-5 text-[11px] text-[#999] sm:flex-row">
            <span>© 2026 BabaFly. All rights reserved.</span>
            <span>Made for your everyday.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;

