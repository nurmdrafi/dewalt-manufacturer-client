import "./App.css";
import Navbar from "./components/Shared/Navbar";
import Index from "./routes";

function App() {
  return (
    <div>
      <div className="bg-primary">
        <Navbar />
      </div>
      <Index />
    </div>
  );
}

export default App;
