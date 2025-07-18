import { Nullable } from ".";
import { User } from "./user";

export interface AuthState {
  user: Nullable<User>;
  isLoading: boolean;
  error: Nullable<Error>;
  isAuthenticated: boolean;
}