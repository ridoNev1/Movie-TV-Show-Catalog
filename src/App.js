import "./App.css";
import NavigationList from "./routes/mainNavigation";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components";

// need change code if the app need auth
const isAuth = false;

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <Routes>
          {NavigationList.map((el, index) => (
            <Route
              path={el.path}
              exact={el.exact ? true : false}
              element={
                el.permission ? (
                  isAuth ? (
                    el.component
                  ) : (
                    <Navigate to="/" />
                  )
                ) : (
                  el.component
                )
              }
              key={index}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
