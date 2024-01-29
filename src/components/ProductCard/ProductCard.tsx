import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import CustomSelect from "../../assets/shared/ui/form/formFields/CustomSelect";
import { addCartItem } from "../../redux/cart/slice";
import { CartItemType } from "../../redux/cart/types";
import { ProductType } from "../../redux/goods/types";
import ToCartBtn from "../common/ToCartBtn/ToCartBtn";
import styles from "./ProductCard.module.scss";

const ProductCard: FC<ProductType> = ({ id, imageUrl, price, name, sizes }) => {
  const sizesOptions = sizes.map((size) => {
    return {
      value: size,
      label: String(size),
    };
  });
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  function increment() {
    return setQuantity(quantity + 1);
  }

  function decrement() {
    if (quantity <= 0) return;
    return setQuantity(quantity - 1);
  }
  function addToCart() {
    if (!selectedSize) {
      alert("Выберите размер");
    } else {
      const cartItem: CartItemType = {
        id,
        imageUrl,
        selectedSize,
        price,
        name,
        quantity,
      };
      dispatch(addCartItem(cartItem));
      setQuantity(1);
      setSelectedSize(sizes[0]);
      alert("Товар добавлен в корзину");
    }
  }
  return (
    <div className={styles.card}>
      <NavLink to={`/detail/${id}`}>
        <div className={styles.image}>
          <img src={imageUrl} alt="" />
        </div>
      </NavLink>
      <div className={styles.wrapper}>
        <span className={styles.price}>{price} р.</span>
        <div className={styles.row}>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.size}>
            <label htmlFor="size">Размер: </label>
            <CustomSelect
              selectedOption={selectedSize}
              setSelectedOption={setSelectedSize}
              options={sizesOptions}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.quantity}>
            <button className={styles.btn} onClick={decrement}>
              -
            </button>
            Количество: {quantity}
            <button className={styles.btn} onClick={increment}>
              +
            </button>
          </div>

          <ToCartBtn quantity={quantity} onClick={addToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
