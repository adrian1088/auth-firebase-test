import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Test from "./pages/Test";

import { AuthProvider } from "./AuthProvider";

const App = () => {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
