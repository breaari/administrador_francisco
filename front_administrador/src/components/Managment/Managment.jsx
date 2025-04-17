import React from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";
import UserAuthentication from "../../userAuthentication";

export const Managment = () => {
  return (
    <>
    
      <div className="flex min-h-screen">
        <Menu />
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};
