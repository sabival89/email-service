import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Http OK Response
 */
export class EmailServiceOkException extends HttpException {
  /**
   * Email Service Http OK Exception
   * @param message
   */
  constructor(message: string) {
    super(
      {
        status: HttpStatus.OK,
        message: message,
      },
      HttpStatus.OK
    );
  }
}
