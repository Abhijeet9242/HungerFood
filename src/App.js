import logo from "./logo.svg";
import "./App.css";
import RestaurantDetails from "./components/RestaurantDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <h4>hunger food</h4>
      <Navbar />
      {/* <h1 style={{ textAlign: "center" }}>Hungry Food</h1> */}
      <RestaurantDetails />
    </div>
  );
}

export default App;
