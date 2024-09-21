import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { useAuth } from "../auth/AuthContext.jsx";

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Ingrese su email");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Ingrese su contraseña");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    try {
      await login(email, password);
    } catch (err) {
      if (err.message.includes("invalid email")) {
        setEmailError("Invalid email");
      } else if (err.message.includes("invalid password")) {
        setPasswordError("Invalid password");
      } else {
        setEmailError("Incorrect information");
        setPasswordError("Please, check your information.");
      }
    }
  };

  return (
    <>
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md mx-3 justify-center mt-6">
        <h1 className="text-customGreen text-2xl my-5 font-cinzel font-medium">Login</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <Input
            type="email"
            label="Email"
             variant="underlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`max-w-md my-5 ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
            isRequired
            isInvalid={!!emailError}
            errorMessage={emailError}
            css={{ borderColor: emailError ? '#f87171' : '#d1d5db' }} // Tailwind colors for red and gray
          />
          <Input
            type="password"
            label="Password"
            variant="underlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`max-w-md my-5 ${
              passwordError ? 'border-red-500' : 'border-gray-300'
            }`}
            isRequired
            isInvalid={!!passwordError}
            errorMessage={passwordError}
            css={{ borderColor: passwordError ? '#f87171' : '#d1d5db' }} 
          />
          <button
            type="submit"
            className="w-full my-4  h-[44px] self-end border border-[#1F352C] rounded-md text-[#1F352C] bg-transparent hover:bg-[#1F352C] hover:text-white font-semibold transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </>
    
  );
};

export default Login;

