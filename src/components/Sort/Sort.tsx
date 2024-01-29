import React, { FC, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSelectedSort } from "../../redux/filter/slice";
import { SortObjType } from "../../redux/filter/types";
import styles from "./Sort.module.scss";

export const sortList: SortObjType[] = [
  { name: "По популярности", sortType: "rating" },
  { name: "Сначала дорогие", sortType: "-price" },
  { name: "Сначала дешевые", sortType: "price" },
  { name: "По алфавиту(а-я/a-z)", sortType: "name" },
  { name: "По алфавиту(я-а/z-a)", sortType: "-name" },
  { name: "По отзывам", sortType: "id" },
];

type Props = {
  sortObj: SortObjType;
};

const Sort: FC<Props> = ({ sortObj }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeSortMenu: EventListenerOrEventListenerObject = (event) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener("click", closeSortMenu);

    return () => {
      document.body.removeEventListener("click", closeSortMenu);
    };
  }, []);

  const onSortItemClick = (obj: SortObjType) => () => {
    dispatch(setSelectedSort(obj));
    setIsVisible(false);
  };

  return (
    <div className={styles.sort} ref={sortRef}>
      <span
        className={styles.sort__label}
        onClick={() => setIsVisible(!isVisible)}
      >
        Сортировка:{" "}
        <span className={styles.sort__selected}>
          {sortObj.name}
          <svg
            className={isVisible ? styles.opened : ""}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
          >
            <path fill="currentColor" d="m4 6 4 5 4-5H4Z"></path>
          </svg>
        </span>
      </span>
      <div
        className={`${styles.ui__sort__popup} ${
          isVisible ? styles.active : ""
        }`}
      >
        <ul>
          {sortList.map((obj, i) => (
            <li
              key={i}
              onClick={onSortItemClick(obj)}
              className={sortObj.sortType === obj.sortType ? styles.active : ""}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sort;
