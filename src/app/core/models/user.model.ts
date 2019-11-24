import { UserStats } from "./user-stats.model";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ipAddress: string;
  userStats: UserStats[];
}
