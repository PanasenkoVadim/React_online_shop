export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type ProductType = {
  id: string;
  imageUrl: string;
  sizes: number[];
  price: number;
  name: string;
};

export type GoodsStateType = {
  goodsItems: ProductType[];
  status: Status;
};
