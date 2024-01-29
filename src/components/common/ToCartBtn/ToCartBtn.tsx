import { FC } from "react";
import css from "./ToCartBtn.module.scss";

type BtnProps = {
  onClick?: () => void;
  quantity?: number;
};

const ToCartBtn: FC<BtnProps> = ({ onClick, quantity }) => {
  return (
    <button
      className={css.btn__cart}
      disabled={quantity === 0}
      onClick={onClick}
    >
      В корзину
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className="a2429-e9"
      >
        <path
          fill="#fff"
          d="M9.925 5.371a1 1 0 1 0-1.858-.742L6.317 9h-1.2c-1.076 0-1.614 0-1.913.346-.3.346-.222.878-.067 1.942l.271 1.864c.475 3.265.902 4.898 2.03 5.873C6.565 20 8.216 20 11.518 20h.96c3.302 0 4.953 0 6.08-.975 1.128-.975 1.559-2.608 2.034-5.873l.271-1.864c.155-1.064.233-1.596-.067-1.942C20.496 9 19.96 9 18.883 9h-1.205l-1.75-4.371a1 1 0 0 0-1.857.742L15.523 9h-7.05l1.452-3.629ZM10.997 14v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 2 0ZM14 13a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1Z"
        ></path>
      </svg>
    </button>
  );
};

export default ToCartBtn;
