export interface Post {
  postId: number;
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

export interface FeedItem extends Post {
  userId: number;
  name: string;
  postDate: Date;
}
