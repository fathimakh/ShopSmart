# ShopSmart - AI Shopping Assistant

An e-commerce product discovery app built with React. Along with the usual browsing,
filtering and cart features, it understands a shopping request written as a normal
sentence, suggests products based on what you looked at, and estimates where a price
is heading.

## 🔗 Live Demo

Add the deployed link here after the first deploy, for example
`https://shopsmart.vercel.app`.

## 📖 Description

ShopSmart is a front-end shopping assistant for anyone who finds it tiring to translate
"a decent pair of wireless headphones under fifty dollars" into six separate filter
clicks. It loads a live catalogue of 194 products, lets you narrow it down by category,
price, brand and rating, compare a shortlist side by side, and keep a cart and wishlist
that survive a page refresh.

## ✨ Features

- **Product catalogue** - responsive grid of products with images, prices, discounts and ratings, loaded from a public API with skeleton loading states
- **Advanced filtering** - filter by category, brand, price band or custom price range, and minimum customer rating
- **Search and sort** - debounced keyword search plus seven sort options including price, rating, popularity and newest
- **Product details** - image gallery, full specifications, customer reviews, stock and shipping information
- **Comparison tool** - line up to four products side by side with the lowest price and best rated options flagged
- **Shopping cart** - quantity controls, discount savings, free delivery threshold, saved to local storage
- **Wishlist** - save products for later and move the whole list to the cart in one click
- **Responsive design** - tested at 375px, 768px and 1920px
- **AI: natural language search** - describe what you want in a sentence and the app works out the filters
- **AI: recommendation engine** - "Recommended for you" and "Similar products" built from what you view, save and buy
- **AI: price drop prediction** - a fitted price trend that estimates the price two weeks out

## 🎯 Project Goals

The aim was to build a complete React application from scratch rather than assemble one
from tutorials: component structure, hooks, context, routing, responsive CSS and
accessibility all done by hand. The second goal was to make the AI features genuinely
functional instead of decorative, which meant writing the query parser, the TF-IDF
similarity model and the regression forecast rather than calling a paid API and hoping
for the best.

## 🛠 Technologies Used

- **Frontend:** React 18 with hooks (useState, useEffect, useMemo, useCallback, useContext)
- **Build tool:** Vite
- **Styling:** CSS3 with custom properties, one stylesheet per component, an 8px spacing scale and a three colour palette
- **Routing:** React Router DOM v6
- **Icons:** React Icons (Feather set)
- **APIs:** [DummyJSON Products API](https://dummyjson.com/docs/products) - no key required
- **AI:** written from scratch in plain JavaScript - rule based query parsing, TF-IDF vectors with cosine similarity, and least squares linear regression
- **Deployment:** Vercel or Netlify

## 🤖 AI Integration

Three AI features run entirely in the browser, so there is no API key to leak and no
request cost. Each one is described below with the idea behind it.

### 1. Natural language search

`src/utils/nlpSearch.js` turns a sentence into the same filter object the sidebar
produces. It handles:

| What you type | What it extracts |
| --- | --- |
| `wireless headphones under $50 rated above 4` | category Mobile Accessories, max price 50, min rating 4, keywords "wireless headphones" |
| `cheapest samsung smartphone` | category Smartphones, brand Samsung, sort by price ascending |
| `womens shoes on sale between 20 and 80` | category Womens Shoes, discounted only, price 20 to 80 |
| `top rated laptops around 1200` | category Laptops, price 960 to 1440, min rating 4.5, sort by rating |

Price phrases (`under`, `over`, `between`, `around`, `1k`), rating phrases, discount
phrases, sort intent, gender hints and around 90 everyday product words are recognised.
Whatever is left over becomes the keywords, and products are ranked against them with
TF-IDF cosine relevance (`src/utils/textIndex.js`) so a rare word like "titanium"
counts for far more than a common one. The parsed result is shown back to the user as
chips, so it is always clear why a product list changed.

### 2. Recommendation engine

`src/utils/recommend.js` builds a weighted TF-IDF vector for every product from its
title, brand, category, tags and description. "Similar products" on the detail page is
the cosine similarity between two products, topped up for a matching category, brand
and a similar price. "Recommended for you" merges the vectors of everything you viewed,
wishlisted or added to the cart into a single taste profile, weights recent activity
higher, and returns the closest products you have not seen yet.

### 3. Price drop prediction

`src/utils/pricePredict.js` reconstructs a twelve week price history for each product
from its current and pre-discount price, using a seeded generator so the chart is stable
between renders. A least squares regression is fitted to that history, extended two
weeks forward, and the R squared value of the fit becomes the confidence figure. The
product page shows the trend line, the dashed forecast, and a plain English verdict:
likely to drop, likely to rise or holding steady.

**Challenges faced.** The query parser was the hard part. Matching on single words alone
produced nonsense, for example "accessories" pulling in mobile accessories when the
shopper typed "gym accessories", so the word lists were narrowed and word boundary
matching was used everywhere. The recommendation scoring also needed limiting: price
similarity alone was ranking a chair next to a smartphone, so price is only allowed to
refine products that already share a category, brand or vocabulary.

## 🚀 Setup Instructions

### Prerequisites

- Node.js v16 or higher
- npm

### Installation Steps

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/shopsmart.git
   ```

2. Navigate to the project directory

   ```bash
   cd shopsmart
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser

No `.env` file is needed. The catalogue API is public and the AI features run locally.

To create a production build, run `npm run build` and preview it with `npm run preview`.

## 📁 Project Structure

```
src/
├── components/          one folder per component, JSX and CSS together
│   ├── AiSearchPanel/
│   ├── CompareBar/
│   ├── EmptyState/
│   ├── FilterPanel/
│   ├── Footer/
│   ├── Header/
│   ├── PricePrediction/
│   ├── ProductCard/
│   ├── ProductGrid/
│   ├── QuantityStepper/
│   ├── RecommendationRow/
│   ├── SearchBar/
│   └── StarRating/
├── context/
│   ├── CatalogContext.jsx    catalogue fetching and derived filter options
│   └── ShopContext.jsx       cart, wishlist, comparison and view history
├── hooks/
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   └── usePageTitle.js
├── pages/
│   ├── Cart.jsx
│   ├── Compare.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   ├── ProductDetails.jsx
│   └── Wishlist.jsx
├── services/
│   ├── api.js                fetching and normalising products
│   └── fallbackProducts.js   offline snapshot of the catalogue
├── utils/
│   ├── filters.js            filtering, searching and sorting
│   ├── format.js             price, date and text formatting
│   ├── nlpSearch.js          natural language query parsing
│   ├── pricePredict.js       price history and regression forecast
│   ├── recommend.js          similarity and recommendations
│   └── textIndex.js          TF-IDF index shared by search and recommendations
├── App.jsx
├── index.css                 design tokens and shared styles
└── main.jsx
```

## 📱 Responsive Design

Tested and working on:

- Mobile devices from 375px, with a hamburger menu, a collapsible filter drawer and a two column product grid
- Tablets from 768px
- Desktops from 1024px, with a sticky filter sidebar

## 📸 Screenshots

| Shop page with filters and AI search |
| --- |
| ![Shop page](docs/screenshots/home.png) |

| Product details with price outlook | Mobile layout |
| --- | --- |
| ![Product details](docs/screenshots/product-details.png) | ![Mobile layout](docs/screenshots/mobile.png) |

## 🎨 Design Choices

- **Three colours, two fonts.** Indigo for actions, amber for deals and ratings, and a
  neutral grey scale. Outfit for headings, Inter for body text. Everything is defined as
  CSS custom properties in `index.css` so the theme can be changed in one place.
- **8px spacing scale.** All padding, gaps and margins come from `--space-1` to
  `--space-7`, which keeps rhythm consistent without eyeballing values.
- **Plain CSS per component.** Each component owns its stylesheet next to its JSX, so
  styles stay easy to trace and nothing leaks between components.
- **Two contexts instead of a state library.** `CatalogContext` owns server data,
  `ShopContext` owns the shopper's own data. Redux would have been more machinery than
  this app needs.
- **Offline fallback.** If the catalogue request fails, a saved snapshot of the products
  is used and a notice is shown, so the deployed site never renders an empty page.
- **Explainable AI.** The parsed query is displayed as chips and the forecast shows its
  confidence, because a suggestion the user cannot understand is a suggestion they will
  not trust.

## 🐛 Known Issues

- The price history behind the forecast is reconstructed from the discount data the API
  provides, since no real historical prices are available. The regression is real; the
  input series is derived.
- Checkout is a UI only button, as the project is front-end only.
- Very broad natural language queries such as "something nice for my sister" have no
  filters to extract and fall back to keyword relevance alone.

## 🔮 Future Enhancements

- A MERN back end with real user accounts, so the cart and wishlist follow the user across devices
- Real price history stored per product, which would replace the reconstructed series with actual data
- Collaborative filtering once there is more than one user's behaviour to learn from
- Voice search using the Web Speech API
- Paginated or virtualised product loading for catalogues much larger than 194 items

## 👤 Author

**Fathima K H**

- Email: fathimakh07@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com) for the free product catalogue and images
- [React Icons](https://react-icons.github.io/react-icons/) for the Feather icon set
- [Google Fonts](https://fonts.google.com) for Outfit and Inter
- The React documentation, which was the reference for the hooks patterns used here
