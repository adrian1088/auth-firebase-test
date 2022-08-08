import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Test from "./pages/Test";

const App = () => {
  return (
    <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
