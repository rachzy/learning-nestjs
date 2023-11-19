import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, nextFunction: NextFunction) {
    const { method } = req;

    const responses = {
      GET: () => {
        console.log('Getting data...');
      },
      POST: () => {
        console.log('Posting data...');
      },
    };

    if (!responses[method]) {
      throw new ForbiddenException();
    }

    responses[method]();
    nextFunction();
  }
}
