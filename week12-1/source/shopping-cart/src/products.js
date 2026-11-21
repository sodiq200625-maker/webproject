// The product list: name, price in won and an image URL for every item.
const img = (file) => `${import.meta.env.BASE_URL}products/${file}`;

export const products = [
  { id: 1, name: 'Americano', price: 4500, image: img('americano.svg'), description: 'Hot, double shot' },
  { id: 2, name: 'Egg sandwich', price: 7000, image: img('sandwich.svg'), description: 'Toasted, with salad' },
  { id: 3, name: 'Mineral water', price: 1000, image: img('water.svg'), description: '500 ml' },
  { id: 4, name: 'Butter croissant', price: 3800, image: img('croissant.svg'), description: 'Baked this morning' },
  { id: 5, name: 'Green tea latte', price: 5200, image: img('green-tea-latte.svg'), description: 'Iced or hot' },
  { id: 6, name: 'Cheesecake slice', price: 6500, image: img('cheesecake.svg'), description: 'New York style' },
];

export const formatWon = (n) => `${n.toLocaleString('ko-KR')}원`;
