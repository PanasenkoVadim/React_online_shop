import ContentLoader from "react-content-loader";
import styles from "./ProductCard.module.scss";

const CardLoader = () => (
  <ContentLoader
    className={styles.card}
    speed={2}
    width={386}
    height={555}
    viewBox="0 0 386 555"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
  </ContentLoader>
);

export default CardLoader;
