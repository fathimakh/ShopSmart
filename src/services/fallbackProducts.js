// Offline snapshot of the catalogue, taken from the DummyJSON API.
// The store falls back to this list when the network request fails so the
// page still renders something useful instead of an error screen.
const fallbackProducts = [
  {
    id: 3,
    title: 'Powder Canister',
    description: 'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
    category: 'beauty',
    price: 14.99,
    discountPercentage: 9.84,
    rating: 4.64,
    stock: 89,
    tags: [
      'beauty',
      'face powder'
    ],
    brand: 'Velvet Touch',
    sku: 'BEA-VEL-POW-003',
    weight: 8,
    dimensions: {
      width: 29.27,
      height: 27.93,
      depth: 20.59
    },
    warrantyInformation: '3 months warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 22,
    reviews: [
      {
        rating: 4,
        comment: 'Would buy again!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Alexander Jones',
        reviewerEmail: 'alexander.jones@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Elijah Cruz',
        reviewerEmail: 'elijah.cruz@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Very dissatisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Avery Perez',
        reviewerEmail: 'avery.perez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp'
  },
  {
    id: 4,
    title: 'Red Lipstick',
    description: 'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.',
    category: 'beauty',
    price: 12.99,
    discountPercentage: 12.16,
    rating: 4.36,
    stock: 91,
    tags: [
      'beauty',
      'lipstick'
    ],
    brand: 'Chic Cosmetics',
    sku: 'BEA-CHI-LIP-004',
    weight: 1,
    dimensions: {
      width: 18.11,
      height: 28.38,
      depth: 22.17
    },
    warrantyInformation: '3 year warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 40,
    reviews: [
      {
        rating: 4,
        comment: 'Great product!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Liam Garcia',
        reviewerEmail: 'liam.garcia@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Great product!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Ruby Andrews',
        reviewerEmail: 'ruby.andrews@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Would buy again!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Clara Berry',
        reviewerEmail: 'clara.berry@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp'
  },
  {
    id: 6,
    title: 'Calvin Klein CK One',
    description: 'CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It\'s a versatile fragrance suitable for everyday wear.',
    category: 'fragrances',
    price: 49.99,
    discountPercentage: 1.89,
    rating: 4.37,
    stock: 29,
    tags: [
      'fragrances',
      'perfumes'
    ],
    brand: 'Calvin Klein',
    sku: 'FRA-CAL-CAL-006',
    weight: 7,
    dimensions: {
      width: 29.36,
      height: 27.76,
      depth: 20.72
    },
    warrantyInformation: '1 week warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: '90 days return policy',
    minimumOrderQuantity: 9,
    reviews: [
      {
        rating: 2,
        comment: 'Very disappointed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Layla Young',
        reviewerEmail: 'layla.young@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Fast shipping!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Daniel Cook',
        reviewerEmail: 'daniel.cook@x.dummyjson.com'
      },
      {
        rating: 3,
        comment: 'Not as described!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Jacob Cooper',
        reviewerEmail: 'jacob.cooper@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp',
      'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp'
  },
  {
    id: 7,
    title: 'Chanel Coco Noir Eau De',
    description: 'Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.',
    category: 'fragrances',
    price: 129.99,
    discountPercentage: 16.51,
    rating: 4.26,
    stock: 58,
    tags: [
      'fragrances',
      'perfumes'
    ],
    brand: 'Chanel',
    sku: 'FRA-CHA-CHA-007',
    weight: 7,
    dimensions: {
      width: 24.5,
      height: 25.7,
      depth: 25.98
    },
    warrantyInformation: '3 year warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 4,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Ruby Andrews',
        reviewerEmail: 'ruby.andrews@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Awesome product!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Leah Henderson',
        reviewerEmail: 'leah.henderson@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Very happy with my purchase!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Xavier Wright',
        reviewerEmail: 'xavier.wright@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp',
      'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp'
  },
  {
    id: 11,
    title: 'Annibale Colombo Bed',
    description: 'The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.',
    category: 'furniture',
    price: 1899.99,
    discountPercentage: 8.57,
    rating: 4.77,
    stock: 88,
    tags: [
      'furniture',
      'beds'
    ],
    brand: 'Annibale Colombo',
    sku: 'FUR-ANN-ANN-011',
    weight: 10,
    dimensions: {
      width: 28.16,
      height: 25.36,
      depth: 17.28
    },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock',
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 2,
        comment: 'Would not recommend!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Christopher West',
        reviewerEmail: 'christopher.west@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Vivian Carter',
        reviewerEmail: 'vivian.carter@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Poor quality!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Mason Wright',
        reviewerEmail: 'mason.wright@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp',
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp'
  },
  {
    id: 14,
    title: 'Knoll Saarinen Executive Conference Chair',
    description: 'The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.',
    category: 'furniture',
    price: 499.99,
    discountPercentage: 2.01,
    rating: 4.88,
    stock: 26,
    tags: [
      'furniture',
      'office chairs'
    ],
    brand: 'Knoll',
    sku: 'FUR-KNO-KNO-014',
    weight: 10,
    dimensions: {
      width: 13.81,
      height: 7.5,
      depth: 5.62
    },
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: '60 days return policy',
    minimumOrderQuantity: 5,
    reviews: [
      {
        rating: 2,
        comment: 'Waste of money!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Ella Cook',
        reviewerEmail: 'ella.cook@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Very dissatisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Clara Berry',
        reviewerEmail: 'clara.berry@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Would buy again!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Elena Long',
        reviewerEmail: 'elena.long@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp',
      'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp'
  },
  {
    id: 33,
    title: 'Mulberry',
    description: 'Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.',
    category: 'groceries',
    price: 4.99,
    discountPercentage: 12.87,
    rating: 4.95,
    stock: 99,
    tags: [
      'fruits'
    ],
    brand: null,
    sku: 'GRO-BRD-MUL-033',
    weight: 5,
    dimensions: {
      width: 12.8,
      height: 18.54,
      depth: 6.31
    },
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 43,
    reviews: [
      {
        rating: 5,
        comment: 'Fast shipping!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Avery Barnes',
        reviewerEmail: 'avery.barnes@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Not worth the price!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Sadie Morales',
        reviewerEmail: 'sadie.morales@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Would not buy again!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Oscar Powers',
        reviewerEmail: 'oscar.powers@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/groceries/mulberry/1.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/groceries/mulberry/thumbnail.webp'
  },
  {
    id: 42,
    title: 'Water',
    description: 'Pure and refreshing bottled water, essential for staying hydrated throughout the day.',
    category: 'groceries',
    price: 0.99,
    discountPercentage: 14.92,
    rating: 4.96,
    stock: 53,
    tags: [
      'beverages'
    ],
    brand: null,
    sku: 'GRO-BRD-WAT-042',
    weight: 4,
    dimensions: {
      width: 18.43,
      height: 7.4,
      depth: 17.79
    },
    warrantyInformation: '3 months warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 28,
    reviews: [
      {
        rating: 5,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Jonathan Pierce',
        reviewerEmail: 'jonathan.pierce@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Would not recommend!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Grayson Coleman',
        reviewerEmail: 'grayson.coleman@x.dummyjson.com'
      },
      {
        rating: 3,
        comment: 'Not as described!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Ethan Fletcher',
        reviewerEmail: 'ethan.fletcher@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/groceries/water/1.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/groceries/water/thumbnail.webp'
  },
  {
    id: 44,
    title: 'Family Tree Photo Frame',
    description: 'The Family Tree Photo Frame is a sentimental and stylish way to display your cherished family memories. With multiple photo slots, it tells the story of your loved ones.',
    category: 'home-decoration',
    price: 29.99,
    discountPercentage: 14.87,
    rating: 4.53,
    stock: 77,
    tags: [
      'home decor',
      'photo frame'
    ],
    brand: null,
    sku: 'HOM-BRD-FAM-044',
    weight: 1,
    dimensions: {
      width: 17.27,
      height: 14.81,
      depth: 29.11
    },
    warrantyInformation: '1 month warranty',
    shippingInformation: 'Ships in 2 weeks',
    availabilityStatus: 'In Stock',
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 15,
    reviews: [
      {
        rating: 4,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Oscar Powers',
        reviewerEmail: 'oscar.powers@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Excellent quality!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Austin Hudson',
        reviewerEmail: 'austin.hudson@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Very dissatisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Luke Cooper',
        reviewerEmail: 'luke.cooper@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp'
  },
  {
    id: 45,
    title: 'House Showpiece Plant',
    description: 'The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.',
    category: 'home-decoration',
    price: 39.99,
    discountPercentage: 7.46,
    rating: 4.67,
    stock: 28,
    tags: [
      'home decor',
      'artificial plants'
    ],
    brand: null,
    sku: 'HOM-BRD-HOU-045',
    weight: 8,
    dimensions: {
      width: 8.55,
      height: 14.62,
      depth: 17.25
    },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 3,
    reviews: [
      {
        rating: 5,
        comment: 'Very happy with my purchase!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Natalie Harris',
        reviewerEmail: 'natalie.harris@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Poor quality!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Max Russell',
        reviewerEmail: 'max.russell@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Very pleased!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Nolan Gonzalez',
        reviewerEmail: 'nolan.gonzalez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/1.webp',
      'https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/thumbnail.webp'
  },
  {
    id: 65,
    title: 'Lunch Box',
    description: 'The Lunch Box is a convenient and portable container for packing and carrying your meals. With compartments for different foods, it\'s perfect for on-the-go dining.',
    category: 'kitchen-accessories',
    price: 12.99,
    discountPercentage: 10.34,
    rating: 4.93,
    stock: 94,
    tags: [
      'kitchen tools',
      'storage'
    ],
    brand: null,
    sku: 'KIT-BRD-LUN-065',
    weight: 9,
    dimensions: {
      width: 12.45,
      height: 19.08,
      depth: 8.24
    },
    warrantyInformation: '5 year warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 39,
    reviews: [
      {
        rating: 5,
        comment: 'Very pleased!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Jace Smith',
        reviewerEmail: 'jace.smith@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Very happy with my purchase!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Zoe Bennett',
        reviewerEmail: 'zoe.bennett@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Poor quality!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Michael Johnson',
        reviewerEmail: 'michael.johnson@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/1.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp'
  },
  {
    id: 73,
    title: 'Spice Rack',
    description: 'The Spice Rack is a convenient organizer for your spices and seasonings. Keep your kitchen essentials within reach and neatly arranged with this stylish spice rack.',
    category: 'kitchen-accessories',
    price: 19.99,
    discountPercentage: 12.09,
    rating: 4.87,
    stock: 79,
    tags: [
      'kitchen tools',
      'organization'
    ],
    brand: null,
    sku: 'KIT-BRD-SPI-073',
    weight: 7,
    dimensions: {
      width: 28.06,
      height: 22.43,
      depth: 26.34
    },
    warrantyInformation: '1 week warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 18,
    reviews: [
      {
        rating: 5,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Elena Baker',
        reviewerEmail: 'elena.baker@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Excellent quality!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Owen Fisher',
        reviewerEmail: 'owen.fisher@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Waste of money!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Sadie Morales',
        reviewerEmail: 'sadie.morales@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/1.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/thumbnail.webp'
  },
  {
    id: 79,
    title: 'Asus Zenbook Pro Dual Screen Laptop',
    description: 'The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.',
    category: 'laptops',
    price: 1799.99,
    discountPercentage: 11.14,
    rating: 3.95,
    stock: 45,
    tags: [
      'laptops'
    ],
    brand: 'Asus',
    sku: 'LAP-ASU-ASU-079',
    weight: 9,
    dimensions: {
      width: 16.6,
      height: 11.49,
      depth: 10.89
    },
    warrantyInformation: '3 year warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 4,
        comment: 'Very happy with my purchase!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Michael Johnson',
        reviewerEmail: 'michael.johnson@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Highly recommended!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Zoe Bennett',
        reviewerEmail: 'zoe.bennett@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Mila Hernandez',
        reviewerEmail: 'mila.hernandez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp'
  },
  {
    id: 80,
    title: 'Huawei Matebook X Pro',
    description: 'The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.',
    category: 'laptops',
    price: 1399.99,
    discountPercentage: 9.38,
    rating: 4.98,
    stock: 75,
    tags: [
      'laptops'
    ],
    brand: 'Huawei',
    sku: 'LAP-HUA-HUA-080',
    weight: 9,
    dimensions: {
      width: 18.21,
      height: 22.83,
      depth: 17.26
    },
    warrantyInformation: 'No warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: '60 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 4,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Evan Wright',
        reviewerEmail: 'evan.wright@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very happy with my purchase!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Hunter Gordon',
        reviewerEmail: 'hunter.gordon@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Not worth the price!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'William Gonzalez',
        reviewerEmail: 'william.gonzalez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp'
  },
  {
    id: 83,
    title: 'Blue & Black Check Shirt',
    description: 'The Blue & Black Check Shirt is a stylish and comfortable men\'s shirt featuring a classic check pattern. Made from high-quality fabric, it\'s suitable for both casual and semi-formal occasions.',
    category: 'mens-shirts',
    price: 29.99,
    discountPercentage: 15.35,
    rating: 3.64,
    stock: 38,
    tags: [
      'clothing',
      'men\'s shirts'
    ],
    brand: 'Fashion Trends',
    sku: 'MEN-FAS-BLU-083',
    weight: 4,
    dimensions: {
      width: 27.49,
      height: 23.73,
      depth: 28.61
    },
    warrantyInformation: '3 year warranty',
    shippingInformation: 'Ships in 3-5 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 18,
    reviews: [
      {
        rating: 1,
        comment: 'Waste of money!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Logan Lee',
        reviewerEmail: 'logan.lee@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Zachary Lee',
        reviewerEmail: 'zachary.lee@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Fast shipping!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Aurora Rodriguez',
        reviewerEmail: 'aurora.rodriguez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp'
  },
  {
    id: 85,
    title: 'Man Plaid Shirt',
    description: 'The Man Plaid Shirt is a timeless and versatile men\'s shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.',
    category: 'mens-shirts',
    price: 34.99,
    discountPercentage: 19.5,
    rating: 3.46,
    stock: 82,
    tags: [
      'clothing',
      'men\'s shirts'
    ],
    brand: 'Classic Wear',
    sku: 'MEN-CLA-PLA-085',
    weight: 3,
    dimensions: {
      width: 9.34,
      height: 5.97,
      depth: 10.85
    },
    warrantyInformation: '1 week warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 13,
    reviews: [
      {
        rating: 3,
        comment: 'Disappointing product!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Aubrey Wagner',
        reviewerEmail: 'aubrey.wagner@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Awesome product!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Evan Reed',
        reviewerEmail: 'evan.reed@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Very disappointed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Evelyn Gonzalez',
        reviewerEmail: 'evelyn.gonzalez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp'
  },
  {
    id: 88,
    title: 'Nike Air Jordan 1 Red And Black',
    description: 'The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes.',
    category: 'mens-shoes',
    price: 149.99,
    discountPercentage: 4.12,
    rating: 4.77,
    stock: 7,
    tags: [
      'footwear',
      'athletic shoes'
    ],
    brand: 'Nike',
    sku: 'MEN-NIK-NIK-088',
    weight: 3,
    dimensions: {
      width: 17.44,
      height: 9.52,
      depth: 27
    },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 5,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Elena Long',
        reviewerEmail: 'elena.long@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very happy with my purchase!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Addison Wright',
        reviewerEmail: 'addison.wright@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Waste of money!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Mason Wright',
        reviewerEmail: 'mason.wright@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp'
  },
  {
    id: 90,
    title: 'Puma Future Rider Trainers',
    description: 'The Puma Future Rider Trainers offer a blend of retro style and modern comfort. Perfect for casual wear, these trainers provide a fashionable and comfortable option for everyday use.',
    category: 'mens-shoes',
    price: 89.99,
    discountPercentage: 4.2,
    rating: 4.9,
    stock: 90,
    tags: [
      'footwear',
      'casual shoes'
    ],
    brand: 'Puma',
    sku: 'MEN-PUM-PUM-090',
    weight: 6,
    dimensions: {
      width: 17.45,
      height: 15.58,
      depth: 23.13
    },
    warrantyInformation: '5 year warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '90 days return policy',
    minimumOrderQuantity: 10,
    reviews: [
      {
        rating: 5,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Jackson Morales',
        reviewerEmail: 'jackson.morales@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Very disappointed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Sophia Jones',
        reviewerEmail: 'sophia.jones@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Very pleased!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Logan Torres',
        reviewerEmail: 'logan.torres@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/thumbnail.webp'
  },
  {
    id: 93,
    title: 'Brown Leather Belt Watch',
    description: 'The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.',
    category: 'mens-watches',
    price: 89.99,
    discountPercentage: 5.99,
    rating: 4.19,
    stock: 32,
    tags: [
      'watches',
      'leather watches'
    ],
    brand: 'Fashion Timepieces',
    sku: 'MEN-FAS-BRO-093',
    weight: 10,
    dimensions: {
      width: 16.65,
      height: 6.15,
      depth: 20.18
    },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 7,
    reviews: [
      {
        rating: 1,
        comment: 'Very unhappy with my purchase!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'James Garcia',
        reviewerEmail: 'james.garcia@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Fast shipping!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Avery Barnes',
        reviewerEmail: 'avery.barnes@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Would buy again!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'David Martinez',
        reviewerEmail: 'david.martinez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp'
  },
  {
    id: 95,
    title: 'Rolex Cellini Date Black Dial',
    description: 'The Rolex Cellini Date with Black Dial is a classic and prestigious watch. With a black dial and date complication, it exudes sophistication and is a symbol of Rolex\'s heritage.',
    category: 'mens-watches',
    price: 8999.99,
    discountPercentage: 8.88,
    rating: 4.97,
    stock: 40,
    tags: [
      'watches',
      'luxury watches'
    ],
    brand: 'Rolex',
    sku: 'MEN-ROL-ROL-095',
    weight: 2,
    dimensions: {
      width: 13.46,
      height: 26.1,
      depth: 17.9
    },
    warrantyInformation: '3 months warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: '90 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 3,
        comment: 'Not worth the price!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Owen Sullivan',
        reviewerEmail: 'owen.sullivan@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Jonathan Pierce',
        reviewerEmail: 'jonathan.pierce@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Would not buy again!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Adrian Flores',
        reviewerEmail: 'adrian.flores@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/thumbnail.webp'
  },
  {
    id: 99,
    title: 'Amazon Echo Plus',
    description: 'The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.',
    category: 'mobile-accessories',
    price: 99.99,
    discountPercentage: 12.07,
    rating: 4.99,
    stock: 61,
    tags: [
      'electronics',
      'smart speakers'
    ],
    brand: 'Amazon',
    sku: 'MOB-AMA-AMA-099',
    weight: 5,
    dimensions: {
      width: 12.68,
      height: 15.24,
      depth: 27.46
    },
    warrantyInformation: '6 months warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 9,
    reviews: [
      {
        rating: 2,
        comment: 'Would not recommend!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Chloe Morales',
        reviewerEmail: 'chloe.morales@x.dummyjson.com'
      },
      {
        rating: 3,
        comment: 'Very disappointed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Mateo Perez',
        reviewerEmail: 'mateo.perez@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Fast shipping!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Evelyn Walker',
        reviewerEmail: 'evelyn.walker@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp'
  },
  {
    id: 103,
    title: 'Apple HomePod Mini Cosmic Grey',
    description: 'The Apple HomePod Mini in Cosmic Grey is a compact smart speaker that delivers impressive audio and integrates seamlessly with the Apple ecosystem for a smart home experience.',
    category: 'mobile-accessories',
    price: 99.99,
    discountPercentage: 18.1,
    rating: 4.62,
    stock: 27,
    tags: [
      'electronics',
      'smart speakers'
    ],
    brand: 'Apple',
    sku: 'MOB-APP-APP-103',
    weight: 10,
    dimensions: {
      width: 16.02,
      height: 29.2,
      depth: 19.81
    },
    warrantyInformation: '3 months warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock',
    returnPolicy: '90 days return policy',
    minimumOrderQuantity: 8,
    reviews: [
      {
        rating: 5,
        comment: 'Great product!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Max Russell',
        reviewerEmail: 'max.russell@x.dummyjson.com'
      },
      {
        rating: 3,
        comment: 'Would not buy again!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Isaac Lawrence',
        reviewerEmail: 'isaac.lawrence@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very pleased!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Avery Carter',
        reviewerEmail: 'avery.carter@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/1.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/thumbnail.webp'
  },
  {
    id: 113,
    title: 'Generic Motorcycle',
    description: 'The Generic Motorcycle is a versatile and reliable bike suitable for various riding preferences. With a balanced design, it provides a comfortable and efficient riding experience.',
    category: 'motorcycle',
    price: 3999.99,
    discountPercentage: 12.1,
    rating: 4.91,
    stock: 34,
    tags: [
      'motorcycles'
    ],
    brand: 'Generic Motors',
    sku: 'MOT-GEN-GEN-113',
    weight: 8,
    dimensions: {
      width: 26.23,
      height: 14.04,
      depth: 17.87
    },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 2 weeks',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 5,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Hunter Gordon',
        reviewerEmail: 'hunter.gordon@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Nicholas Bailey',
        reviewerEmail: 'nicholas.bailey@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Disappointing product!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Elena Long',
        reviewerEmail: 'elena.long@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/1.webp',
      'https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/thumbnail.webp'
  },
  {
    id: 114,
    title: 'Kawasaki Z800',
    description: 'The Kawasaki Z800 is a powerful and agile sportbike known for its striking design and performance. It\'s equipped with advanced features, making it a favorite among motorcycle enthusiasts.',
    category: 'motorcycle',
    price: 8999.99,
    discountPercentage: 9.77,
    rating: 3.98,
    stock: 52,
    tags: [
      'motorcycles',
      'sportbikes'
    ],
    brand: 'Kawasaki',
    sku: 'MOT-KAW-KAW-114',
    weight: 9,
    dimensions: {
      width: 18.3,
      height: 18.27,
      depth: 16.06
    },
    warrantyInformation: 'Lifetime warranty',
    shippingInformation: 'Ships in 3-5 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '90 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 4,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Scarlett Bowman',
        reviewerEmail: 'scarlett.bowman@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Awesome product!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Gabriel Bailey',
        reviewerEmail: 'gabriel.bailey@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Fast shipping!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Henry Hill',
        reviewerEmail: 'henry.hill@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/motorcycle/kawasaki-z800/1.webp',
      'https://cdn.dummyjson.com/product-images/motorcycle/kawasaki-z800/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/motorcycle/kawasaki-z800/thumbnail.webp'
  },
  {
    id: 118,
    title: 'Attitude Super Leaves Hand Soap',
    description: 'Attitude Super Leaves Hand Soap is a natural and nourishing hand soap enriched with the goodness of super leaves. It cleanses and moisturizes your hands, leaving them feeling fresh and soft.',
    category: 'skin-care',
    price: 8.99,
    discountPercentage: 18.49,
    rating: 3.19,
    stock: 94,
    tags: [
      'personal care',
      'hand soap'
    ],
    brand: 'Attitude',
    sku: 'SKI-ATT-ATT-118',
    weight: 1,
    dimensions: {
      width: 14.05,
      height: 8.3,
      depth: 16.62
    },
    warrantyInformation: '6 months warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: '60 days return policy',
    minimumOrderQuantity: 41,
    reviews: [
      {
        rating: 5,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Liam Garcia',
        reviewerEmail: 'liam.garcia@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Great product!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Victoria McDonald',
        reviewerEmail: 'victoria.mcdonald@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Very happy with my purchase!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Hannah Robinson',
        reviewerEmail: 'hannah.robinson@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/1.webp',
      'https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/thumbnail.webp'
  },
  {
    id: 119,
    title: 'Olay Ultra Moisture Shea Butter Body Wash',
    description: 'Olay Ultra Moisture Shea Butter Body Wash is a luxurious body wash that hydrates and nourishes your skin with the moisturizing power of shea butter. Enjoy a rich lather and silky-smooth skin.',
    category: 'skin-care',
    price: 12.99,
    discountPercentage: 16.39,
    rating: 4.51,
    stock: 34,
    tags: [
      'personal care',
      'body wash'
    ],
    brand: 'Olay',
    sku: 'SKI-OLA-OLA-119',
    weight: 4,
    dimensions: {
      width: 25.23,
      height: 28.33,
      depth: 11.89
    },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 33,
    reviews: [
      {
        rating: 4,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Abigail Rivera',
        reviewerEmail: 'abigail.rivera@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Great value for money!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Hunter Gordon',
        reviewerEmail: 'hunter.gordon@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very pleased!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Zoe Bennett',
        reviewerEmail: 'zoe.bennett@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.053Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/1.webp',
      'https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/thumbnail.webp'
  },
  {
    id: 130,
    title: 'Realme XT',
    description: 'The Realme XT is a feature-rich smartphone with a focus on camera technology. It comes equipped with advanced camera sensors, delivering high-quality photos and videos for photography enthusiasts.',
    category: 'smartphones',
    price: 349.99,
    discountPercentage: 11.51,
    rating: 4.58,
    stock: 80,
    tags: [
      'smartphones',
      'realme'
    ],
    brand: 'Realme',
    sku: 'SMA-REA-REA-130',
    weight: 3,
    dimensions: {
      width: 24.98,
      height: 26.73,
      depth: 6.5
    },
    warrantyInformation: '3 year warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock',
    returnPolicy: '60 days return policy',
    minimumOrderQuantity: 3,
    reviews: [
      {
        rating: 4,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Emily Brown',
        reviewerEmail: 'emily.brown@x.dummyjson.com'
      },
      {
        rating: 3,
        comment: 'Not as described!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Ella Cook',
        reviewerEmail: 'ella.cook@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Would buy again!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Layla Sullivan',
        reviewerEmail: 'layla.sullivan@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/thumbnail.webp'
  },
  {
    id: 132,
    title: 'Samsung Galaxy S8',
    description: 'The Samsung Galaxy S8 is a premium smartphone with an Infinity Display, offering a stunning visual experience. It boasts advanced camera capabilities and cutting-edge technology.',
    category: 'smartphones',
    price: 499.99,
    discountPercentage: 19.45,
    rating: 4.4,
    stock: 0,
    tags: [
      'smartphones',
      'samsung galaxy'
    ],
    brand: 'Samsung',
    sku: 'SMA-SAM-SAM-132',
    weight: 6,
    dimensions: {
      width: 23.05,
      height: 26.88,
      depth: 15.73
    },
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'Out of Stock',
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 4,
    reviews: [
      {
        rating: 4,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Owen Fisher',
        reviewerEmail: 'owen.fisher@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Clara Berry',
        reviewerEmail: 'clara.berry@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Highly recommended!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Tyler Davis',
        reviewerEmail: 'tyler.davis@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/thumbnail.webp'
  },
  {
    id: 137,
    title: 'American Football',
    description: 'The American Football is a classic ball used in American football games. It is designed for throwing and catching, making it an essential piece of equipment for the sport.',
    category: 'sports-accessories',
    price: 19.99,
    discountPercentage: 4.93,
    rating: 4.91,
    stock: 53,
    tags: [
      'sports equipment',
      'american football'
    ],
    brand: null,
    sku: 'SPO-BRD-AME-137',
    weight: 2,
    dimensions: {
      width: 6.88,
      height: 5.82,
      depth: 21.96
    },
    warrantyInformation: '6 months warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock',
    returnPolicy: '90 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 4,
        comment: 'Awesome product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Scarlett Bowman',
        reviewerEmail: 'scarlett.bowman@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Would buy again!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Tristan Scott',
        reviewerEmail: 'tristan.scott@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very pleased!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Eleanor Tyler',
        reviewerEmail: 'eleanor.tyler@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/sports-accessories/american-football/1.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/sports-accessories/american-football/thumbnail.webp'
  },
  {
    id: 145,
    title: 'Cricket Wicket',
    description: 'The Cricket Wicket is a set of three stumps and two bails, forming a wicket used in the sport of cricket. Batsmen aim to protect the wicket while scoring runs.',
    category: 'sports-accessories',
    price: 29.99,
    discountPercentage: 16.93,
    rating: 4.73,
    stock: 25,
    tags: [
      'sports equipment',
      'cricket'
    ],
    brand: null,
    sku: 'SPO-BRD-CRI-145',
    weight: 5,
    dimensions: {
      width: 15.99,
      height: 15.23,
      depth: 22.81
    },
    warrantyInformation: '3 months warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 20,
    reviews: [
      {
        rating: 3,
        comment: 'Very dissatisfied!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Gabriel Mitchell',
        reviewerEmail: 'gabriel.mitchell@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Fast shipping!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Grayson Coleman',
        reviewerEmail: 'grayson.coleman@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Awesome product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Grace Green',
        reviewerEmail: 'grace.green@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-wicket/1.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-wicket/thumbnail.webp'
  },
  {
    id: 154,
    title: 'Black Sun Glasses',
    description: 'The Black Sun Glasses are a classic and stylish choice, featuring a sleek black frame and tinted lenses. They provide both UV protection and a fashionable look.',
    category: 'sunglasses',
    price: 29.99,
    discountPercentage: 4.94,
    rating: 4.41,
    stock: 60,
    tags: [
      'eyewear',
      'sunglasses'
    ],
    brand: 'Fashion Shades',
    sku: 'SUN-FAS-BLA-154',
    weight: 1,
    dimensions: {
      width: 18.51,
      height: 15.69,
      depth: 10.11
    },
    warrantyInformation: 'No warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 17,
    reviews: [
      {
        rating: 3,
        comment: 'Would not recommend!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Jonathan Pierce',
        reviewerEmail: 'jonathan.pierce@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Disappointing product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Owen Fisher',
        reviewerEmail: 'owen.fisher@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very happy with my purchase!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Samantha Martinez',
        reviewerEmail: 'samantha.martinez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp'
  },
  {
    id: 156,
    title: 'Green and Black Glasses',
    description: 'The Green and Black Glasses feature a bold combination of green and black colors, adding a touch of vibrancy to your eyewear collection. They are both stylish and eye-catching.',
    category: 'sunglasses',
    price: 34.99,
    discountPercentage: 1.01,
    rating: 4.55,
    stock: 24,
    tags: [
      'eyewear',
      'sunglasses'
    ],
    brand: 'Fashion Shades',
    sku: 'SUN-FAS-GRE-156',
    weight: 7,
    dimensions: {
      width: 26.13,
      height: 9.8,
      depth: 25.94
    },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 15,
    reviews: [
      {
        rating: 3,
        comment: 'Waste of money!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Ava Taylor',
        reviewerEmail: 'ava.taylor@x.dummyjson.com'
      },
      {
        rating: 3,
        comment: 'Disappointing product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Owen Sullivan',
        reviewerEmail: 'owen.sullivan@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Victoria McDonald',
        reviewerEmail: 'victoria.mcdonald@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/1.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/thumbnail.webp'
  },
  {
    id: 160,
    title: 'Samsung Galaxy Tab S8 Plus Grey',
    description: 'The Samsung Galaxy Tab S8 Plus in Grey is a high-performance Android tablet by Samsung. With a large AMOLED display, powerful processor, and S Pen support, it\'s ideal for productivity and entertainment.',
    category: 'tablets',
    price: 599.99,
    discountPercentage: 13.31,
    rating: 4.68,
    stock: 62,
    tags: [
      'electronics',
      'tablets'
    ],
    brand: 'Samsung',
    sku: 'TAB-SAM-SAM-160',
    weight: 1,
    dimensions: {
      width: 6.11,
      height: 25.85,
      depth: 26.85
    },
    warrantyInformation: '3 months warranty',
    shippingInformation: 'Ships in 2 weeks',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 5,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Christopher West',
        reviewerEmail: 'christopher.west@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Disappointing product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Owen Sullivan',
        reviewerEmail: 'owen.sullivan@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Very disappointed!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Aria Roberts',
        reviewerEmail: 'aria.roberts@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp',
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/thumbnail.webp'
  },
  {
    id: 161,
    title: 'Samsung Galaxy Tab White',
    description: 'The Samsung Galaxy Tab in White is a sleek and versatile Android tablet. With a vibrant display, long-lasting battery, and a range of features, it offers a great user experience for various tasks.',
    category: 'tablets',
    price: 349.99,
    discountPercentage: 18.2,
    rating: 3.72,
    stock: 92,
    tags: [
      'electronics',
      'tablets'
    ],
    brand: 'Samsung',
    sku: 'TAB-SAM-SAM-161',
    weight: 5,
    dimensions: {
      width: 15.05,
      height: 5.37,
      depth: 11.82
    },
    warrantyInformation: '3 months warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 5,
    reviews: [
      {
        rating: 1,
        comment: 'Waste of money!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Max Russell',
        reviewerEmail: 'max.russell@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Poor quality!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Lincoln Kelly',
        reviewerEmail: 'lincoln.kelly@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Elena Long',
        reviewerEmail: 'elena.long@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/1.webp',
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/thumbnail.webp'
  },
  {
    id: 162,
    title: 'Blue Frock',
    description: 'The Blue Frock is a charming and stylish dress for various occasions. With a vibrant blue color and a comfortable design, it adds a touch of elegance to your wardrobe.',
    category: 'tops',
    price: 29.99,
    discountPercentage: 12.13,
    rating: 4.17,
    stock: 52,
    tags: [
      'clothing',
      'dresses'
    ],
    brand: null,
    sku: 'TOP-BRD-BLU-162',
    weight: 5,
    dimensions: {
      width: 24.25,
      height: 5.91,
      depth: 8.79
    },
    warrantyInformation: 'Lifetime warranty',
    shippingInformation: 'Ships in 2 weeks',
    availabilityStatus: 'In Stock',
    returnPolicy: '60 days return policy',
    minimumOrderQuantity: 4,
    reviews: [
      {
        rating: 4,
        comment: 'Great product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Victoria McDonald',
        reviewerEmail: 'victoria.mcdonald@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Fast shipping!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Benjamin Foster',
        reviewerEmail: 'benjamin.foster@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Would buy again!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Addison Ward',
        reviewerEmail: 'addison.ward@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp',
      'https://cdn.dummyjson.com/product-images/tops/blue-frock/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/tops/blue-frock/thumbnail.webp'
  },
  {
    id: 163,
    title: 'Girl Summer Dress',
    description: 'The Girl Summer Dress is a cute and breezy dress designed for warm weather. With playful patterns and lightweight fabric, it\'s perfect for keeping cool and stylish during the summer.',
    category: 'tops',
    price: 19.99,
    discountPercentage: 19.2,
    rating: 4.77,
    stock: 43,
    tags: [
      'clothing',
      'girls\' dresses'
    ],
    brand: null,
    sku: 'TOP-BRD-GIR-163',
    weight: 5,
    dimensions: {
      width: 26.19,
      height: 20.65,
      depth: 10.1
    },
    warrantyInformation: 'Lifetime warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock',
    returnPolicy: '60 days return policy',
    minimumOrderQuantity: 46,
    reviews: [
      {
        rating: 5,
        comment: 'Excellent quality!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Mason Pearson',
        reviewerEmail: 'mason.pearson@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Great product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Aubrey Garcia',
        reviewerEmail: 'aubrey.garcia@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Charlotte Davis',
        reviewerEmail: 'charlotte.davis@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/1.webp',
      'https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/thumbnail.webp'
  },
  {
    id: 167,
    title: '300 Touring',
    description: 'The 300 Touring is a stylish and comfortable sedan, known for its luxurious features and smooth performance.',
    category: 'vehicle',
    price: 28999.99,
    discountPercentage: 3.98,
    rating: 4.05,
    stock: 54,
    tags: [
      'sedans',
      'vehicles'
    ],
    brand: 'Chrysler',
    sku: 'VEH-CHR-TOU-167',
    weight: 9,
    dimensions: {
      width: 19.2,
      height: 26.17,
      depth: 17.28
    },
    warrantyInformation: '3 year warranty',
    shippingInformation: 'Ships in 2 weeks',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 4,
        comment: 'Very pleased!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Luna Russell',
        reviewerEmail: 'luna.russell@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Great product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Harper Garcia',
        reviewerEmail: 'harper.garcia@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Not as described!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Harper Turner',
        reviewerEmail: 'harper.turner@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/vehicle/300-touring/1.webp',
      'https://cdn.dummyjson.com/product-images/vehicle/300-touring/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/vehicle/300-touring/thumbnail.webp'
  },
  {
    id: 170,
    title: 'Durango SXT RWD',
    description: 'The Durango SXT RWD is a spacious and versatile SUV, known for its strong performance and family-friendly features.',
    category: 'vehicle',
    price: 36999.99,
    discountPercentage: 16.44,
    rating: 4.07,
    stock: 95,
    tags: [
      'suvs',
      'vehicles'
    ],
    brand: 'Dodge',
    sku: 'VEH-DOD-DUR-170',
    weight: 1,
    dimensions: {
      width: 19.02,
      height: 29.52,
      depth: 24.36
    },
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 5,
        comment: 'Very pleased!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'David Martinez',
        reviewerEmail: 'david.martinez@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Great value for money!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Nathan Dixon',
        reviewerEmail: 'nathan.dixon@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Very disappointed!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Mila Hernandez',
        reviewerEmail: 'mila.hernandez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/vehicle/durango-sxt-rwd/1.webp',
      'https://cdn.dummyjson.com/product-images/vehicle/durango-sxt-rwd/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/vehicle/durango-sxt-rwd/thumbnail.webp'
  },
  {
    id: 173,
    title: 'Heshe Women\'s Leather Bag',
    description: 'The Heshe Women\'s Leather Bag is a luxurious and high-quality leather bag for the sophisticated woman. With a timeless design and durable craftsmanship, it\'s a versatile accessory.',
    category: 'womens-bags',
    price: 129.99,
    discountPercentage: 3.87,
    rating: 4.92,
    stock: 99,
    tags: [
      'fashion accessories',
      'leather bags'
    ],
    brand: 'Heshe',
    sku: 'WOM-HES-HES-173',
    weight: 3,
    dimensions: {
      width: 28.66,
      height: 20.56,
      depth: 6.62
    },
    warrantyInformation: '5 year warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: '90 days return policy',
    minimumOrderQuantity: 5,
    reviews: [
      {
        rating: 5,
        comment: 'Excellent quality!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Hunter Gordon',
        reviewerEmail: 'hunter.gordon@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Awesome product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Mason Parker',
        reviewerEmail: 'mason.parker@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Awesome product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'William Gonzalez',
        reviewerEmail: 'william.gonzalez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/womens-bags/heshe-women\'s-leather-bag/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-bags/heshe-women\'s-leather-bag/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/womens-bags/heshe-women\'s-leather-bag/thumbnail.webp'
  },
  {
    id: 175,
    title: 'White Faux Leather Backpack',
    description: 'The White Faux Leather Backpack is a trendy and practical backpack for the modern woman. With a sleek white design and ample storage space, it\'s perfect for both casual and on-the-go styles.',
    category: 'womens-bags',
    price: 39.99,
    discountPercentage: 15.2,
    rating: 3.36,
    stock: 39,
    tags: [
      'fashion accessories',
      'backpacks'
    ],
    brand: 'Urban Chic',
    sku: 'WOM-URB-WHI-175',
    weight: 7,
    dimensions: {
      width: 14.31,
      height: 23.29,
      depth: 28.91
    },
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: '90 days return policy',
    minimumOrderQuantity: 7,
    reviews: [
      {
        rating: 4,
        comment: 'Awesome product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Ava Harrison',
        reviewerEmail: 'ava.harrison@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Not as described!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Liam Garcia',
        reviewerEmail: 'liam.garcia@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Great value for money!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Cameron Perez',
        reviewerEmail: 'cameron.perez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/thumbnail.webp'
  },
  {
    id: 179,
    title: 'Corset With Black Skirt',
    description: 'The Corset With Black Skirt is a chic and versatile outfit that pairs a fashionable corset with a classic black skirt. It offers a trendy and coordinated look for various occasions.',
    category: 'womens-dresses',
    price: 79.99,
    discountPercentage: 15.06,
    rating: 4.52,
    stock: 33,
    tags: [
      'clothing',
      'corsets',
      'skirts'
    ],
    brand: null,
    sku: 'WOM-BRD-COR-179',
    weight: 7,
    dimensions: {
      width: 17.56,
      height: 28.42,
      depth: 23.95
    },
    warrantyInformation: '1 month warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 5,
    reviews: [
      {
        rating: 5,
        comment: 'Very satisfied!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Lucas Allen',
        reviewerEmail: 'lucas.allen@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Disappointing product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Benjamin Wilson',
        reviewerEmail: 'benjamin.wilson@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Very happy with my purchase!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Elena Long',
        reviewerEmail: 'elena.long@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/thumbnail.webp'
  },
  {
    id: 180,
    title: 'Dress Pea',
    description: 'The Dress Pea is a stylish and comfortable dress with a pea pattern. Perfect for casual outings, it adds a playful and fun element to your wardrobe, making it a great choice for day-to-day wear.',
    category: 'womens-dresses',
    price: 49.99,
    discountPercentage: 17.68,
    rating: 4.88,
    stock: 6,
    tags: [
      'clothing',
      'dresses'
    ],
    brand: null,
    sku: 'WOM-BRD-DRE-180',
    weight: 1,
    dimensions: {
      width: 28.51,
      height: 20.99,
      depth: 12.58
    },
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'Low Stock',
    returnPolicy: '90 days return policy',
    minimumOrderQuantity: 6,
    reviews: [
      {
        rating: 4,
        comment: 'Fast shipping!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Harper Turner',
        reviewerEmail: 'harper.turner@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Not worth the price!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Luna Russell',
        reviewerEmail: 'luna.russell@x.dummyjson.com'
      },
      {
        rating: 2,
        comment: 'Would not buy again!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Michael Johnson',
        reviewerEmail: 'michael.johnson@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/thumbnail.webp'
  },
  {
    id: 182,
    title: 'Green Crystal Earring',
    description: 'The Green Crystal Earring is a dazzling accessory that features a vibrant green crystal. With a classic design, it adds a touch of elegance to your ensemble, perfect for formal or special occasions.',
    category: 'womens-jewellery',
    price: 29.99,
    discountPercentage: 15.24,
    rating: 3.96,
    stock: 54,
    tags: [
      'fashion accessories',
      'earrings'
    ],
    brand: null,
    sku: 'WOM-BRD-GRE-182',
    weight: 2,
    dimensions: {
      width: 14.61,
      height: 22.92,
      depth: 12.52
    },
    warrantyInformation: '5 year warranty',
    shippingInformation: 'Ships in 3-5 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '60 days return policy',
    minimumOrderQuantity: 15,
    reviews: [
      {
        rating: 4,
        comment: 'Would buy again!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Michael Williams',
        reviewerEmail: 'michael.williams@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Great value for money!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Samantha Howard',
        reviewerEmail: 'samantha.howard@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Excellent quality!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Xavier Wright',
        reviewerEmail: 'xavier.wright@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/thumbnail.webp'
  },
  {
    id: 184,
    title: 'Tropical Earring',
    description: 'The Tropical Earring is a fun and playful accessory inspired by tropical elements. Featuring vibrant colors and a lively design, it\'s perfect for adding a touch of summer to your look.',
    category: 'womens-jewellery',
    price: 19.99,
    discountPercentage: 0.76,
    rating: 4.4,
    stock: 1,
    tags: [
      'fashion accessories',
      'earrings'
    ],
    brand: null,
    sku: 'WOM-BRD-TRO-184',
    weight: 3,
    dimensions: {
      width: 14.99,
      height: 15.76,
      depth: 16.09
    },
    warrantyInformation: '3 year warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'Low Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 31,
    reviews: [
      {
        rating: 5,
        comment: 'Great product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Alexander Jones',
        reviewerEmail: 'alexander.jones@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Awesome product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Eli Ward',
        reviewerEmail: 'eli.ward@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Very unhappy with my purchase!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Carter Rivera',
        reviewerEmail: 'carter.rivera@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/thumbnail.webp'
  },
  {
    id: 186,
    title: 'Calvin Klein Heel Shoes',
    description: 'Calvin Klein Heel Shoes are elegant and sophisticated, designed for formal occasions. With a classic design and high-quality materials, they complement your stylish ensemble.',
    category: 'womens-shoes',
    price: 79.99,
    discountPercentage: 3.19,
    rating: 4.92,
    stock: 93,
    tags: [
      'footwear',
      'heel shoes'
    ],
    brand: 'Calvin Klein',
    sku: 'WOM-CAL-CAL-186',
    weight: 6,
    dimensions: {
      width: 29.12,
      height: 20.94,
      depth: 20.65
    },
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: '60 days return policy',
    minimumOrderQuantity: 6,
    reviews: [
      {
        rating: 5,
        comment: 'Great value for money!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Maya Reed',
        reviewerEmail: 'maya.reed@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Great value for money!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Grace Perry',
        reviewerEmail: 'grace.perry@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Not as described!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Eleanor Collins',
        reviewerEmail: 'eleanor.collins@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/thumbnail.webp'
  },
  {
    id: 187,
    title: 'Golden Shoes Woman',
    description: 'The Golden Shoes for Women are a glamorous choice for special occasions. Featuring a golden hue and stylish design, they add a touch of luxury to your outfit.',
    category: 'womens-shoes',
    price: 49.99,
    discountPercentage: 13.93,
    rating: 3.26,
    stock: 88,
    tags: [
      'footwear',
      'women\'s shoes'
    ],
    brand: 'Fashion Diva',
    sku: 'WOM-FAS-GOL-187',
    weight: 4,
    dimensions: {
      width: 16.38,
      height: 20.06,
      depth: 8.8
    },
    warrantyInformation: '6 months warranty',
    shippingInformation: 'Ships in 2 weeks',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    minimumOrderQuantity: 7,
    reviews: [
      {
        rating: 4,
        comment: 'Excellent quality!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Nolan Gonzalez',
        reviewerEmail: 'nolan.gonzalez@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Very pleased!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Brayden Fleming',
        reviewerEmail: 'brayden.fleming@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Very pleased!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Eleanor Tyler',
        reviewerEmail: 'eleanor.tyler@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/thumbnail.webp'
  },
  {
    id: 191,
    title: 'Rolex Cellini Moonphase',
    description: 'The Rolex Cellini Moonphase watch is a masterpiece of horology. Featuring a moon phase complication, it showcases the craftsmanship and elegance that Rolex is renowned for.',
    category: 'womens-watches',
    price: 15999.99,
    discountPercentage: 4.11,
    rating: 3.83,
    stock: 52,
    tags: [
      'watches',
      'luxury watches'
    ],
    brand: 'Rolex',
    sku: 'WOM-ROL-ROL-191',
    weight: 10,
    dimensions: {
      width: 12.5,
      height: 20.63,
      depth: 25.04
    },
    warrantyInformation: '1 month warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 4,
        comment: 'Very happy with my purchase!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Gabriel Hayes',
        reviewerEmail: 'gabriel.hayes@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Fast shipping!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Logan Torres',
        reviewerEmail: 'logan.torres@x.dummyjson.com'
      },
      {
        rating: 1,
        comment: 'Disappointing product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Isabella Jackson',
        reviewerEmail: 'isabella.jackson@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/thumbnail.webp'
  },
  {
    id: 193,
    title: 'Watch Gold for Women',
    description: 'The Gold Women\'s Watch is a stunning accessory that combines luxury and style. Featuring a gold-plated case and a chic design, it adds a touch of glamour to any outfit.',
    category: 'womens-watches',
    price: 799.99,
    discountPercentage: 18.34,
    rating: 4.24,
    stock: 0,
    tags: [
      'watches',
      'women\'s watches'
    ],
    brand: 'Fashion Gold',
    sku: 'WOM-FAS-WAT-193',
    weight: 1,
    dimensions: {
      width: 18.85,
      height: 28.59,
      depth: 7.21
    },
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'Out of Stock',
    returnPolicy: '60 days return policy',
    minimumOrderQuantity: 1,
    reviews: [
      {
        rating: 4,
        comment: 'Highly impressed!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Elena Baker',
        reviewerEmail: 'elena.baker@x.dummyjson.com'
      },
      {
        rating: 4,
        comment: 'Would buy again!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Avery Barnes',
        reviewerEmail: 'avery.barnes@x.dummyjson.com'
      },
      {
        rating: 5,
        comment: 'Great product!',
        date: '2025-04-30T09:41:02.054Z',
        reviewerName: 'Evelyn Sanchez',
        reviewerEmail: 'evelyn.sanchez@x.dummyjson.com'
      }
    ],
    meta: {
      createdAt: '2025-04-30T09:41:02.054Z'
    },
    images: [
      'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/2.webp'
    ],
    thumbnail: 'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/thumbnail.webp'
  }
]

export default fallbackProducts
