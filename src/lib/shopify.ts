const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: { minVariantPrice: { amount: string } };
  images: { edges: { node: { url: string; altText: string } }[] };
  variants: { edges: { node: { id: string; title: string } }[] };
  tags: string[];
  productType: string;
}

const PRODUCT_FRAGMENT = `
  id
  handle
  title
  description
  productType
  tags
  priceRange { minVariantPrice { amount } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 10) { edges { node { id title } } }
`;

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch(`
    query { products(first: 50) { edges { node { ${PRODUCT_FRAGMENT} } } } }
  `);
  return data.products.edges.map((e: { node: ShopifyProduct }) => e.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch(`
    query($handle: String!) { productByHandle(handle: $handle) { ${PRODUCT_FRAGMENT} } }
  `, { handle });
  return data.productByHandle;
}

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const data = await shopifyFetch(`
      mutation($email: String!) {
        customerCreate(input: { email: $email, acceptsMarketing: true }) {
          customer { id email }
          customerUserErrors { message }
        }
      }
    `, { email });
    const errors = data.customerCreate.customerUserErrors;
    if (errors.length > 0) {
      if (errors[0].message.includes('already taken')) return { success: true };
      return { success: false, error: errors[0].message };
    }
    return { success: true };
  } catch {
    return { success: false, error: 'Network error' };
  }
}

export async function createCheckout(variantId: string, quantity = 1) {
  const data = await shopifyFetch(`
    mutation($variantId: ID!, $quantity: Int!) {
      cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: $quantity }] }) {
        cart { checkoutUrl }
      }
    }
  `, { variantId, quantity });
  return data.cartCreate.cart.checkoutUrl as string;
}
