import "./App.css";
import ProductRegisterForm from "./components/ProductRegisterForm";
// import ProductRecords from "./components/ProductRecords";
import TableForm from "./components/TableForm";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Product Management</h1>
      </div>
      <div className="container">
        <ProductRegisterForm />
      </div>
      <div className="Seprator">
        <h3>Available Product Data</h3>
      </div>
      <div>
        <TableForm />
      </div>
    </div>
  );
}

export default App;
