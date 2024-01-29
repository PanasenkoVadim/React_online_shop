import cn from "classnames";
import { FC, ReactNode, useEffect, useRef } from "react";
import css from "./Popup.module.scss";

// type props = {
//   children: ReactNode;
//   open: boolean;
//   setPopupState?: () => void;
// };

const Popup = ({ open, children, setPopupState }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add("stop-scroll");
    } else {
      document.body.classList.remove("stop-scroll");
    }
  }, [open]);
  const close = () => {
    setPopupState((prevState) => {
      return { ...prevState, open: false };
    });
  };
  return (
    <div className={cn(css.wrapper, open && css.open)} onMouseDown={close}>
      <div
        className={css.inner}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Popup;
