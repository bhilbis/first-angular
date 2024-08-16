import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const authRequest = !token ? req : req.clone({
      setHeaders: { Authorization: `Bearer ${token}`}
    });
    return next(authRequest);
  } else {
    return next(req);
  }
};