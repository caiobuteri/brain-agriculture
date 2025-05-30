import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly dto: new (...args: any[]) => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) =>
          plainToInstance(this.dto, data, { excludeExtraneousValues: true }),
        ),
      );
  }
}
