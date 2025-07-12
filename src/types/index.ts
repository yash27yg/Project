export interface User {
  id: string;
  name: string;
  photo?: string;
  location?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  isPublic: boolean;
  rating?: number;
  totalSwaps?: number;
}

export interface SwapRequest {
  id: string;
  fromUser: User;
  toUser: User;
  skillOffered: string;
  skillWanted: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message?: string;
  createdAt: Date;
}

export interface Rating {
  id: string;
  fromUser: string;
  toUser: string;
  swapId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}