import { Injectable, Req } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class JwtDecoderUtil {
  public decode(@Req() req: Request) {
    const headers = req.headers;
    if (
      'authorization' in headers &&
      typeof headers.authorization == 'string'
    ) {
      const token = headers.authorization.slice(7);

      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    }
  }
}
