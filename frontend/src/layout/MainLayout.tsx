import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const MainLayout = () => {
  return (
    <div className="w-full flex flex-col h-screen">
      <AppSidebar />
          <SidebarTrigger />
          
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
