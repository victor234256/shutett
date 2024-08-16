import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div>
        <main className="min-h-screen container">
          <Header />
          <Outlet />
        </main>

        <div className="p-8 text-center mt-10 bg-slate-600 text-white">
          Made by Victor Omeiza
        </div>
      </div>
    </>
  );
};

export default AppLayout;
