import { ReactNode } from "react";
import styles from "./Container.module.scss";

type props = {
  children: ReactNode;
};

export default function Container({ children }: props) {
  return <div className={styles.container}>{children}</div>;
}
