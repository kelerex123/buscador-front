import { Navigate, Route, Routes } from "react-router-dom";
import { AñadirScreen } from "./components/AñadirScreen";
import { ModificarScreen } from "./components/ModificarScreen";
import { Navbar } from "./components/Navbar";
import { TablaScreen } from "./components/TablaScreen";
import React from "react";
import { useState } from "react";

export const ProductsContext = React.createContext();

const App = () => {

  const [products, setProducts] = useState([])

  return (
    <>
      
      <Navbar />
      <div className="container">

      <ProductsContext.Provider value={{products,setProducts}}>
        <Routes>
          <Route path="/tabla" element={<TablaScreen />} />
          <Route path="/anadir" element={<AñadirScreen />} />
          <Route path="/modificar/:id" element={<ModificarScreen />} />
          <Route path='*' element={<Navigate replace to='/tabla' />}/>
        </Routes>
      </ProductsContext.Provider>
      </div>

    </>
    


  );
}

export default App;
