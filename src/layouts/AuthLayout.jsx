import Auth from "../assets/images/auth.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen w-full flex">
      <div className="800:w-1/2 800:block hidden">
        <img src={Auth} className="h-full  w-full object-cover brightness-50" />
      </div>
      <div className="800:w-1/2  w-full  flex flex-col items-center justify-center bg-slate-100">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
