import { FC, memo } from "react";
import css from "./Categories.module.scss";

type Props = {
  value: number;
  onCategoryChange: (ind: number) => void;
};

const Categories: FC<Props> = memo(({ value, onCategoryChange }) => {
  const categories = ["Все", "Мужские", "Женские", "Детские"];

  return (
    <div className={css.categories}>
      <ul>
        {categories.map((el, ind) => (
          <li
            key={ind}
            onClick={() => onCategoryChange(ind)}
            className={value === ind ? css.active : ""}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
