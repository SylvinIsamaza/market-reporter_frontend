import React from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import routes from "@/routes/userroutes";
import { useAuth } from "@/hooks/auth";
import toast from "react-hot-toast";


export default function User(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const { data, isLoading, isError, error } = useAuth();
  const navigate=useNavigate()
  React.useEffect(() => {

    if (isError && !isLoading) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      navigate("/login");
    }
 
  }, [isError, isLoading, error, navigate]);


  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
  
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Dashboard";
    for (let i = 0; i < routes.length; i++) {
      
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
      
        setCurrentRoute(routes[i].name);
      }
     
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if ((prop.layout === "/user"||prop.layout=="/")) {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      {isLoading?<div className="w-full h-screen flex items-center justify-center">Loading...</div>:      <div className="flex h-[100vh] overflow-hidden w-full">
      <Sidebar routes={routes} open={open} onClose={() => setOpen(false)} />
     
      <div className="h-full w-full overflow-auto bg-lightPrimary dark:!bg-navy-900">
       
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[240px]`}
        >
          
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Estatio "}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto  p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/" replace />}
                />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>}
   
    </>
 
  );
}
