import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from '../domain/user.entity';
import { UserRepositoryInterface } from '../domain/user.repository';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class UserMySqlRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async create(user: UserInterface): Promise<UserInterface> {
    const newUser = this.userRepository.create(user);
    const userCreated = await this.userRepository.save(newUser);
    return userCreated;
  }
  public async findByEmail(email: string): Promise<UserInterface> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  public async findById(id: number): Promise<UserInterface> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  public async findAll(): Promise<UserInterface[]> {
    const users = await this.userRepository.find();
    if (!users) throw new NotFoundException('There are no users');
    return users;
  }
  public async editUser(
    name: string,
    userUpdated: any,
  ): Promise<UserInterface> {
    const user = await this.userRepository.findOneBy({ username: name });
    if (!user) throw new NotFoundException('User not found');
    const userUpdate = Object.assign(user, userUpdated);
    await this.userRepository.save(userUpdate);
    return userUpdate;
  }
  async login(payload: any): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      username: payload.username,
    });
    if (!user) {
      return false;
    }
    if (user && user.password === payload.password) {
      return true;
    } else {
      return false;
    }
  }
}
