import { useEffect, useState } from "react";

import { HiDocument } from "react-icons/hi2";
import { MdAccountBalanceWallet, MdPending } from "react-icons/md";
import { TbPlus } from "react-icons/tb";

import Report from "../Report";
import { useCreateReport, useGetReports } from "../../hooks/report";
import Header from "../Header";
import { Combobox } from "../Combobox";
import {
  useFetchCallejero,
  useFetchMunicipios,
  useFetchProvincias,
} from "../../hooks/address";
import { interestedServices } from "../../data/static";
import { useFetchTransaction } from "@/hooks/transaction";
import TransactionTable from "@/components/table/TransactionTable";
import { useFetchUserDashboardData } from "@/hooks/analytic";
import { formatDateToCustomString } from "@/utils/formatter";

const renovationOptions = [
  "TOTAL APARENTEMENTE SIN DAÑOS ESTRUCTURALES",
  "PARCIAL APARENTEMENTE SIN DAÑOS ESTRUCTURALES",
  "LAVADO DE CARA APARENTEMENTE SIN DAÑOS ESTRUCTURALES",
  "APARENTEMENTE NO NECESITA REFORMA",
  "SE DESCONOCE EL ESTADO",
];

const MainSection = () => {
  const {
    provinces,
    loading: provincesLoading,
    error: provincesError,
  } = useFetchProvincias();
  const [selectedProvince, setSelectedProvince] = useState("");
  const {
    municipios,
    loading: municipiosLoading,
    error: municipiosError,
  } = useFetchMunicipios(selectedProvince);
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const {
    streets,
    loading: streetsLoading,
    error: streetsError,
  } = useFetchCallejero(selectedProvince, selectedMunicipio);
  const [selectedStreet, setSelectedStreet] = useState("");
  const { data: dashboardInfo, isLoading, error } = useFetchUserDashboardData();

  const [errors, setErrors] = useState({});

  const [reportModal, setReportModal] = useState(false);
  const [numero, setNumero] = useState("");
  const [planta, setPlanta] = useState("");
  const [puerta, setPuerta] = useState("");
  const [escalera, setEscalera] = useState("");
  const [bloque, setBloque] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Basic Details", "Property Details", "Interested Services"];
  const [services, setServices] = useState({});
  const initialFormState = {
    location: "",
    cadastralReference: "",
    link: "",
    squareMeters: 0,
    numberOfRooms: "",
    numberOfBathrooms: "",
    floorNumber: "",
    renovation: "",
    announcedPrice: 0,
    pricePerMeter: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  console.log("reached here");
  const { mutate: createReport } = useCreateReport();
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

  const handleServiceChange = (name, value) => {
    setServices((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (
      ((!numero && !streets && !selectedMunicipio && !selectedProvince) ||
        !formData.cadastralReference) &&
      currentStep == 1
    ) {
      newErrors.basic =
        "At least one of location or cadastral reference  must be provided.";
    }

    if (!formData.renovation && currentStep === 2) {
      newErrors.renovation = "Please select one renovation option.";
    }

    if (
      formData.announcedPrice &&
      formData.announcedPrice <= 0 &&
      currentStep === 2
    ) {
      newErrors.announcedPrice = "Announced Price must be a positive number.";
    }
    if (
      formData.squareMeters &&
      formData.squareMeters <= 0 &&
      currentStep === 2
    ) {
      newErrors.squareMeters = "Square meters must be a positive number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const {
    data: reports,
    isLoading: reportLoading,
    error: reportError,
  } = useGetReports();

  if (reportLoading) {
    return <div>Loading....</div>;
  }

  if (reportError) {
    return <div>Error: {reportError.message}</div>;
  }
  console.log(reports);

  const handleSubmit = async (e) => {
    if (currentStep != 4) {
      if (validate(currentStep)) {
        setCurrentStep((curr) => curr + 1);
      }
    } else {
      e.preventDefault();
      if (validate()) {
        try {
          const location = `${selectedStreet} ${
            numero ? `Es:${escalera} ` : ""
          }${bloque ? `B:${bloque} ` : ""}${planta ? `Pl:${planta} ` : ""}${
            puerta ? `Pt:${puerta} ` : ""
          }${selectedMunicipio} (${selectedProvince})`.trim();
          createReport({
            street: streets,
            numero: numero,
            escalera,
            planta,
            puerta,
            bloque,
            municipios: selectedMunicipio,
            province: selectedProvince,

            cadastralReference: formData.cadastralReference,
            price: parseInt(formData.announcedPrice),
            floorNumber: formData.floorNumber,
            nbrOfBaths: formData.numberOfBathrooms,
            renovationDetails: formData.renovation,
            totalSquareMeter: formData.squareMeters,
            propertyLink: formData.link,
            nbrOfRoom: formData.numberOfRooms,
            servicesThatMayInterestYou: services,
          });
        } catch (err) {
          console.log(error.message);
        }
      }
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div className="w-full flex items-center justify-center h-[calc(100vh-100px)]">
        {error?.message || "An error occurred."}
      </div>
    );
  }

  const dashboardData = [
    {
      icon: <HiDocument size={23} />,
      name: "Reports Generated",
      number: dashboardInfo ? dashboardInfo.totalReportsGenerated : 0,
    },
    {
      icon: <MdAccountBalanceWallet size={23} />,
      name: "Remaining Credits",
      number: dashboardInfo ? dashboardInfo.remainingCredits : 0,
    },
    {
      icon: <MdPending size={23} />,
      name: "Plan Expiry Date",
      number: dashboardInfo
        ? new Date(dashboardInfo.planExpiryDate.expiresAt).toLocaleDateString()
        : "Not subscribed",
    },
  ];

  return (
    <>
      {dashboardInfo && (
        <div className=" flex bg-transparent flex-col flex-grow bg-slate-100">
          {reportModal && (
            <dialog className="fixed flex items-center justify-center left-0 z-[300] !h-screen mt-[-100px] w-screen bg-[rgba(0,0,0,.6)]">
              <div className="md:max-h-[90vh] overflow-y-auto h-screen w-[100vw] lg:w-[calc(100vw-600px)] md:w-[80%] dark:text-white lg:min-w-[600px] max-w-[950px] p-8 bg-white dark:bg-navy-900 rounded-md flex flex-col gap-6">
                <h2 className="text-xl font-semibold">
                  Fill required report Info
                </h2>
                <ol className="flex items-center   w-full text-sm text-gray-500 font-medium sm:text-base">
                  {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCurrent = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                      <li
                        key={index}
                        onClick={() => {
                          if (currentStep < stepNumber) {
                            if (validate(currentStep)) {
                              setCurrentStep(stepNumber);
                            }
                          } else {
                            setCurrentStep(stepNumber);
                          }
                        }}
                        className={`cursor-pointer flex w-full  items-center ${
                          isCompleted ? "text-indigo-600" : "text-gray-600"
                        } sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:bllock after:mx-4 xl:after:mx-8`}
                      >
                        <div className="flex md:flex-row flex-col items-center whitespace-nowrap  sm:after:hidden after:mx-2">
                          <span
                            className={`w-6 h-6 dark:border-none border rounded-full flex justify-center items-center mr-3 lg:w-10 lg:h-10 ${
                              isCompleted
                                ? "bg-indigo-600 dark:bg-navy-200 dark:text-gray-800  text-white dr border-indigo-200"
                                : isCurrent
                                ? "bg-indigo-600 dark:bg-navy-200 dark:text-gray-800  text-white"
                                : "bg-gray-100 dark:bg-navy-700 border-gray-200"
                            }`}
                          >
                            {stepNumber}
                          </span>
                          <p className="text-center dark:text-navy-200 text-wrap md:w-fit">
                            {step}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
                {currentStep == 1 && (
                  <div className="w-full flex flex-col gap-4">
                    <p className="font-bold text-[20px]">Location</p>

                    <div className="flex md:flex-row flex-col items-start gap-[10px]">
                      {/* Province Selector */}
                      <div className="w-full">
                        <label className="font-[600] text-[16px]">
                          Province
                        </label>
                        <Combobox
                          label="Province"
                          options={provinces}
                          value={selectedProvince}
                          setValue={setSelectedProvince}
                          isLoading={provincesLoading}
                          error={provincesError}
                        />
                      </div>

                      {/* Municipio Selector */}
                      <div className="w-full">
                        <label className="font-[600] text-[16px]">
                          Municipio
                        </label>
                        <Combobox
                          label="Municipio"
                          options={municipios}
                          value={selectedMunicipio}
                          setValue={setSelectedMunicipio}
                          isLoading={municipiosLoading}
                          error={municipiosError}
                          disabled={!selectedProvince}
                        />
                      </div>
                    </div>

                    <div className="flex md:flex-row flex-col items-start gap-[10px]">
                      <div className="flex w-full flex-col gap-2">
                        <label className="font-[600] text-[16px]">Street</label>
                        <Combobox
                          label="Street"
                          options={streets}
                          value={selectedStreet}
                          setValue={setSelectedStreet}
                          isLoading={streetsLoading}
                          error={streetsError}
                          disabled={!selectedMunicipio}
                        />
                      </div>

                      <div className="flex w-full flex-col gap-2">
                        <label className="font-semibold">Numero:</label>
                        <input
                          type="text"
                          name="numero"
                          value={numero || ""}
                          onChange={(e) => setNumero(e.target.value)}
                          className="p-2 border rounded-md"
                        />
                      </div>
                    </div>

                    <div className="md:flex grid grid-cols-2 items-center  gap-[10px]">
                      <div className="flex  w-full min-w-[100px] flex-col gap-2">
                        <label className="font-semibold">Bloque:</label>
                        <input
                          type="text"
                          name="bloque"
                          value={bloque || ""}
                          onChange={(e) => setBloque(e.target.value)}
                          className="p-2 border rounded-md"
                        />
                      </div>
                      <div className="flex  w-full min-w-[100px] flex-col gap-2">
                        <label className="font-semibold">Escalera:</label>
                        <input
                          type="text"
                          name="escalera"
                          value={escalera || ""}
                          onChange={(e) => setEscalera(e.target.value)}
                          className="p-2 border rounded-md"
                        />
                      </div>
                      <div className="flex  w-full min-w-[100px]  flex-col gap-2">
                        <label className="font-[600] text-[16px]">Planta</label>
                        <input
                          type="text"
                          name="planta"
                          value={planta || ""}
                          onChange={(e) => setPlanta(e.target.value)}
                          className="p-2 border rounded-md"
                        />
                      </div>
                      <div className="flex  w-full min-w-[100px]  flex-col gap-2">
                        <label className="font-semibold">Puerta:</label>
                        <input
                          type="text"
                          name="puerta"
                          value={puerta || ""}
                          onChange={(e) => setPuerta(e.target.value)}
                          className="p-2 border rounded-md"
                        />
                      </div>
                    </div>

                    {/* Cadastral Reference */}
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Cadastral reference:
                      </label>
                      <input
                        type="text"
                        name="cadastralReference"
                        value={formData.cadastralReference}
                        onChange={handleChange}
                        className="p-2 border rounded-md"
                      />
                    </div>

                    {/* Property Link */}
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
                      <span className="text-red-500 text-sm">
                        {errors.basic}
                      </span>
                    )}
                  </div>
                )}
                {currentStep == 2 && (
                  <>
                    <div className="w-full flex flex-col gap-4">
                      <span className="font-semibold">Property Details</span>
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold">
                          Square meters m&sup2;:
                        </label>
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
                        <label className="font-semibold">
                          Number of rooms:
                        </label>
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
                        <label className="font-semibold">
                          Number of bathrooms:
                        </label>
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
                      <span className="font-semibold">Renovation Details</span>
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
                      <span className="font-semibold"> Price Details</span>
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold">
                          Announced Price:
                        </label>
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
                        <label className="font-semibold">
                          Price per m&sup2;:
                        </label>
                        <input
                          type="number"
                          name="pricePerMeter"
                          value={formData.pricePerMeter}
                          readOnly
                          className="p-2 border rounded-md bg-gray-100"
                        />
                      </div>
                    </div>
                  </>
                )}
                {currentStep == 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    {interestedServices.slice(0, 9).map((service, index) => (
                      <div
                        className={`p-[20px]  bg-slate-100 flex flex-col justify-between items-center h-[240px] rounded-md`}
                      >
                        <img
                          src={service.image}
                          className={`w-[100px] ${
                            index == 0 ? "rounded-full" : ""
                          } h-[100px]`}
                        />
                        <p>{service.label}</p>
                        <input
                          value={services[service.value]}
                          onChange={(e) => {
                            handleServiceChange(service.value, e.target.value);
                          }}
                          name={service.value}
                          placeholder={service.label}
                          className="px-[20px] w-full py-[10px] border border-slate-300 rounded-md"
                        ></input>
                      </div>
                    ))}
                  </div>
                )}
                {currentStep == 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    {interestedServices.slice(9, 17).map((service) => (
                      <div
                        className={`p-[20px]  bg-slate-100 flex flex-col justify-between items-center h-[240px] rounded-md`}
                      >
                        <img
                          src={service.image}
                          className={`w-[100px]  h-[100px]`}
                        />
                        <p>{service.label}</p>
                        <input
                          value={services[service.value]}
                          onChange={(e) => {
                            handleServiceChange(service.value, e.target.value);
                          }}
                          name={service.value}
                          placeholder={service.label}
                          className="px-[20px] w-full py-[10px] border border-slate-300 rounded-md"
                        ></input>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:gap-[30px] gap-[5px]">
                  <button
                    onClick={() => {
                      setReportModal(false);
                    }}
                    className="mt-4 p-2 bg-gray-400 text-black  w-full rounded-md"
                  >
                    Cancel
                  </button>
                  {currentStep != 1 && (
                    <button
                      onClick={() => {
                        setCurrentStep((curr) => curr - 1);
                      }}
                      className="mt-4 p-2 bg-slate-300 text-black  w-full rounded-md"
                    >
                      Back
                    </button>
                  )}

                  {currentStep != 1 && currentStep != 2 ? (
                    <button
                      onClick={() => {
                        currentStep < 4 && setCurrentStep((curr) => curr + 1);
                      }}
                      className="mt-4 p-2 bg-slate-300 text-black  w-full rounded-md"
                    >
                      Skip
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="mt-4 p-2 w-full bg-primary dark:bg-navy-600 text-white rounded-md"
                  >
                    {currentStep != 4 ? "Next" : "Submit"}
                  </button>
                </div>
              </div>
            </dialog>
          )}

          <div className="flex md:flex-row flex-col flex-wrap gap-[10px] justify-between  pt-8 w-full">
            {dashboardData.map((el, index) => (
              <div
                key={index}
                className="h-[150px] lg:w-[32%] w-full gap-8 px-4 py-5 flex dark:bg-shadow-500 bg-white  border dark:border-none rounded-md cursor-pointer"
              >
                <div className="h-[4rem] w-[4rem] flex items-center justify-center rounded-md text-white bg-primary dark:bg-navy-900">
                  {el.icon}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <span className="text-[gray] dark:text-white text-lg">
                    {el.name}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-3xl dark:text-white font-bold">
                      {el.number}
                    </span>
                    <span className="dark:text-white">
                      <span className="text-[green] font-bold">+24</span> in the
                      last month
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <TransactionTable
            hidePagination={true}
            title="Recent Transacions"
            transactions={dashboardInfo.transaction}
          />
          <div className="p-8 flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl dark:text-white font-bold">
                Your Reports
              </h2>
              <div className="flex gap-4 items-center">
                <select className="bg-primary dark:bg-navy-700 text-white cursor-pointer rounded-md p-2.5 outline-none">
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                </select>
                <button
                  onClick={() => setReportModal(true)}
                  className="p-4 rounded-full bg-primary dark:bg-navy-700 text-white"
                >
                  <TbPlus size={20} />
                </button>
              </div>
            </div>
           
            <div className="flex flex-wrap gap-5">
              {reports&&reports.length>0 ? (
                reports.map((report) => <Report report={report} />)
              ) : (
                <div className="flex w-full justify-center flex-col  h-[300px] items-center">
                    <img src="/no_report.png" className="h-[200px] " />
                <p className="text-[20px] font-[500]">No reports Soon</p>
                <button onClick={()=>{setReportModal(true)}} className="mt-4 p-2 bg-primary flex gap-[20px] h-[50px] justify-center items-center dark:bg-navy-600 text-white rounded-md">
                  Generate Report
                 
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainSection;
