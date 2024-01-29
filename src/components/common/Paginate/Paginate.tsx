import { FC } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../redux/filter/slice";
import { PaginationType } from "../../../redux/filter/types";
import styles from "./Paginate.module.scss";

const Paginate: FC<PaginationType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  // portionSize = 10,
}) => {
  const dispatch = useDispatch();
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  // let portionCount = Math.ceil(pagesCount / portionSize);
  // let [portionNumber, setPortionNumber] = useState(1);

  // let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  // let rightPortionPageNumber = portionNumber * portionSize;
  // useEffect(
  //   () => setPortionNumber(Math.ceil(currentPage / portionSize)),
  //   [currentPage]
  // );
  return (
    <div className={styles.pagination}>
      {/* <button
        onClick={() => {
          if (portionNumber > 1) setPortionNumber(portionNumber - 1);
        }}
      >
        prev
      </button> */}
      {pages
        // .filter(
        //   (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        // )
        .map((p, i) => {
          return (
            <span
              key={i}
              onClick={(e) => {
                dispatch(setCurrentPage(p));
              }}
              className={
                currentPage === p
                  ? styles.item + " " + styles.selected
                  : styles.item
              }
            >
              {p}
            </span>
          );
        })}
      {/* <button
        onClick={() => {
          if (portionCount > portionNumber) setPortionNumber(portionNumber + 1);
        }}
      >
        next
      </button> */}
    </div>
  );
};
export default Paginate;
