import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollaborativePage from "./pages/CollaborativePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CollaborativePage />} />
      </Routes>
    </Router>
  );
}

export default App;
