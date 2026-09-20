# BabaFly Frontend

BabaFly is a responsive fashion e-commerce frontend built with React and Vite. It provides product browsing, category navigation, product details, authentication, wishlist, cart, checkout, and order-management flows.

## Features

- Responsive fashion e-commerce UI
- Home page with promotional hero section
- Product listing and product details
- Category browsing and category-specific product pages
- Product search
- Category filtering
- Sorting by price, rating, and discount
- Wishlist management
- Shopping cart with quantity controls
- Checkout flow
- Login and registration screens
- Orders and order details
- Toast notifications
- Client-side routing
- Global state management with Redux Toolkit
- REST API integration with DummyJSON using Axios
- Token handling through an Axios request interceptor
- Cart and wishlist persistence using browser localStorage
- Reusable components such as Navbar and ProductCard
- Responsive styling with Tailwind CSS
- Motion/interaction support using Framer Motion

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI development |
| Vite | Development server and build tool |
| React Router | Client-side routing |
| Redux Toolkit | Global state management |
| React Redux | Connecting Redux with React |
| Axios | REST API communication |
| DummyJSON | Product/authentication API source |
| Tailwind CSS | Responsive styling |
| Framer Motion | UI animations and transitions |
| React Hook Form | Form handling |
| Yup | Form validation |
| React Hot Toast | User notifications |

## Project Structure

```text
babafly-frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── hero.png
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Categories.jsx
│   │   ├── CategoryProducts.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Orders.jsx
│   │   └── OrderDetails.jsx
│   ├── redux/
│   │   ├── store.js
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   └── wishlistslice.js
│   ├── utils/
│   │   └── axios.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
├── .env.example
├── package.json
└── vite.config.js
```

## API Integration

BabaFly uses Axios for communication with the DummyJSON REST API.

The API configuration is centralized in:

```text
src/utils/axios.js
```

The Axios instance uses:

```text
https://dummyjson.com
```

as the default base URL, with `VITE_API_URL` supported through environment configuration.

Example:

```javascript
const response = await api.get("/products?limit=0");
```

The Axios instance also contains a request interceptor. If an authentication token is stored in `localStorage`, it is attached to outgoing requests as a Bearer token.

## Product Flow

The product page retrieves products from the API and then applies client-side operations such as:

1. Search by product title, brand, category, or description
2. Category filtering
3. New-in filtering
4. Sale filtering
5. Sorting by price
6. Sorting by rating
7. Sorting by discount

The product data is displayed through the reusable `ProductCard` component.

## Routing

React Router is used for client-side navigation.

Main routes include:

```text
/                       Home
/login                  Login
/register               Register
/products               All products
/products/:id           Product details
/categories             Categories
/categories/:id         Category products
/wishlist               Wishlist
/cart                   Shopping cart
/checkout               Checkout
/orders                 Orders
/orders/:id             Order details
```

## State Management

Redux Toolkit is used for application-wide state.

### Authentication

`authSlice.js` manages:

- Login state
- Logout state
- Authentication token
- Current user information

### Cart

`cartSlice.js` manages:

- Add to cart
- Increase quantity
- Decrease quantity
- Remove product
- Clear cart
- Loading saved cart data

Cart data is persisted in `localStorage` using a user-specific key.

### Wishlist

`wishlistslice.js` manages:

- Add/remove wishlist items
- Remove individual products
- Clear wishlist
- Loading saved wishlist data

Wishlist data is also persisted in `localStorage` using a user-specific key.

## Reusable Components

### Navbar

`src/components/Navbar.jsx`

Provides the main navigation and access to important sections such as products, categories, wishlist, cart, authentication, and orders.

### ProductCard

`src/components/ProductCard.jsx`

Provides a reusable product presentation component so product information and actions can be displayed consistently across the application.

## Layout

`src/layouts/MainLayout.jsx` provides the common application layout around the routed pages.

This keeps shared application structure separate from individual page components.

## Environment Configuration

The project supports the following environment variable:

```env
VITE_API_URL=https://dummyjson.com
```

Create a local `.env` file when environment-specific configuration is required.

**Do not commit secrets or private credentials to GitHub.**

## Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd babafly-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file if required:

```env
VITE_API_URL=https://dummyjson.com
```

### 4. Start the development server

```bash
npm run dev
```

Vite will display the local development URL in the terminal, normally similar to:

```text
http://localhost:5173
```

## Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Code Quality

The project includes ESLint configuration and can be checked using:

```bash
npm run lint
```

## Application Flow

```text
Home
  ↓
Products / Categories
  ↓
Search / Filter / Sort
  ↓
Product Details
  ↓
Add to Cart / Wishlist
  ↓
Cart
  ↓
Checkout
  ↓
Orders
  ↓
Order Details
```

Authentication is available through the Login and Register flows.

## API and Data Flow

```text
React Components
       ↓
Axios API Layer
       ↓
DummyJSON REST API
       ↓
Product / User Data
       ↓
React UI
```

For application state:

```text
User Interaction
       ↓
Redux Action
       ↓
Redux Slice
       ↓
Global Application State
       ↓
React Components
```

## Key Implementation Highlights

- Component-based React architecture
- Centralized API configuration with Axios
- Redux Toolkit slices for authentication, cart, and wishlist
- Dynamic React Router routes for products, categories, and orders
- Client-side product filtering and sorting
- User-specific localStorage keys for cart and wishlist persistence
- Responsive Tailwind CSS layout
- Form handling and validation
- Reusable UI components
- Modular page and layout structure

## Repository Walkthrough

For a technical review, the main files to inspect are:

1. `package.json` — project dependencies and scripts
2. `src/App.jsx` — application routing
3. `src/utils/axios.js` — API configuration and request interceptor
4. `src/pages/Products.jsx` — product retrieval, search, filtering, and sorting
5. `src/redux/store.js` — Redux store configuration
6. `src/redux/cartSlice.js` — cart state and persistence
7. `src/redux/authSlice.js` — authentication state
8. `src/redux/wishlistslice.js` — wishlist state and persistence
9. `src/components/ProductCard.jsx` — reusable product UI
10. `src/layouts/MainLayout.jsx` — shared application layout

## Conclusion

BabaFly demonstrates a modular React e-commerce frontend with reusable components, client-side routing, REST API integration, global state management, responsive styling, authentication flow, and persistent cart/wishlist functionality.
