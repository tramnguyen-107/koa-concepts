import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query: `
        mutation($email: String!) {
          customerCreate(input: { email: $email, acceptsMarketing: true }) {
            customer { id email }
            customerUserErrors { message }
          }
        }
      `,
      variables: { email },
    }),
  });

  const data = await res.json();
  const errors = data.data?.customerCreate?.customerUserErrors ?? [];

  if (errors.length > 0 && !errors[0].message.includes('already taken')) {
    return NextResponse.json({ error: errors[0].message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
