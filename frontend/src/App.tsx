import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/dashboard/page";
import Login from "./pages/login/page";

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
      
    </Router>
  );
};

export default App;