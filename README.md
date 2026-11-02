# e-plantShopping (Paradise Nursery)

**e-plantShopping** is the Paradise Nursery project: a React and Redux shopping application for houseplants. Visitors land on a
welcome page with a "Get Started" button, browse plants grouped into categories, add them to a
shopping cart, and review the cart with quantities and totals.

## Features

- Landing page with the company name, a background image, and a "Get Started" button
- About Us section describing the company
- Product listing with 18 unique houseplants in 3 categories (Air Purifying, Aromatic Fragrant, Succulents and Cacti)
- "Add to Cart" buttons that add the plant, disable themselves, and update the cart icon count
- Navbar with Home, Plants, and Cart links on both the product listing and cart pages
- Shopping cart page with thumbnail, name, unit price, per-plant total, and overall total
- Increase, decrease, and delete controls for each cart item
- Checkout button (shows "Coming Soon") and Continue Shopping button

## Tech Stack

- React 18
- Redux Toolkit and React-Redux
- Vite

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Project Structure

```
src/
  App.jsx          Landing page and page switching
  App.css          Styles, including the landing page background image
  AboutUs.jsx      Company details
  ProductList.jsx  Navbar, plant categories, Add to Cart
  CartItem.jsx     Shopping cart page
  CartSlice.jsx    Redux slice for the cart
  store.js         Redux store
  main.jsx         App entry point
```
