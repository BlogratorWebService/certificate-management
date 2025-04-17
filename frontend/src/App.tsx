import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/dashboard/page";
import Login from "./pages/login/page";
import NewStudent from "./pages/new/page";
import StudentPage from "./pages/student/page";
import PrivateRoute from "./components/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/new" element={<NewStudent />} />
            <Route
              path="/student/:registrationNumber"
              element={<StudentPage />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
