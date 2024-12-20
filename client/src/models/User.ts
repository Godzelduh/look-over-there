import type { Location } from "./Location";

export interface User {
  username: string;
  email: string;
  password: string;
  savedLocations: Location[];
}
