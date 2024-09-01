import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import { BookProvider } from "./Context/BookContext";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddBook from "./pages/AddBook";
import ReturnBook from "./pages/ReturnBook";
import Footer from "./components/common/Footer"

function App() {
  return (
    <BookProvider>
        <div className="App w-screen min-h-screen flex flex-col font-inter bg-white">
          <Navbar />
          <div className="h-[120px]"></div>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/AddBook" element={<AddBook/>}/>
            <Route path="/ReturnBook" element={<ReturnBook/>}/>
          </Routes>
        <Footer/>
        </div>
        
    </BookProvider>
  );
}

export default App;
