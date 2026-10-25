import {useNavigate} from 'react-router-dom';
import type { SyntheticEvent } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();

  const handleOnSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/dashboard");
  }
  
  const googleLogin = async(credential: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ credential }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google login failed");
      }

      localStorage.setItem("googleUsers", JSON.stringify(data.user));

      console.log("Logged in user:", data.user);

      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed. Please try again.");
    }
  }

  return (
    <>
    <div className='loginpage'>
      <form className="loginform border-2 border-gray-200" onSubmit={handleOnSubmit}>
        <h1>Login</h1>

        <div className="google-button rounded-xl bg-green-100 h-10  flex gap-2.5 items-center justify-center">
          <GoogleLogin
            onSuccess={(response) => {
              if (response.credential) {
                googleLogin(response.credential);
              }
            }}
            onError={() => {
              alert("Login failed");
            }}
          />
        </div>

        <div className="items-center gap-3 flex">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-400">or signup through email</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <input type="email" name="email" placeholder="Email ID" required className="rounded-md bg-gray-200 h-10 w-auto" />
        <input type="password" name="password" placeholder="Password" required className="rounded-md bg-gray-200 h-10 w-auto" />

        <button type='submit' className=" login-button rounded-md bg-green-600 h-9 w-auto text-white text-lg items-center">Login</button>
      </form>
    </div>
      
    </>
  );
}

export default Login;
