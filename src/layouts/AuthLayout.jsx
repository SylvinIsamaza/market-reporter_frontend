import Auth from "../assets/images/auth.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen w-full flex">
      <div className="800:w-1/2 800:block hidden">
        <img src={Auth} className="h-full w-full object-cover brightness-50" />
      </div>
      <div className="800:w-1/2 bg-gray-200 w-full  flex p-0 flex-col justify-center items-center  overflow-auto h-screen">
        <div className="w-full flex justify-center items-center md:px-3 overflow-auto md:py-[20px] h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
