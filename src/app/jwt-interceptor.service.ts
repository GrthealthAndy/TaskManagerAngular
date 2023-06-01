import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*when you make a http request, it will automatically call the HttpInterceptor*/
export class JwtInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(request : HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
  {
    var currentUser={token:""};
    if (sessionStorage.getItem('currentUser') != null)
    {
      currentUser=JSON.parse(sessionStorage.getItem('currentUser')!);

    }
    request=request.clone({
      setHeaders:{

        Authorization: "Bearer " + currentUser.token
      }

    });
    return next.handle(request);
  }
}
