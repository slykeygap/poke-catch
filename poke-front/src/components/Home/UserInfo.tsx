import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import avatar from "../../assets/avatars/10.png";
import "../../css/button.css";
import "../../css/cards.css";
import { useUser } from "../../context/userContext";

const UserInfo = () => {
  const {user} = useUser()
  if(!user) {
    console.error("User not found")
    return
  }
  
  return (
    <div
      className="h-[30%] mb-2 p-3 bg-[#D9D9D9]"
      style={{
        borderRadius: "0px 0px 15px 15px",
        width: "100%",
      }}
    >
      <div className="mt-5 w-full md:w-3/4 flex text-3xl">
        <span className="card w-full text-gray-400 bg-white flex items-center py-[5px] px-[10px]">
          <img
            src={avatar}
            alt="profile"
            className="w-8 h-8 object-cover mr-2"
          />
          {user.displayName}
        </span>
        <button className="botones ml-[-25px] px-[3px] py-[3px]">
          <LogoutIcon className="" fontSize="large" />
        </button>
      </div>
      <div className="card mt-3 lg:flex flex-col justify-between items-start py-[5px] px-[10px] ">
        <div className="flex w-full md:w-3/4 xl:w-1/2 justify-between items-center">
          <h3 className="text-lg md:text-xl text-gray-400">Catch remaining:</h3>
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-black text-lg font-bold">
            {user.dailyCatches}
          </span>
        </div>
        <div className="flex w-full md:w-3/4 xl:w-1/2 justify-between items-center">
          <h3 className="text-lg md:text-xl text-gray-400">Masterball remaining:</h3>
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-black text-lg font-bold">
            {user.masterBalls}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
