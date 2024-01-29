import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import emptyImg from "../../assets/img/emptyCart.png";
import { selectCart } from "../../redux/cart/selectors";
import { clearCart } from "../../redux/cart/slice";
import { CartItemType } from "../../redux/cart/types";
import css from "./Cart.module.scss";
import CartItem from "./CartItem/CartItem";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, totalQuantity } = useSelector(selectCart);
  const cartComponents = cartItems.map((item: CartItemType, key: number) => {
    return <CartItem key={key} {...item} />;
  });

  return (
    <>
      <div className={css.cartHeading}>
        <div className={css.cartHeadingImg}>
          <svg
            data-v-7100e328=""
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              data-v-7100e328=""
              d="M2.25 3C2.25 2.58579 2.58579 2.25 3 2.25H4.38197C5.04482 2.25 5.65078 2.6245 5.94721 3.21738L5.27639 3.55279L5.94721 3.21738L6.46353 4.25H20.1384C21.0982 4.25 21.6999 5.28685 21.2237 6.12017L17.9391 11.8682C17.6275 12.4135 17.0477 12.75 16.4197 12.75H8.91567L7.59225 14.8675C7.48818 15.034 7.60789 15.25 7.80425 15.25H19C19.4142 15.25 19.75 15.5858 19.75 16C19.75 16.4142 19.4142 16.75 19 16.75H7.80425C6.42974 16.75 5.59176 15.2381 6.32025 14.0725L7.67159 11.9103L5.30898 5.295L4.60557 3.8882C4.56322 3.8035 4.47666 3.75 4.38197 3.75H3C2.58579 3.75 2.25 3.41421 2.25 3ZM7.06427 5.75L9.02855 11.25H16.4197C16.5094 11.25 16.5922 11.2019 16.6368 11.124L19.7076 5.75H7.06427ZM10 19.5C10 20.3284 9.32843 21 8.5 21C7.67157 21 7 20.3284 7 19.5C7 18.6716 7.67157 18 8.5 18C9.32843 18 10 18.6716 10 19.5ZM17.5 21C18.3284 21 19 20.3284 19 19.5C19 18.6716 18.3284 18 17.5 18C16.6716 18 16 18.6716 16 19.5C16 20.3284 16.6716 21 17.5 21Z"
              fill="#000"
            ></path>
          </svg>
        </div>
        <h1>Корзина</h1>
      </div>
      {cartItems.length > 0 ? (
        <div>
          <div className={css.cartList}>{cartComponents}</div>
          <div className={css.cartTotal}>
            <button
              onClick={() => {
                let clearAgree = window.confirm(
                  "Вы точно хотите удалить все товары? Отменить данное действие будет невозможно."
                );
                clearAgree && dispatch(clearCart());
              }}
            >
              Очистить корзину
            </button>
            <div className={css.cartTotalQuantity}>
              Товаров в корзине: <strong>{totalQuantity}</strong>
            </div>
            <div className={css.cartTotalPrice}>
              Сумма заказа: <strong>{totalPrice}</strong> ₽
            </div>
          </div>
        </div>
      ) : (
        <div className={css.cartEmpty}>
          <div>В вашей корзине пусто</div>
          <div>
            Перейти в <Link to={"/"}>каталог</Link>
          </div>
          <div className={css.cartEmptyImg}>
            <img src={emptyImg} alt="" />
          </div>
        </div>
      )}
    </>
  );
}