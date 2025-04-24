import { useState, useEffect } from "react";
import { getAdmin } from "../../services/apiServices";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Cookies from "js-cookie";

interface adminType {
  fullname: string;
  email: string;
}

export default function AdminProfilePage() {
  const [admin, setAdmin] = useState<adminType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const response = await getAdmin();
        if (response.data.data) {
          setAdmin(response.data.data);
        } else {
          setError("Failed to fetch admin data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-1 items-center justify-center h-screen bg-background">
        <Skeleton className="w-full max-w-md h-20" />
        <Skeleton className="w-full max-w-md h-20" />
        <Skeleton className="w-full max-w-md h-20" />
        <Skeleton className="w-full max-w-md h-20" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl">
              {admin?.fullname
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              {admin?.fullname}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {admin?.email}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2 p-3 rounded-md bg-secondary/20">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              Administrator
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button
            variant="destructive"
            className="w-full flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>

          {/* 
          Commented Edit Password button - uncomment when needed
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center" 
          >
            <Settings className="mr-2 h-4 w-4" />
            Edit Password
          </Button>
          */}
        </CardFooter>
      </Card>
    </div>
  );
}
