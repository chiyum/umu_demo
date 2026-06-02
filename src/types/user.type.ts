export interface UserResponse {
  user_id: number;
  display_name: string;
  user_email: string;
  profile_image: string;
  user_type: string;
  status: 0 | 1;
  created_at: string;
}
