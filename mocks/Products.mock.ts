import { Page } from "@playwright/test";

export interface MockProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  is_location_offer: boolean;
  is_rental: boolean;
  co2_rating: string;
  in_stock: boolean;
  is_eco_friendly: boolean;
  product_image: {
    id: string;
    by_name: string;
    by_url: string;
    source_name: string;
    source_url: string;
    file_name: string;
    title: string;
  };
  category: { id: string; name: string; slug: string };
  brand: { id: string; name: string };
}

export interface ProductsApiResponse {
  current_page: number;
  data: MockProduct[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}
export function buildMockProduct(index: number): MockProduct {
  return {
    id: `mock-product-${index}`,
    name: `Mock Product ${index}`,
    description: `Description for mock product ${index}`,
    price: 10 + index,
    is_location_offer: false,
    is_rental: false,
    co2_rating: "D",
    in_stock: true,
    is_eco_friendly: false,
    product_image: {
      id: `mock-image-${index}`,
      by_name: "Mock Author",
      by_url: "https://unsplash.com/@mock",
      source_name: "Unsplash",
      source_url: "https://unsplash.com/photos/mock",
      file_name: `mock${index}.avif`,
      title: `Mock Product ${index}`,
    },
    category: {
      id: "mock-category",
      name: "Mock Category",
      slug: "mock-category",
    },
    brand: { id: "mock-brand", name: "Mock Brand" },
  };
}

export function buildMockProductsResponse(count: number): ProductsApiResponse {
  const data = Array.from({ length: count }, (_, i) => buildMockProduct(i + 1));

  return {
    current_page: 1,
    data,
    from: 1,
    last_page: 1,
    per_page: count,
    to: count,
    total: count,
  };
}

export async function mockProductsList(
  page: Page,
  count: number,
): Promise<MockProduct[]> {
  const response = buildMockProductsResponse(count);

  await page.route("**/products*", async (route) => {
    await route.fulfill({ json: response });
  });

  return response.data;
}
