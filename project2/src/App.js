import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Cart from "./components/Cart";
import PaymentInfo from "./components/PaymentInfo";
import ConfirmOrder from "./components/ConfirmOrder";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import ProductDetail from "./components/ProductDetail";
import EditProduct from "./components/Admin/ManageProducts/EditProduct";
import NotFound from "./components/NotFound";
import PrivateRoutes from "./privateRoutes";
import { ADMIN_ROLE, USER_ROLE } from "./constants";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/products/:id" element={<ProductDetail />}></Route>
        <Route path="*" element={<NotFound />} />

        <Route element={<PrivateRoutes role={ADMIN_ROLE} />}>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/edit-product/:id" element={<EditProduct />}></Route>
        </Route>

        <Route element={<PrivateRoutes role={USER_ROLE} />}>
          <Route path="/payment" element={<PaymentInfo />}></Route>
          <Route path="/confirm-order" element={<ConfirmOrder />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
