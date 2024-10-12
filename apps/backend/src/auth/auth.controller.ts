import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() body: { email: string; password: string }) {
    const { email, password } = body
    return this.authService.signIn(email, password)
  }
}
