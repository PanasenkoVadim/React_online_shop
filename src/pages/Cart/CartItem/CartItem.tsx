import cn from "classnames";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { deleteCartItem, changeQuantity } from "../../../redux/cart/slice";
import { CartItemType } from "../../../redux/cart/types";
import css from "../Cart.module.scss";

const CartItem: FC<CartItemType> = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  selectedSize,
}) => {
  const dispatch = useDispatch();
  const deleteItem = () => {
    const trueDelete = window.confirm(
      "Вы точно хотите удалить выбранный товар? Отменить данное действие будет невозможно."
    );
    trueDelete &&
      dispatch(deleteCartItem({ id, quantity, price, selectedSize }));
  };
  return (
    <div className={css.cartItem}>
      <div className={css.cartItemImg}>
        <img src={imageUrl} alt="" />
      </div>
      <div className={css.cartItemName}>{name}</div>
      <div className={css.cartItemQuantity}>
        <button
          className={cn(css.cartItemBtn, css.cartItemBtnQuantity)}
          disabled={quantity <= 1}
          onClick={() => {
            if (quantity > 1) {
              dispatch(
                changeQuantity({ id, selectedSize, method: "dicrement" })
              );
            } else {
              deleteItem();
            }
          }}
        >
          -
        </button>
        <div>{quantity} шт.</div>

        <button
          className={cn(css.cartItemBtn, css.cartItemBtnQuantity)}
          onClick={() =>
            dispatch(changeQuantity({ id, selectedSize, method: "increment" }))
          }
        >
          +
        </button>
      </div>
      <div className={css.cartItemQuantity}>{selectedSize}</div>
      <div className={css.cartItemPrice}>{price} ₽</div>
      <div
        className={cn(css.cartItemBtn, css.cartItemBtnDel)}
        onClick={deleteItem}
      >
        <svg
          fill="none"
          height="18"
          viewBox="0 0 24 24"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="#000"
          />
        </svg>
      </div>
    </div>
  );
};
export default CartItem;
