import { configureStore } from "@reduxjs/toolkit";
import FAQQuestionReducer from "./features/FAQQuestion";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    FAQQuestion: FAQQuestionReducer,
  },
});

export const useAppSelector = useSelector;
