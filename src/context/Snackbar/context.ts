import { createContext } from "react";
import { HandlersContext } from "./types";

// Handlers context
export const SnackbarHandlersContext = createContext<HandlersContext | null>(
  null
);
