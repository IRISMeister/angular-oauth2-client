import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestInterceptor } from './http-interceptor';

export function provideHttpInterceptors() {
  return [
    { provide: HTTP_INTERCEPTORS, useClass: TestInterceptor, multi: true },
  ];
}