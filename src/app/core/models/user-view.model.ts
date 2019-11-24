import { User } from "./user.model";

export interface UserView {
  user: User;
  total_clicks: number;
  total_page_views: number;
}
