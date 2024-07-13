import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '../domain/user.entity';
import { UserRepositoryInterface } from '../domain/user.repository';
import { UserValue } from '../domain/user.value';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRespository: UserRepositoryInterface,
  ) {}

  public async create(user: UserInterface) {
    const user1 = new UserValue(user);
    return this.userRespository.create(user1);
  }

  findAll() {
    return this.userRespository.findAll();
  }

  findOneById(id: number) {
    return this.userRespository.findById(id);
  }

  findOneByEmail(email: string) {
    return this.userRespository.findByEmail(email);
  }

  editUser(name: string, userUpdate: any) {
    return this.userRespository.editUser(name, userUpdate);
  }
  login(payload: any) {
    return this.userRespository.login(payload);
  }
}
