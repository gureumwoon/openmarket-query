import './App.css';
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from './hooks/reduxHooks';

// routes
import Main from './pages/Main';
import Login from './pages/LogIn';
import SignUp from './pages/SingUp';
import Upload from './pages/Upload';
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import Payment from './pages/PaymentPage';
import Search from './pages/Search';
import SellerCenter from './pages/SellerCenter';

function App() {

  const itemCount = useAppSelector((state) => state.product.count)

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/seller-center" element={<SellerCenter />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/edit/:id" element={<Upload />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCart itemCount={itemCount} />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
