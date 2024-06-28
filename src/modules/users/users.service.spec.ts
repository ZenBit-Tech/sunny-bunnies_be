import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UpdateStatusDto, UserStatus } from '../admin/dto/update-status.dto';
import { User } from '~/entities';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findById: jest.fn(),
            updateStatus: jest.fn(),
            softDelete: jest.fn(),
            save: jest.fn(),
            findAndSortUsers: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateStatus', () => {
    const userId = 'user-id';
    const updateStatusDto: UpdateStatusDto = { status: UserStatus.INACTIVE };
    let mockUser: User;

    beforeEach(() => {
      mockUser = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        status: UserStatus.ACTIVE,
      } as User;
      jest.spyOn(repository, 'findById').mockResolvedValue(mockUser);
    });

    it('should update user status', async () => {
      jest.spyOn(repository, 'updateStatus').mockImplementation((id, dto) => {
        if (mockUser.id === id) {
          mockUser.status = dto.status;
          return Promise.resolve(undefined);
        }
        return Promise.reject(new NotFoundException());
      });

      await service.updateStatus(userId, updateStatusDto);

      expect(repository.findById).toHaveBeenCalledWith(userId);
      expect(repository.updateStatus).toHaveBeenCalledWith(
        userId,
        updateStatusDto,
      );

      const updatedUser = await repository.findById(userId);
      expect(updatedUser).toEqual({
        ...mockUser,
        status: updateStatusDto.status,
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(
        service.updateStatus(userId, updateStatusDto),
      ).rejects.toThrowError(NotFoundException);
      expect(repository.updateStatus).not.toHaveBeenCalled();
    });
  });

  describe('softDeleteUser', () => {
    const userId = 'user-id';
    let mockUser: User;

    beforeEach(() => {
      mockUser = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        status: UserStatus.ACTIVE,
      } as User;
      jest.spyOn(repository, 'findById').mockResolvedValue(mockUser);
      jest.spyOn(repository, 'save').mockResolvedValue(mockUser);
    });

    it('should soft delete user', async () => {
      await service.softDeleteUser(userId);

      expect(repository.findById).toHaveBeenCalledWith(userId);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ deletedAt: expect.any(Date) }),
      );
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.softDeleteUser(userId)).rejects.toThrowError(
        NotFoundException,
      );
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('findAndSortUsers', () => {
    const order = 'ASC';
    const sortField = 'name';
    const role = 'user';
    const searchQuery = 'John';
    const mockUsers: User[] = [
      {
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
      },
      {
        id: '2',
        name: 'John Smith',
        email: 'john.smith@example.com',
        status: 'active',
        passwordHash: 'hashedpassword2',
        passwordSalt: 'salt2',
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
      },
    ];

    it('should return sorted users', async () => {
      jest.spyOn(repository, 'findAndSortUsers').mockResolvedValue(mockUsers);

      const result = await service.findAndSortUsers(
        order,
        sortField,
        role,
        searchQuery,
      );

      expect(repository.findAndSortUsers).toHaveBeenCalledWith(
        order,
        sortField,
        role,
        searchQuery,
      );
      expect(result).toEqual(mockUsers);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Some error';
      jest
        .spyOn(repository, 'findAndSortUsers')
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        service.findAndSortUsers(order, sortField, role, searchQuery),
      ).rejects.toThrow(errorMessage);
      expect(repository.findAndSortUsers).toHaveBeenCalledWith(
        order,
        sortField,
        role,
        searchQuery,
      );
    });
  });
});
