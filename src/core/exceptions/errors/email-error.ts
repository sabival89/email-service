import {
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

export class EmailError {
  private readonly errorCode: number;

  private readonly message: string;

  private readonly error: unknown;

  HttpResponse = {
    401: this.response.bind(new UnauthorizedException('You are not authorized')),
  };

  constructor(errorCode: number, error?: unknown, message?: string) {
    this.errorCode = errorCode;
    this.message = message;
    this.error = error;
  }

  getError() {
    // return this.HttpResponse[this.errorCode];
    return this.HttpResponse[this.errorCode];
  }

  response(message: string, error: unknown) {
    console.log('Here', message);
  }
}
