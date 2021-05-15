import { createContext, Dispatch, SetStateAction } from "react";

export interface User {
  email: string;
  provider: string;
}

export interface Auth {
  jwt: string;
  user: User;
}

export interface AuthContextValues {
  auth: Auth | undefined;
  setAuth: Dispatch<SetStateAction<Auth | undefined>>;
}

export const AuthContext = createContext({} as AuthContextValues);