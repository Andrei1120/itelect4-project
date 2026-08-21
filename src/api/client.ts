import type {
  ApiLostFoundItem,
  NewLostFoundItem,
  ApiClaim,
  NewClaim,
} from "../types/index";

export const API_URL = "http://localhost:3001";

// GET /items -> all items
export async function fetchItems(): Promise<ApiLostFoundItem[]> {
  const res = await fetch(`${API_URL}/items`);
  if (!res.ok) {
    throw new Error("Could not load items");
  }
  return res.json();
}

// GET /items/:id -> single item by ID
export async function fetchItemById(id: string): Promise<ApiLostFoundItem> {
  const res = await fetch(`${API_URL}/items/${id}`);
  if (!res.ok) {
    throw new Error(`Could not load item with ID "${id}"`);
  }
  return res.json();
}

// POST /items -> create a new lost/found item
export async function createItem(
  newItem: NewLostFoundItem
): Promise<ApiLostFoundItem> {
  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });
  if (!res.ok) {
    throw new Error("Could not save the item");
  }
  return res.json();
}

// GET /claims -> all claims
export async function fetchClaims(): Promise<ApiClaim[]> {
  const res = await fetch(`${API_URL}/claims`);
  if (!res.ok) {
    throw new Error("Could not load claims");
  }
  return res.json();
}

// POST /claims -> create a claim
export async function createClaim(
  newClaim: NewClaim
): Promise<ApiClaim> {
  const res = await fetch(`${API_URL}/claims`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newClaim),
  });
  if (!res.ok) {
    throw new Error("Could not save the claim");
  }
  return res.json();
}
