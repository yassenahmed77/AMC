# Project Blueprint & Senior Guidelines (AMC Medical Store)

El-malaf da fih kol el-m3ayeer, el-styles, w rules elly et-tafa2na 3leha f el-shoghl. Ay agent hay-kamel bokra lazim y-follow el-blueprint da 7arfyan!

---

## 1. Visual & Aesthetic Standards (Design Rules)

*   **White Background for Images (`bg-white` ONLY)**:
    *   *Constraint*: Ajeza images 3ndna bg-white (not transparent).
    *   *Rule*: **Mamnoo'** t-7ot ay solid background color (zy `bg-slate-50`) aw hover overlay color f containers el-suwar (sawa2 f el-Card, el-Details, aw thumbnails). Lazim el-containers tkon pure `#ffffff` `bg-white` 3ashan elsora t-blend smoothly.
*   **Wildcard Responsiveness**:
    *   *Rule*: Ay links aw text zay "View All Products" lazim ya5do class `whitespace-nowrap` w `shrink-0` 3ashan may-tkser-sh line-in f screens el-mobile.
*   **Centered Thumbnails**:
    *   *Rule*: List el-suwar el-real-life (Thumbnails) f safhet el-details lazim tkon `justify-center` 3ashan low el-3addad sghyyr yban mutwaset under the main image.
*   **Remove Redundant Navigation**:
    *   *Rule*: Shela zorar / link "Back to Products" mn safhet el-details le2n el-Header orady mawgood w bi-handle el-navigation.
*   **Product Card Fields**:
    *   *Rule*: **Mamnoo'** zhoor fields `category` aw `condition` f el-cards, el-listings, aw el-details.

---

## 2. Speed & Free Tier Optimizations (Supabase + Vercel)

*   **Selective Querying (Payload Reduction)**:
    *   *Listing Pages* (`Products.jsx` w `FeaturedProducts.jsx`): query direct columns bas: `.select('id, name, price, main_image, quantity')`.
    *   *Details Page*: query explicit columns bas le single row: `.select('id, name, description, price, quantity, main_image, images')`.
    *   *Reason*: Saves Supabase Network Egress Bandwidth completely.
*   **No Caching Libraries Yet**:
    *   *Rule*: El-app by-use standard React state (`useEffect` w `useState`). **TanStack Query / Global Context caching hay-tsht3al f a5er el-mashro3** bna2an 3ala talab el-user.
*   **Zero Console Logs (Production Ready)**:
    *   *Rule*: **Mamnoo'** ne-leak logs (`console.log`, `console.error`). Ay errors or exceptions lazim t-zhar direct f toast: `toast.error(error.message)`.

---

## 3. Cart & Checkout Stock Logic

*   **Add to Cart validation**:
    *   *Rule*: Cart logic check dynamic limits. Low user 7awel ydoos add l-3addad aktaar mn el-available in stock, el-app by-block w y3red toast alert.
*   **Tasmim Khas (Max Stock Added)**:
    *   *Product Card & Details Page*: Low el-quantity elly f el-cart woslet le-7ad stock el-DB, el-Card by-akhod border orange dynamic, w warning badge `Max Added`. El-Add to cart button byb2et disabled completely b border orange w text `Max Qty Added`.
*   **Cart Price Summary**:
    *   *Rule*: Safhet el-Cart **mamnoo'** t-calc shipping fees. Bt-show **Subtotal** bas (products sum) m3a note wadiha: `* Shipping rates will be calculated on the next step based on your delivery location.`.
*   **Stock Decrement at Checkout**:
    *   *Rule*: Decrement el-stock by7sal **wa2t el-checkout** bas, mesh f Add to cart.
    *   *Atomic Transactions*: Decrements strictly happen via SQL RPC Stored Procedure (`decrement_product_stock`) inside Supabase to handle race conditions safely (Details in [checkout_stock_scenarios.md](file:///d:/React-Projects/amc/checkout_stock_scenarios.md)).
