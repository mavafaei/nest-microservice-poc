import { CallHandler, ExecutionContext, Injectable, InternalServerErrorException, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class TenantAwareInterceptor implements NestInterceptor {


  constructor() { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

    const request = context.switchToHttp().getRequest();

    if (!request.headers['client-id']) {
      throw new InternalServerErrorException();
    }

    request.body['client-id'] = request.headers['client-id'];
    if (request.headers['x-idempotency-key']) {
      request.body['x-idempotency-key'] = request.headers['x-idempotency-key'];
    }



    return next.handle();
  }
}
