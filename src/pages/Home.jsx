import { Link } from "react-router-dom";

function Home() {
  const categories = [
    {
      name: "Women",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
      link: "/categories/women",
    },
    {
      name: "Men",
      image:
        "https://plus.unsplash.com/premium_photo-1727942421317-382428c9ac44?auto=format&fit=crop&w=700&q=85",
      link: "/categories/men",
    },
    {
      name: "Sneakers",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
      link: "/categories/footwear",
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=700&q=85",
      link: "/categories/accessories",
    },
  ];

  const products = [
    {
      name: "Oversized Essential Tee",
      brand: "BABAFLY STUDIO",
      price: "₹899",
      oldPrice: "₹1,499",
      discount: "40% OFF",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Classic Everyday Sneakers",
      brand: "BABAFLY",
      price: "₹1,799",
      oldPrice: "₹2,999",
      discount: "40% OFF",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Relaxed Linen Shirt",
      brand: "BABAFLY STUDIO",
      price: "₹1,299",
      oldPrice: "₹2,199",
      discount: "41% OFF",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Everyday Crossbody Bag",
      brand: "BABAFLY",
      price: "₹1,099",
      oldPrice: "₹1,899",
      discount: "42% OFF",
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=700&q=85",
    },
  ];

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden bg-[#f1eee9]">

          <img
            src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=2000&q=90"
            alt="New season fashion"
            className="h-[520px] w-full object-cover object-center sm:h-[580px] lg:h-[650px]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

          <div className="absolute inset-y-0 left-0 flex max-w-[620px] flex-col justify-center px-7 text-white sm:px-12 lg:px-16">

            <p className="mb-4 text-[11px] font-bold uppercase tracking-[3px]">
              BabaFly / New Season
            </p>

            <h1 className="font-['Manrope'] text-[48px] font-extrabold leading-[0.95] tracking-[-2.5px] sm:text-[64px] lg:text-[78px]">
              Dress
              <br />
              outside
              <br />
              the box.
            </h1>

            <p className="mt-6 max-w-[410px] text-[15px] leading-6 text-white/85">
              Fresh drops, everyday essentials and pieces that deserve
              another look.
            </p>

            <div className="mt-8 flex gap-3">

              <Link
                to="/products"
                className="bg-[#ff3f6c] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[1px] text-white"
              >
                Shop now
              </Link>

              <Link
                to="/categories"
                className="border border-white/70 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[1px] text-white"
              >
                Explore
              </Link>

            </div>

          </div>

          <div className="absolute bottom-6 right-6 hidden text-right text-white sm:block">

            <p className="text-[10px] uppercase tracking-[2px]">
              New arrivals
            </p>

            <p className="mt-1 text-sm font-semibold">
              September / 2026
            </p>

          </div>

        </div>
      </section>

      {/* QUICK CATEGORIES */}
      <section className="mx-auto max-w-[1400px] px-6 py-12 lg:px-8">

        <div className="flex gap-3 overflow-x-auto pb-2">

          {[
            ["New In", "new-in"],
            ["Women", "women"],
            ["Men", "men"],
            ["Kids", "kids"],
            ["Footwear", "footwear"],
            ["Accessories", "accessories"],
            ["Sale", "sale"],
          ].map(([item, id]) => (
            <Link
              key={item}
              to={`/categories/${id}`}
              className="shrink-0 border border-[#dedede] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.8px] text-[#555] transition hover:border-black hover:bg-black hover:!text-white"
            >
              {item}
            </Link>
          ))}

        </div>

      </section>

      {/* CATEGORY GRID */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-8">

        <div className="mb-8 flex items-end justify-between">

          <div>

            <p className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-[#ff3f6c]">
              Shop your way
            </p>

            <h2 className="font-['Manrope'] text-[30px] font-extrabold tracking-[-1px] sm:text-[36px]">
              Find your thing.
            </h2>

          </div>

          <Link
            to="/categories"
            className="hidden border-b border-black pb-1 text-[12px] font-bold uppercase tracking-[1px] sm:block"
          >
            View all
          </Link>

        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative overflow-hidden bg-[#f4f4f4]"
            >

              <img
                src={category.image}
                alt={category.name}
                className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16">

                <h3 className="font-['Manrope'] text-xl font-bold text-white">
                  {category.name}
                </h3>

                <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[1px] text-white/80">
                  Shop now →
                </span>

              </div>

            </Link>
          ))}

        </div>

      </section>

      {/* TRENDING */}
      <section className="bg-[#f7f7f5] py-20">

        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">

          <div className="mb-8 flex items-end justify-between">

            <div>

              <p className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-[#ff3f6c]">
                Most wanted
              </p>

              <h2 className="font-['Manrope'] text-[30px] font-extrabold tracking-[-1px] sm:text-[36px]">
                Trending right now.
              </h2>

            </div>

            <Link
              to="/products"
              className="hidden border-b border-black pb-1 text-[12px] font-bold uppercase tracking-[1px] sm:block"
            >
              Shop all
            </Link>

          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4">

            {products.map((product) => (
              <Link
                key={product.name}
                to="/products"
                className="group"
              >

                <div className="relative overflow-hidden bg-white">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                  <button
                    type="button"
                    onClick={(event) => event.preventDefault()}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-black shadow-sm transition hover:bg-[#ff3f6c] hover:text-white"
                    aria-label="Add to wishlist"
                  >
                    ♡
                  </button>

                  <span className="absolute bottom-3 left-3 bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-[0.5px]">
                    {product.discount}
                  </span>

                </div>

                <div className="pt-4">

                  <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#777]">
                    {product.brand}
                  </p>

                  <h3 className="mt-1 text-[14px] font-semibold">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">

                    <span className="text-[14px] font-bold">
                      {product.price}
                    </span>

                    <span className="text-[12px] text-[#999] line-through">
                      {product.oldPrice}
                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* SALE BANNER */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-8">

        <div className="relative overflow-hidden bg-[#171717] px-7 py-16 text-white sm:px-12 lg:px-20">

          <div className="relative z-10 max-w-[600px]">

            <p className="mb-4 text-[11px] font-bold uppercase tracking-[3px] text-[#ff3f6c]">
              BabaFly Sale
            </p>

            <h2 className="font-['Manrope'] text-[45px] font-extrabold leading-none tracking-[-2px] sm:text-[62px]">
              Good style.
              <br />
              Better prices.
            </h2>

            <p className="mt-5 max-w-[440px] text-[14px] leading-6 text-white/60">
              Up to 70% off selected styles. The kind of sale you don't
              need a reason for.
            </p>

         <Link
  to="/categories/sale"
  className="mt-8 inline-block border border-solid border-[#ff3f6c] bg-[#ff3f6c] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[1px] !text-white transition-all duration-200 hover:!border-black hover:!bg-white hover:!text-black"
>
  Shop the sale
</Link>

          </div>

          <div className="absolute -right-20 -top-40 h-[500px] w-[500px] rounded-full border-[90px] border-white/[0.04]" />

          <div className="absolute -bottom-52 right-20 h-[450px] w-[450px] rounded-full border-[70px] border-[#ff3f6c]/10" />

        </div>

      </section>

      {/* TRUST STRIP */}
      <section className="border-t border-[#eee]">

        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-[#eee] sm:grid-cols-4">

          {[
            ["01", "Free delivery", "On orders above ₹999"],
            ["02", "Easy returns", "7 day return policy"],
            ["03", "Secure payments", "100% protected checkout"],
            ["04", "BabaFly support", "We're here to help"],
          ].map(([number, title, text]) => (
            <div
              key={number}
              className="px-5 py-8 sm:px-7"
            >

              <span className="text-[10px] font-bold text-[#ff3f6c]">
                {number}
              </span>

              <h3 className="mt-3 text-[13px] font-bold">
                {title}
              </h3>

              <p className="mt-1 text-[11px] text-[#888]">
                {text}
              </p>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}

export default Home;