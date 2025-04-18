import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const MainLayout = () => {

  return (
    <div className="w-full flex h-screen">
      <AppSidebar />
      <main
        className={`flex-grow p-4 transition-all duration-300`}
      >
        <SidebarTrigger />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
