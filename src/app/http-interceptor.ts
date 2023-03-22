import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler,HttpEvent, HttpInterceptor,HttpResponseBase,HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // tapオペレータでレスポンスの流れを傍受する
      tap(resp => {
        const response = resp as HttpResponseBase;
        if (resp.type === HttpEventType.Sent) {
          console.log("interceptor(event=sent):" + resp);
        }
        else {
          console.log("interceptor(event=?):" + resp);
        }

      }),
    );
  }
}
