import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ToCartBtn from "../../components/common/ToCartBtn/ToCartBtn";
import css from "./Detail.module.scss";

type State = {
  name: string;
  imageUrl: string;
  price: number;
};

export default function Detail() {
  const { id } = useParams();
  const [item, setItem] = useState<State>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.get(
          `https://65400a5045bedb25bfc19611.mockapi.io/items/${id}`
        );
        setItem(data);
      } catch (err) {
        alert("Ошибка загрузки страницы");
        navigate("/");
      }
    }
    fetch();
  }, []);

  if (!item) return <>Загрузка...</>;

  return (
    <div className={css.wrap}>
      <div className={css.img}>
        <img src={item.imageUrl} alt="Фото товара" />
      </div>
      <div className={css.descr}>
        <h1>{item.name}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat non
          quam in ullam dolor, error laudantium aliquid. Facere cupiditate
          voluptates deleniti. Atque dolorem animi voluptatibus quos ab
          distinctio, omnis harum.
        </p>
        <h2>{item.price}</h2>
        <ToCartBtn />
        <Link to={"/"}>Вернуться в каталог</Link>
      </div>
    </div>
  );
}
