//* API Base URL
const BASE_URL = "https://dummyjson.com";

//  fetchAllProducts
/**
 * Fetches all products from DummyJSON.
 * The API supports `limit` and `skip` for pagination.
 *
 * @param {number} limit  - how many products to fetch  (default: 100)
 * @param {number} skip   - how many products to skip   (default: 0)
 * @returns {Promise<{ products: Array, total: number, limit: number, skip: number }>}
 */
export async function fetchAllProducts(limit = 100, skip = 0) {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json();
}

//  fetchProductById
/**
 * Fetches a single product by its numeric ID.
 *
 * @param {string|number} id  - product ID from URL params
 * @returns {Promise<Object>}  - full product object
 */
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Product not found (${res.status})`);
  return res.json();
}

//  fetchProductsByCategory
/**
 * Fetches products filtered by category slug.
 *
 * @param {string} category - e.g. "smartphones", "laptops"
 * @returns {Promise<{ products: Array }>}
 */
export async function fetchProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch category (${res.status})`);
  return res.json();
}

//  fetchCategories ─
/**
 * Fetches all available product categories.
 * Returns an array of category objects: [{ slug, name, url }]
 *
 * @returns {Promise<Array>}
 */
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`);
  return res.json();
}

//  searchProducts
/**
 * Searches products by a query string using DummyJSON's search endpoint.
 *
 * @param {string} query  - search term typed by the user
 * @returns {Promise<{ products: Array }>}
 */
export async function searchProducts(query) {
  const res = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error(`Search failed (${res.status})`);
  return res.json();
}
