export interface Post {
  post_id: number;
  gender: string;
  address1: string;
  address2?: string; // Optional property
  city: string;
  state: string;
  country: string;
  pincode: string;
  noOfRoommates: number;
  noOfFilledRoommates: number;
  size: string;
  rent: string;
  postBody: string;
}
