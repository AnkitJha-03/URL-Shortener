import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return <>{showLogin ? <LoginForm setShowLogin={setShowLogin} /> : <RegisterForm setShowLogin={setShowLogin} />}</>;
};

export default AuthPage;
