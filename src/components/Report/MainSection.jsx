import { useState } from "react";
import BusinessMan from "../../assets/images/business-man.jpg";
import { HiDocument } from "react-icons/hi2";
import { MdAccountBalanceWallet, MdPending } from "react-icons/md";
import { TbPlus } from "react-icons/tb";
import Report from "../Report";
import { useCreateReport } from "../../hooks/report";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const renovationOptions = [
  "Total renovation apparently with no structural damage",
  "Partial renovation apparently with no structural damage",
  "Cosmetic renovation apparently with no structural damage",
  "Apparently no renovation needed",
  "Condition unknown",
];

const MainSection = ({showSidebar,setShowSidebar}) => {
  const [dashboardData] = useState([
    {
      icon: <HiDocument size={23} />,
      name: "Reports Generated",
      number: 110,
    },
    {
      icon: <MdAccountBalanceWallet size={23} />,
      name: "Remaining Credits",
      number: 24,
    },
    {
      icon: <MdPending size={23} />,
      name: "Pending Reports",
      number: 17,
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [comparativeProperties, setComparativeProperties] = useState([]);
  const [errors, setErrors] = useState({});
  const [observations, setObservations] = useState("");
  const [reportModal, setReportModal] = useState(false);
  const navigate=useNavigate()
  const initialFormState = {
    location: "",
    cadastralReference: "",
    link: "",
    squareMeters: "",
    numberOfRooms: "",
    numberOfBathrooms: "",
    floorNumber: "",
    renovation: "",
    announcedPrice: "",
    pricePerMeter: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const {mutate:createReport}=useCreateReport()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        renovation: checked ? value : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "announcedPrice" || name === "squareMeters") {
        const announcedPrice = parseFloat(
          name === "announcedPrice" ? value : formData.announcedPrice
        );
        const squareMeters = parseFloat(
          name === "squareMeters" ? value : formData.squareMeters
        );
        if (announcedPrice && squareMeters) {
          setFormData((prev) => ({
            ...prev,
            pricePerMeter: (announcedPrice / squareMeters).toFixed(2),
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            pricePerMeter: "",
          }));
        }
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.location && !formData.cadastralReference && !formData.link) {
      newErrors.basic = "At least one basic detail must be provided.";
    }
    if (!formData.renovation) {
      newErrors.renovation = "Please select one renovation option.";
    }
    if (formData.announcedPrice && formData.announcedPrice <= 0) {
      newErrors.announcedPrice = "Announced Price must be a positive number.";
    }
    if (formData.squareMeters && formData.squareMeters <= 0) {
      newErrors.squareMeters = "Square meters must be a positive number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    if (validate()) {
      try {
        setIsGenerating(true);
        
        createReport({location:formData.location,cadastralReference:formData.cadastralReference,price:formData.announcedPrice,floorNumber:formData.floorNumber,nbrOfBaths:formData.numberOfBathrooms,renovationDetails:formData.renovation,totalSquareMeter:formData.squareMeters,propertyLink:formData.link,nbrOfRoom:formData.numberOfRooms})
        
      } catch (err) {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className={`lg:ml-[22rem] lg:block flex-grow overflow-scroll bg-slate-100 `}>

      {reportModal && (
        <div className="fixed flex items-center justify-center left-0 z-10 h-screen w-screen bg-[rgba(0,0,0,.6)]">
          <form
            
            className="max-h-[90vh] overflow-y-auto h-[90vh] w-[90vw] md:w-[40rem] p-8 bg-white rounded-md flex flex-col gap-6"
          >
            <h2 className="text-xl font-semibold">Fill required report Info</h2>
            <div className="w-full flex flex-col gap-4">
              <span className="font-semibold">1. Basic Details</span>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Cadastral reference:</label>
                <input
                  type="text"
                  name="cadastralReference"
                  value={formData.cadastralReference}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Property Link:</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                />
              </div>
              {errors.basic && (
                <span className="text-red-500 text-sm">{errors.basic}</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-4">
              <span className="font-semibold">2. Property Details</span>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Square meters m&sup2;:</label>
                <input
                  type="number"
                  name="squareMeters"
                  value={formData.squareMeters}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                  min="0"
                  step="any"
                />
                {errors.squareMeters && (
                  <span className="text-red-500 text-sm">
                    {errors.squareMeters}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Number of rooms:</label>
                <input
                  type="number"
                  name="numberOfRooms"
                  value={formData.numberOfRooms}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                  min="0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Number of bathrooms:</label>
                <input
                  type="number"
                  name="numberOfBathrooms"
                  value={formData.numberOfBathrooms}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                  min="0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Floor Number:</label>
                <input
                  type="number"
                  name="floorNumber"
                  value={formData.floorNumber}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                  min="0"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <span className="font-semibold">3. Renovation Details</span>
              {renovationOptions.map((option, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="renovation"
                    value={option}
                    checked={formData.renovation === option}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <label className="font-semibold">{option}</label>
                </div>
              ))}
              {errors.renovation && (
                <span className="text-red-500 text-sm">
                  {errors.renovation}
                </span>
              )}
            </div>
            <div className="w-full flex flex-col gap-4">
              <span className="font-semibold">4. Price Details</span>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Announced Price:</label>
                <input
                  type="number"
                  name="announcedPrice"
                  value={formData.announcedPrice}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                  min="0"
                  step="any"
                />
                {errors.announcedPrice && (
                  <span className="text-red-500 text-sm">
                    {errors.announcedPrice}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Price per m&sup2;:</label>
                <input
                  type="number"
                  name="pricePerMeter"
                  value={formData.pricePerMeter}
                  readOnly
                  className="p-2 border rounded-md bg-gray-100"
                />
              </div>
            </div>
            {isSearching ? (
              <span>Searching...</span>
            ) : isGenerating ? (
              <span>Generating...</span>
            ) : (
              observations && (
                <div className="w-full flex flex-col gap-4">
                  <label className="font-semibold">
                    Generated Observations:
                  </label>
                  <textarea
                    value={observations}
                    readOnly
                    className="w-full h-[20rem] p-4 border rounded-md"
                  />
                </div>
              )
            )}
            <div className="flex gap-[30px]">
            <button
               
                onClick={()=>{setReportModal(false)}}
              className="mt-4 p-2 bg-slate-300 text-black  w-full rounded-md"
            >
              Cancel
            </button>
              <button
                onClick={handleSubmit}
              type="submit"
              className="mt-4 p-2 w-full bg-primary text-white rounded-md"
            >
              Submit
            </button>
            </div>
           
          </form>
        </div>
      )}
   <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="p-8 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Reports</h2>
          <div className="flex gap-4 items-center">
            <select className="bg-primary text-white cursor-pointer rounded-md p-2.5 outline-none">
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
            </select>
            <button
              onClick={() => setReportModal(true)}
              className="p-4 rounded-full bg-primary text-white"
            >
              <TbPlus size={20} />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <Report />
          <Report />
          <Report />
          <Report />
          <Report />
          <Report />
        </div>
      </div>
    </div>
  );
};

export default MainSection;
