import { useState } from "react";
import { LoginForm } from "./login-form";
import { loginAdmin } from "@/services/apiServices";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface loginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");
  if (token) {
    window.location.href = "/";
  }

  const navigate = useNavigate();
  const [admin, setAdmin] = useState<loginForm>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginAdmin(admin);
      const token = res.data.data.token;
      Cookies.set("token", token, { expires: 1 });
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  //     return (
  //     <div className="flex min-h-screen w-full items-center justify-center">
  //       {/* Modern background with gradient and shapes */}
  //       <div className="fixed inset-0 z-0">
  //         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>
  //         <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
  //         <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
  //         <div className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-pink-500 opacity-20 blur-3xl"></div>
  //       </div>

  //       {/* Content layer */}
  //       <div className="z-10 w-full max-w-md px-4">
  //         <LoginForm
  //           admin={admin}
  //           handleChange={handleChange}
  //           handleSubmit={handleSubmit}
  //           className="backdrop-blur-sm"
  //         />
  //       </div>
  //     </div>
  //   );

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background text-foreground">
      {/* Modern dark gradient background with shapes */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-slate-800"></div>
        <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-indigo-900 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-purple-900 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-teal-900 opacity-20 blur-3xl"></div>
      </div>

      {/* Content layer */}
      <div className="z-10 w-full max-w-md px-4">
        <LoginForm
          admin={admin}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          className="backdrop-blur-sm"
          loading={loading}
        />
      </div>
    </div>
  );

  // return (
  //   <div className="flex min-h-screen w-full items-center justify-center bg-background text-foreground overflow-hidden">
  //     {/* Background layer */}
  //     <div className="fixed inset-0 z-0">
  //       {/* Gradient base */}
  //       <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-neutral-900" />

  //       {/* Abstract shapes */}
  //       <div className="absolute -top-10 -left-10 h-96 w-96 rounded-full bg-emerald-800 opacity-20 blur-3xl" />
  //       <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-cyan-800 opacity-20 blur-3xl" />
  //       <div className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-amber-800 opacity-10 blur-3xl" />
  //     </div>

  //     {/* Foreground content */}
  //     <div className="z-10 w-full max-w-md px-4 animate-fade-in backdrop-blur-sm">
  //       <LoginForm
  //         admin={admin}
  //         handleChange={handleChange}
  //         handleSubmit={handleSubmit}
  //       />
  //     </div>
  //   </div>
  // );
};

export default LoginPage;
