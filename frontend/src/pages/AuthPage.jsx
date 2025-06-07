import { useState } from 'react'
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? <LoginForm setShowLogin={setShowLogin} /> : <RegisterForm setShowLogin={setShowLogin} />}
    </>
  )
}

export default AuthPage