import { UserInterface } from './user.entity';

export interface UserRepositoryInterface {
  create(user: UserInterface): Promise<UserInterface>;
  findByEmail(email: string): Promise<UserInterface>;
  findById(id: number): Promise<UserInterface>;
  findAll(): Promise<UserInterface[]>;
  editUser(name: string, userUpdated: any): Promise<UserInterface>;
  login(payload: any): Promise<boolean>;
}
