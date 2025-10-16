// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged, type User } from "firebase/auth";

import { Navigate, useNavigate } from "react-router-dom";
import ScreenGame from "../components/Home/ScreenGame";
import UserInfo from "../components/Home/UserInfo";
import PlayButton from "../components/Home/PlayButton";
import Pokedex from "../components/Home/Pokedex";
import { useUser } from "../context/userContext";

export default function Home() {
  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      console.log("Guest logout");
    }

    sessionStorage.removeItem("guestSession");
    setUser(null)
    navigate("/");
  };

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center w-full h-[95vh] px-4">
        <div className="w-full h-[100%] md:w-1/2 flex flex-col justify-center items-center">
          <div className="w-full h-[100%] lg:w-3/4 relative">
            <ScreenGame />
            <div style={{position: 'absolute', background:'#d9d9d9', width:'100%', height:'45px', bottom:'26%', zIndex:'-1'}}></div>
            <UserInfo />
          </div>
        </div>

        <div className="w-full h-[100%] md:w-1/2 flex flex-col justify-center items-center mt-5 md:mt-0">
          <div className="w-full h-[100%] lg:w-3/4">
            <Pokedex />
          </div>
        </div>
        <button
          className="h-30 w-30"
          onClick={async () => {
          console.log(user)
          }}
        >
          Test
        </button>
        <button
          className="h-30 w-30"
          onClick={logout}
        >
          OUT
        </button>
      </div>
    </div>
  );
}
