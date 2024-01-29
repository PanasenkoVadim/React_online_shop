import { useEffect, useState } from "react";
import NotFoundBlock from "../components/NotFoundBlock";

export default function NotFound() {
  const [users, setUsers] = useState([]);
  async function getUsers() {
    let response = await fetch("http://localhost:4444/posts");
    if (response.ok) {
      let data = await response.json();
      setUsers(data);
      return data;
    } else {
      console.log("error");
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
  console.log(users);
  return <NotFoundBlock />;
}
