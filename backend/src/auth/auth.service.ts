import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePasswords(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findUser(username);
    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const comparedPassword = await this.comparePasswords(pass, user.password);

    if (!comparedPassword) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerUser(CreateUserDto: CreateUserDto) {
    const user = await this.usersService.findUser(CreateUserDto.username);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const userId = Math.random();
    const hashedPassword = await this.hashPassword(CreateUserDto.password);
    const newUserId = await this.usersService.createUser(
      userId,
      CreateUserDto.username,
      hashedPassword,
      CreateUserDto.email,
    );
    const payload = { sub: newUserId, username: CreateUserDto.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
