
import General from "./components/General";


const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
     
        <div className="col-span-12 lg:col-span-12 lg:mb-0 3xl:col-span-12">
          <General />
          
        </div>

    
      </div>
    </div>
  );
};

export default ProfileOverview;
