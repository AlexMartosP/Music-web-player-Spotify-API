// Snackbar
export interface SnackbarType extends OptionsType {
  body: string;
  type: SnackbarTypes;
  id: string;
  shouldClose: boolean;
  open: boolean;
  action?: ActionType;
  entered: boolean;
}

export type SnackbarTypes = "WARNING" | "ALERT" | "INFO";

export interface OptionsType {
  id?: string;
  closeOnAction?: boolean;
  preventDuplication?: boolean;
  replaceDuplication?: boolean;
}

export interface ActionType {
  label: string;
  callback: () => void;
}

// Handlers
type EnqueueSnackbar = (message: ParamsType, options?: OptionsType) => string;
type CloseSnackbar = (id: string) => void;

// Params
interface ParamsType {
  body: string;
  type: SnackbarTypes;
  action?: ActionType;
}

// Context
export interface HandlersContext {
  enqueueSnackbar: EnqueueSnackbar;
  closeSnackbar: CloseSnackbar;
}

// State
export interface StateType {
  messages: SnackbarType[];
  queue: SnackbarType[];
}

// Origin
export interface OriginType {
  horizontal: "left" | "center" | "right";
  vertical: "top" | "bottom";
}
