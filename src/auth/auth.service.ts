import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    const match = await bcrypt.compare(pass, user.password);

    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
