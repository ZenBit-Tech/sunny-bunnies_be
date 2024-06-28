import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UserUpdatePasswordDto } from './dto';
import { Encrypt } from '~/utils/encrypt.package';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;
  let encryptService: Encrypt;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findById: jest.fn(),
            findVendorById: jest.fn(),
            createOne: jest.fn(),
            findByEmail: jest.fn(),
            updateById: jest.fn(),
            updateCard: jest.fn(),
            updateProfile: jest.fn(),
            updateProfilePhoto: jest.fn(),
          },
        },
        {
          provide: Encrypt,
          useValue: {
            generateSalt: jest.fn().mockResolvedValue('mocked-salt'),
            encrypt: jest.fn().mockResolvedValue('mocked-hash'),
            compare: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(UsersRepository);
    encryptService = module.get(Encrypt);
  });

  describe('updatePassword', () => {
    it('should update user password and verify it is changed', async () => {
      const userId = '1';
      const newPassword = 'newPassword';

      const user = {
        id: userId,
        passwordHash: 'currentHash',
        passwordSalt: 'currentSalt',
      };

      (repository.findById as jest.Mock).mockResolvedValue(user);
      (encryptService.compare as jest.Mock).mockResolvedValue(false);

      (repository.updateById as jest.Mock).mockImplementation(async () => ({
        ...user,
        passwordHash: await encryptService.encrypt(newPassword, '10'),
      }));

      const updatedUser = await service.updatePassword(userId, {
        password: newPassword,
      } as UserUpdatePasswordDto);

      expect(updatedUser).toBeDefined();
      expect(updatedUser.id).toEqual(userId);

      const newPasswordHash = await encryptService.encrypt(newPassword, '10');
      expect(updatedUser.passwordHash).toEqual(newPasswordHash);
      expect(updatedUser.passwordHash).not.toEqual(user.passwordHash);
    });
  });
  it('should throw ConflictException if new password is the same', async () => {
    const userId = '1';
    const newPassword = 'samePassword';

    const user = {
      id: userId,
      passwordHash: 'currentHash',
      passwordSalt: 'currentSalt',
    };

    (repository.findById as jest.Mock).mockResolvedValue(user);
    (encryptService.compare as jest.Mock).mockResolvedValue(true);

    await expect(
      service.updatePassword(userId, {
        password: newPassword,
      } as UserUpdatePasswordDto),
    ).rejects.toThrow(ConflictException);

    expect(repository.updateById).not.toHaveBeenCalled();
  });
});
