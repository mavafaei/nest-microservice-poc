import { Catch, RpcExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { stat } from 'fs';

@Catch(RpcException)
export class RpcReqResExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(
    exception: any, host: ArgumentsHost
  ): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException ? exception.message : 'Internal Server Error';


    const errorResponse = {
      status: 500,
      message: exception.getError(),
    };

    return throwError(() => errorResponse);
  }
}