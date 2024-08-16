import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/login";
import Signup from "@/components/signup";
import { UrlState } from "@/context";

const Authenticate = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();
  const { isUserAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isUserAuthenticated && !loading)
      navigate(`/homePage?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isUserAuthenticated, loading]);

  return (
    <div className="flex flex-col items-center gap-8 mt-22">
      <h1 className="sm:text-4xl md:text-4xl text-5xl font-bold">
        {longLink
          ? "Needs to track your activity, Please Login..."
          : "Login / Signup"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px] mt-8 container">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Authenticate;
