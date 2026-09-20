# Debugging Journal

### Bug 1: Runtime Crash on Null Map
- **Symptom:** The entire screen goes blank with an uncaught error: `TypeError: Cannot read properties of null (reading 'map')`.
- **Tool:** Chrome DevTools Sources Tab (Pause on Uncaught Exceptions / Line Breakpoint).
- **What It Showed:** Pausing execution on the exception stopped directly on `products.map(...)`. The Scope pane revealed `products` was initialized to `null` instead of an empty array `[]` before fetch completion.
- **Fix:** Initialized state to empty array `useState<PublicProduct[]>([])` and added optional defensive checking `products?.map(...)`.

---

### Bug 2: Silent Data Failure (Undefined Prop)
- **Symptom:** Product cards render visually, but titles display as "Unnamed Item" and descriptions as "No description available", despite mock data existing. No console errors thrown.
- **Tool:** React DevTools (Components Tab).
- **What It Showed:** Selecting `<ProductItem>` in the component tree showed `props: { productItem: Object, product: undefined }`. The component expected `product`, but the parent was passing the property under the mismatched key `productItem`.
- **Fix:** Corrected the JSX attribute name in `App.tsx` to `<ProductItem product={p} />`.

---

### Bug 3: Failed API Data Fetch
- **Symptom:** UI hangs permanently on the loading spinner, products list remains empty, and generic error logged.
- **Tool:** Browser DevTools Network Tab.
- **What It Showed:** Filtered by `Fetch/XHR`. Found a red HTTP request returning `404 Not Found`. Inspecting the Request URL revealed the endpoint typo: `https://dummyjson.com/produts-broken`.
- **Fix:** Restored endpoint string to `https://dummyjson.com/products?limit=5` and added error state handling to clear `loading`.