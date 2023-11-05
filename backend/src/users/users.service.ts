import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createUser(
    userId: number,
    username: string,
    password: string,
    email: string,
  ) {
    const newUser = new User(userId, username, password, email);
    this.users.push(newUser);
    return userId;
  }
}
