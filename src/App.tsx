import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Container from "./components/Container/Container";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import Detail from "./pages/Detail/Detail";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basket" element={<Cart />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
