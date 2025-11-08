export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  interests: string[];
  location: string;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  timestamp: Date;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export type SwipeAction = 'like' | 'pass';
