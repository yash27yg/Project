import { User, SwapRequest } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
  location: 'San Francisco, CA',
  skillsOffered: ['React', 'TypeScript', 'UI/UX Design'],
  skillsWanted: ['Photography', 'Spanish', 'Guitar'],
  availability: ['Weekends', 'Evenings'],
  isPublic: true,
  rating: 4.8,
  totalSwaps: 12
};

export const mockUsers: User[] = [
  {
    id: '2',
    name: 'Sarah Chen',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'New York, NY',
    skillsOffered: ['Photography', 'Photoshop', 'Digital Art'],
    skillsWanted: ['React', 'Web Development'],
    availability: ['Weekends'],
    isPublic: true,
    rating: 4.9,
    totalSwaps: 8
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Austin, TX',
    skillsOffered: ['Spanish', 'Guitar', 'Cooking'],
    skillsWanted: ['UI/UX Design', 'Marketing'],
    availability: ['Evenings', 'Weekends'],
    isPublic: true,
    rating: 4.7,
    totalSwaps: 15
  },
  {
    id: '4',
    name: 'David Kim',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Seattle, WA',
    skillsOffered: ['Piano', 'Music Theory', 'Python'],
    skillsWanted: ['Photography', 'Video Editing'],
    availability: ['Weekdays', 'Evenings'],
    isPublic: true,
    rating: 4.6,
    totalSwaps: 6
  }
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    fromUser: mockUsers[0],
    toUser: currentUser,
    skillOffered: 'Photography',
    skillWanted: 'React',
    status: 'pending',
    message: 'Hi! I\'d love to learn React from you in exchange for photography lessons.',
    createdAt: new Date('2024-12-15')
  },
  {
    id: '2',
    fromUser: mockUsers[1],
    toUser: currentUser,
    skillOffered: 'Spanish',
    skillWanted: 'TypeScript',
    status: 'accepted',
    message: 'Looking forward to our language/coding exchange!',
    createdAt: new Date('2024-12-10')
  }
];