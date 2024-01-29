export type CartItemType = {
  id: string;
  imageUrl?: string;
  name?: string;
  price: number;
  quantity: number;
  selectedSize: number;
};

export type CartSliceState = {
  cartItems: CartItemType[];
  totalPrice: number;
  totalQuantity: number;
};
