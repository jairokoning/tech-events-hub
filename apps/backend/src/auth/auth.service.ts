import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { randomBytes, scrypt as _scrypt } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private configService: ConfigService) {}

  async signIn(email: string, password: string) {
    const envUser = this.configService.get<string>('ADMIN_USER')
    const envPassword = this.configService.get<string>('ADMIN_PASSWORD')
    if (!envUser || email !== envUser || !envPassword) {
      return new UnauthorizedException('Invalid credentials')
    }
    const [salt, storedHash] = envPassword.split('.')
    const hash = (await scrypt(password, salt, 32)) as Buffer
    if (storedHash !== hash.toString('hex')) {
      return new UnauthorizedException('Invalid credentials')
    }
    const payload = { user: envUser }
    return { accessToken: this.jwtService.sign(payload) }    
  }
}
