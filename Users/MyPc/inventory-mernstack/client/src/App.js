import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BusinessInfo from "./component/home/BussinessInfo";
import BussinessTable from "./component/home/BussinessTable";
import Buyer from "./component/home/Buyer";
import BuyerTable from "./component/home/BuyerTable";
import Header from "./component/home/Header";
import LoginCompo from "./component/home/LoginCompo";
import MainContainer from "./component/home/MainContainer";
import Order from "./component/home/Order";
import ProductInfo from "./component/home/Product";
import ProductTable from "./component/home/ProductTable";
import PurchaseInfo from "./component/home/PurchaseInfo";
import Sell from "./component/home/Sell";
import SignCompo from "./component/home/SignCompo";
import SuplierInfo from "./component/home/SuplierInfo";
import SupplierTable from "./component/home/SupplierTable";
import Users from "./component/home/Users";
import UserInfo from "./component/home/UserInfo";
import SideBar from "./component/navigation/SideBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/users" element={<Users />} />
          <Route path="/userdata/:id" element={<UserInfo />} />
          <Route path="/login" element={<LoginCompo />} />
          <Route path="/signup" element={<SignCompo />} />
          <Route path="/main" element={<MainContainer />} />
          <Route path="/product" element={<ProductInfo />} />
          <Route path="/businesstable" element={<BussinessTable />} />
          <Route path="/businessinfo" element={<BusinessInfo />} />
          <Route path="/producttable" element={<ProductTable />} />
          <Route path="/purchase" element={<PurchaseInfo />} />
          <Route path="/supplier" element={<SuplierInfo />} />
          <Route path="/suppliertable" element={<SupplierTable />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/buyertable" element={<BuyerTable />} />
          <Route path="/sidebar" element={<SideBar />} />

          {/* <SideBar/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
