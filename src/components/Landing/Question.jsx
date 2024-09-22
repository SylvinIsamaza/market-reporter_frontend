import { useState } from "react";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { updateFAQQuestion } from "../../redux/features/FAQQuestion";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";

const Question = ({ id, question, answer }) => {
  const [questionOpen, setQuestionOpen] = useState(false);
  const dispatch = useDispatch();
  const activeQuestionId = useAppSelector(
    (state) => state.FAQQuestion.value.state
  );

  const openAccordion = (questionId) => {
    setQuestionOpen((prevState) => !prevState);
    dispatch(updateFAQQuestion(questionId));
  };

  return (
    <div
      className={`${
        questionOpen && activeQuestionId === id
          ? "border-2 border-primary shadow-none"
          : ""
      } flex cursor-pointer flex-col rounded-2xl p-4 border border-secondary md:max-w-[45rem] lg:max-w-[55rem]`}
      onClick={() => openAccordion(id)}
    >
      <div
        className={`flex ${
          questionOpen && activeQuestionId === id
            ? "items-start"
            : "items-center"
        } justify-between gap-4 px-4 text-start`}
      >
        <span className="max-w-full xs:max-w-[80%]">{question}</span>
        {questionOpen && activeQuestionId === id ? (
          <div className="rounded-full bg-brand p-2 xs:flex">
            <IoChevronDownOutline size={25} cursor="pointer" color="#2a66b4" />
          </div>
        ) : (
          <div className="rounded-full p-2 shadow-[0px_5px_16px_0_rgba(8,15,52,0.06)] xs:flex">
            <IoChevronForwardOutline
              size={25}
              cursor="pointer"
              color="#2a66b4"
            />
          </div>
        )}
      </div>
      <div
        className={`ml-4 grid overflow-hidden text-start text-secondary transition-all duration-300 ease-in-out ${
          questionOpen && activeQuestionId === id
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <span className="overflow-hidden leading-[2rem] text-[#4C4C4C]">
          {answer}
        </span>
      </div>
    </div>
  );
};

export default Question;
