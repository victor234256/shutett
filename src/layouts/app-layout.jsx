import Header from "@/components/header";
import { Copyright, FacebookIcon, Github, LinkedinIcon, X } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <>
      <div>
        <main className="min-h-screen container">
          <Header />
          <Outlet />
        </main>

        <div className="text-center mt-10 bg-slate-600 text-white">
          <div className="flex flex-row gap-5 justify-center py-4 items-center">
            <Link to={"https://github.com/victor234256?tab=repositories"}>
              <Github className="bg-gray-900 border-4 border-white p-1 rounded-full size-9" />
            </Link>
            <Link to={"https://facebook.com"}>
              <FacebookIcon className="bg-gray-900 border-4 border-white p-1 rounded-full size-9" />
            </Link>
            <Link to={"https://x.com"}>
              {" "}
              <X className="bg-gray-900 border-4 border-white p-1 rounded-full size-9" />
            </Link>
            <Link to={"https://www.linkedin.com/in/jimoh-victor-omeiza/"}>
              <LinkedinIcon className="bg-gray-900 border-4 border-white p-1 rounded-full size-9" />
            </Link>
          </div>
          <div className="bg-black">
            <p className="flex flex-row justify-center mt-5 items-center text-md font-bold py-1">
              <span>
                <Copyright />
              </span>
              Copyright {year}; Designed by Victor Omeiza
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
