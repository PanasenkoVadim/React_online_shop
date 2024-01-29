import Categories from "components/Categories/Categories";
import Paginate from "components/common/Paginate/Paginate";
import CardLoader from "components/ProductCard/CardLoader";
import ProductCard from "components/ProductCard/ProductCard";
import Sort, { sortList } from "components/Sort/Sort";
import qs from "qs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectFilter } from "redux/filter/selectors";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";
import { selectGoods } from "../redux/goods/selectors";
import { fetchGoods } from "../redux/goods/slice";
import { ProductType } from "../redux/goods/types";
import { useAppDispatch } from "../redux/store";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sortObj, currentPage, searchValue } =
    useSelector(selectFilter);
  const { goodsItems: items, status } = useSelector(selectGoods);
  const [isLoadint, setIsLoading] = useState(true);
  const pageSize = 6;
  const totalItemsCount = 16;

  const getItems = async () => {
    const sortBy = sortObj.sortType.replace("-", "");
    const order = sortObj.sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? String(categoryId) : "";
    const search = searchValue ? searchValue : "";

    dispatch(
      fetchGoods({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
        pageSize: String(pageSize),
      })
    );
    setIsLoading(false);
  };

  //если был первый рендер, то запрашиваем товары
  useEffect(() => {
    if (!isSearch.current) {
      getItems();
    }
    isSearch.current = false;
  }, [sortObj, categoryId, searchValue, currentPage]);

  //если после первого рендера в адресной строке есть URL-параметры, то мы передаём их в state
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (option) => option.sortType === params.sortType
      );
      if (sort) {
        params.sortObj = sort;
      }
      dispatch(
        setFilters({
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sortObj: sort || sortList[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  //если изменили параметры фильтрации и был первый рендер, то меняем URL-параметры
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortObj.sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortObj, categoryId, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, ind) => <CardLoader key={ind} />);

  const goods = items.map((obj: ProductType, ind) => (
    <ProductCard {...obj} key={ind} />
  ));

  const productsList = isLoadint ? skeletons : goods;

  const onCategoryChange = useCallback((itemIndex: number) => {
    dispatch(setCategoryId(itemIndex));
    dispatch(setCurrentPage(1));
  }, []);

  return (
    <>
      <div className="top-filter">
        <Categories value={categoryId} onCategoryChange={onCategoryChange} />
        <Sort sortObj={sortObj} />
      </div>
      {status === "error" ? (
        <div className="fetchError">
          <h2>Произошла ошибка &#128532;</h2> К сожалению, не удалось получить
          список товаров.
          <br /> Попробуйте повторить попытку позже.
        </div>
      ) : (
        <div className="products">
          <div className="products__list">{productsList}</div>
          <Paginate
            totalItemsCount={totalItemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
}
