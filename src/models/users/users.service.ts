import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { User } from './interfaces/user.interface';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, login } = createUserDto;
    const saltRounds = Number(process.env.CRYPT_SALT);
    const hash = await bcrypt.hash(password, saltRounds);
    const timestamp = Date.now();

    const newUser = {
      id: uuid(),
      login,
      password: hash,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const index = this.users.findIndex((user: User) => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const { newPassword, oldPassword } = updatePasswordDto;
    const userToUpdate = this.users[index];
    const isMatch = await bcrypt.compare(oldPassword, userToUpdate.password);
    if (!isMatch) {
      throw new Error('Old password is incorrect');
    }
    const saltRounds = Number(process.env.CRYPT_SALT);
    const hash = await bcrypt.hash(newPassword, saltRounds);
    userToUpdate.password = hash;
    userToUpdate.version = userToUpdate.version++;
    userToUpdate.updatedAt = Date.now();
    return userToUpdate;
  }

  delete(id: string): User {
    const index = this.users.findIndex((user: User) => user.id === id);
    const deletedUser: User = this.users.splice(index, 1)[0];
    return deletedUser;
  }
}
