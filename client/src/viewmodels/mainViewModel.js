import { login, signup } from "../models/authModel";

export const useMainViewModel = () => {
  const handleLogin = async (email, password) => {
    return await login(email, password);
  };

  const handleSignup = async (data) => {
    return await signup(data);
  };

  return { handleLogin, handleSignup };
};
