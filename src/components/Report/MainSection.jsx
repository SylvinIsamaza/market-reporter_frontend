import { useEffect, useState } from "react";
import { HiDocument } from "react-icons/hi2";
import { MdAccountBalanceWallet, MdPending } from "react-icons/md";
import { TbPlus } from "react-icons/tb";
import Report from "../Report";
import { useCreateReport, useGetReports } from "../../hooks/report";
import Header from "../Header";

const renovationOptions = [
  "Total renovation apparently with no structural damage",
  "Partial renovation apparently with no structural damage",
  "Cosmetic renovation apparently with no structural damage",
  "Apparently no renovation needed",
  "Condition unknown",
];

const MainSection = ({ showSidebar, setShowSidebar }) => {
  const { data: reports, isLoading: reportLoading, error: reportError } = useGetReports();
  const [dashboardData] = useState([
    { icon: <HiDocument size={23} />, name: "Reports Generated", number: 110 },
    { icon: <MdAccountBalanceWallet size={23} />, name: "Remaining Credits", number: 24 },
    { icon: <MdPending size={23} />, name: "Pending Reports", number: 17 },
  ]);

  const [formData, setFormData] = useState({
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
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [errors, setErrors] = useState({});
  const { mutate: createReport } = useCreateReport();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? value : "") : value,
    }));

    if (["announcedPrice", "squareMeters"].includes(name)) {
      const price = parseFloat(name === "announcedPrice" ? value : formData.announcedPrice);
      const squareMeters = parseFloat(name === "squareMeters" ? value : formData.squareMeters);

      setFormData((prev) => ({
        ...prev,
        pricePerMeter: price && squareMeters ? (price / squareMeters).toFixed(2) : "",
      }));
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
    if (validate()) {
      setIsGenerating(true);
      try {
        createReport({
          location: formData.location,
          cadastralReference: formData.cadastralReference,
          price: formData.announcedPrice,
          floorNumber: formData.floorNumber,
          nbrOfBaths: formData.numberOfBathrooms,
          renovationDetails: formData.renovation,
          totalSquareMeter: formData.squareMeters,
          propertyLink: formData.link,
          nbrOfRoom: formData.numberOfRooms,
        });
        setReportModal(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  if (reportLoading) return <div>Loading...</div>;
  if (reportError) return <div>Error: {reportError.message}</div>;

  return (
    <div className="flex flex-col flex-grow bg-slate-100">
      {reportModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,.6)]">
          <form
            onSubmit={handleSubmit}
            className="max-h-[90vh] overflow-y-auto h-[90vh] w-[90vw] md:w-[40rem] p-8 bg-white rounded-md flex flex-col gap-6"
          >
            <h2 className="text-xl font-semibold">Fill required report Info</h2>
            {/* Basic Details */}
            <div className="flex flex-col gap-4">
              <label className="font-semibold">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="p-2 border rounded-md"
              />
              <label className="font-semibold">Cadastral Reference:</label>
              <input
                type="text"
                name="cadastralReference"
                value={formData.cadastralReference}
                onChange={handleChange}
                className="p-2 border rounded-md"
              />
              <label className="font-semibold">Property Link:</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="p-2 border rounded-md"
              />
              {errors.basic && <span className="text-red-500 text-sm">{errors.basic}</span>}
            </div>
            {/* Property Details */}
            {/* Similar to above structure */}
            {/* Submit and Cancel Buttons */}
          </form>
        </div>
      )}

      <div className="p-8 flex flex-col gap-10">
        {/* Dashboard */}
        <div className="flex justify-between items-center">
          <div></div>
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
        {/* Reports List */}
        <div className="flex flex-wrap gap-5">
          {reports?.length > 0 ? (
            reports.map((report) => <Report key={report.id} report={report} />)
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-[300px]">
              <img src="/no_report.png" alt="No Reports" className="h-[200px]" />
              <p className="text-[20px] font-[500]">No reports available</p>
              <button
                onClick={() => setReportModal(true)}
                className="mt-4 p-2 bg-primary text-white rounded-md"
              >
                Generate Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
