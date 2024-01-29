export type SortObjType = {
  name: string;
  sortType: "rating" | "price" | "-price" | "name" | "-name" | "id";
};

export type SortType = {
  searchValue?: string;
  categoryId: number;
  sortObj: SortObjType;
  currentPage: number;
};

export type PaginationType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
};
