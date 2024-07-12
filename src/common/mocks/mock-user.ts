import { User } from '~/entities';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  status: 'active',
  passwordHash: 'hashedpassword1',
  passwordSalt: 'salt1',
  isVerified: true,
  otpToken: null,
  deletedAt: null,
  products: [],
  followers: [],
  following: [],
  card: null,
  profile: null,
  ratingsReceived: [],
  ratingsGiven: [],
  reviewsReceived: [],
  reviewsGiven: [],
  createdAt: new Date(),
  updatedAt: new Date(),
} as User;

export { mockUser };
