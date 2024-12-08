export interface User {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  roles?: string;
  subscriptionStatus?: string; // Add this line
}