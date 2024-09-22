import { useState } from "react";

import { HiDocument } from "react-icons/hi2";
import { MdAccountBalanceWallet, MdPending } from "react-icons/md";
import { TbPlus } from "react-icons/tb";
import { fillPdf } from "../../utils/fillPdf";
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

const MainSection = () => {
  const paymentData = [
    { id: 1, plan: "Standard Plan - Feb 2022", date: "07 February 2022", amount: 59.00, status: "Complete" },
    { id: 2, plan: "Standard Plan - Jan 2022", date: "09 January 2022", amount: 59.00, status: "Canceled" },
    { id: 3, plan: "Basic Plan - Dec 2021", date: "15 December 2021", amount: 29.00, status: "Complete" },
  ];

  const [payments, setPayments] = useState(paymentData);
  const [sortBy, setSortBy] = useState('Recent');


  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);

    const sortedPayments = [...payments].sort((a, b) => {
      if (value === 'Recent') {
        return new Date(b.date) - new Date(a.date); 
      } else if (value === 'Plan') {
        return a.plan.localeCompare(b.plan); 
      } else if (value === 'Amount') {
        return b.amount - a.amount; 
      } else if (value === 'Status') {
        const statusOrder = { 'Complete': 1, 'Pending': 2, 'Canceled': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });

    setPayments(sortedPayments);
  };

  const exportToCSV = (data, filename = 'payments.csv') => {
    const csvRows = [];
    const headers = ['Invoice', 'Date', 'Amount', 'Status'];
    csvRows.push(headers.join(','));

    data.forEach(payment => {
      const row = [
        payment.plan,
        payment.date,
        `$${payment.amount.toFixed(2)}`,
        payment.status
      ];
      csvRows.push(row.join(','));
    });
    const csvData = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const tempLink = document.createElement('a');
    tempLink.href = window.URL.createObjectURL(csvData);
    tempLink.setAttribute('download', filename);
    tempLink.click();
  };
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
  const [showSidebar,setShowSidebar]=useState(false)
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
    <div className="lg:ml-[22rem] h-full overflow-scroll flex  flex-col flex-grow bg-slate-100">
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
      <div className="flex md:flex-row flex-col flex-wrap gap-[10px] justify-between p-8 w-full">
        {dashboardData.map((el, index) => (
          <div
            key={index}
            className="h-[12rem] lg:w-[32%] w-full gap-8 px-4 py-5 flex bg-white border rounded-md cursor-pointer"
          >
            <div className="h-[4rem] w-[4rem] flex items-center justify-center rounded-md text-white bg-primary">
              {el.icon}
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <span className="text-[gray] text-lg">{el.name}</span>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold">{el.number}</span>
                <span>
                  <span className="text-[green] font-bold">+24</span> in the
                  last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto w-full mt-8 px-[10px] md:px-[40px]">
          <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
            <p className="flex-1 text-base font-bold text-gray-900">Latest Payments</p>

            <div className="mt-4 sm:mt-0">
              <div className="flex items-center justify-start sm:justify-end">
                <div className="flex items-center">
                  <label className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900">Sort by:</label>
                  <select onChange={handleSort} value={sortBy} className="sm:mr-4 py-[10px] block w-full rounded-lg border p-1 text-base outline-none focus:shadow sm:text-sm">
                    <option value="Recent">Recent</option>
                    <option value="Plan">Plan</option>
                    <option value="Amount">Amount</option>
                    <option value="Status">Status</option>
                 
                  </select>
                </div>

                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                  onClick={() => exportToCSV(payments)}
                >
                  <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export to CSV
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white overflow-hidden rounded-xl border shadow">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Invoice</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Date</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Amount</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Status</td>
                </tr>
              </thead>
              <tbody className="lg:border-gray-300">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">{payment.plan}</td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{payment.date}</td>
                    <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 lg:text-left">${payment.amount.toFixed(2)}</td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      <div className={`inline-flex items-center rounded-full ${payment.status === 'Complete' ? 'bg-blue-600' : payment.status === 'Canceled' ? 'bg-red-200' : 'bg-blue-200'} py-2 px-3 text-xs text-white`}>
                        {payment.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      <div className="p-8 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Reports</h2>
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
