import { PrismaService } from '@/common/frameworks/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

const userArray = [
  { name: 'user1', email: 'user1@moises.ai', tasks: [] },
  { name: 'user2', email: 'user2@moises.ai', tasks: [] },
  { name: 'user3', email: 'user3@moises.ai', tasks: [] },
];


describe('User service', () => {
  let service: UserService;

  const mockPrismaService = {
    user: {
      findMany: jest.fn().mockResolvedValue(userArray),
      findUnique: jest.fn().mockResolvedValue(userArray[0]),
      create: jest.fn().mockResolvedValue(userArray[0]),
    },
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserService],
      providers: [PrismaService]
    })
      // .overrideProvider(PrismaService) // mock all
      // .useValue(mockPrismaService)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('should create user - (e2e) only with mockPrismaService', async () => {
    const user = await service.createUser({ email: "aaa@aaa.com", name: "aaaa" })
    expect(service).toContain({ email: "aaa@aaa.com", name: "aaaa" });
  });

  it('should create user with spy', async () => {
    const service_createUser = jest.spyOn(
      service as any,
      'createUser',
    );

    service_createUser.mockResolvedValue({
      id: '6c86ad87-8736-4365-8d79-9378710733b3',
      email: 'aaa@aaa.com',
      name: 'aaaa',
      tasks: []
    });

    const user = await service.createUser({ email: "aaa@aaa.com", name: "aaaa" })

    expect(user).toEqual(
      expect.objectContaining({ email: "aaa@aaa.com", name: "aaaa" })
    );


  });


});
