import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemoveSystemFieldsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RemoveSystemFieldsInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const start = new Date().getTime();
        this.deleteSystemFieldsRecursively(data);
        const end = new Date().getTime();
        this.logger.debug(`Execute time: ${end - start}ms`);
        return data;
      }),
    );
  }

  private deleteSystemFieldsRecursively(data: any): void {
    if (Array.isArray(data)) {
      for (let i = data.length - 1; i >= 0; i--) {
        const element = data[i];
        if (typeof element === 'object') {
          if (Array.isArray(element)) {
            this.deleteSystemFieldsRecursively(element);
          } else if (Object.keys(element || {}).length === 0) {
            data.splice(i, 1);
          } else {
            this.deleteSystemFieldsRecursively(element);
          }
        }
      }
    } else if (typeof data === 'object' && !Array.isArray(data)) {
      for (const key in data) {
        if (key === '_id' || key === '__v') {
          delete data[key];
        } else if (typeof data[key] === 'object') {
          if (Array.isArray(data[key])) {
            this.deleteSystemFieldsRecursively(data[key]);
          } else if (Object.keys(data[key] || {}).length === 0) {
            data[key] = null;
          } else {
            this.deleteSystemFieldsRecursively(data[key]);
          }
        }
      }
    }
  }
}
