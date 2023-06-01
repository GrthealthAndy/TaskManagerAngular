import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginViewModel } from './login-view-model';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserName: any =null;
  private httpClient:HttpClient | null=null;//you must initialize all properties of your typescript class
  constructor(private httpBackend: HttpBackend, private jwtHelperService:JwtHelperService) {



  }
  public Logout()
  {
    this.currentUserName=null;
    sessionStorage.removeItem("currentUser");
  }

  public IsAuthenticate() : boolean{
    var token = sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser') as string).token: null;//this is optional the jwtHelperService get the token from app.module
    if (this.jwtHelperService.isTokenExpired())
    {
      console.log("Is token expired:" + this.jwtHelperService.isTokenExpired())
      return false;
    }else{
      console.log("Is token expired:" + this.jwtHelperService.isTokenExpired())
      return true;
    }

  }
  public Login(loginViewModel: LoginViewModel):Observable<any>
  {
    //return this.httpClient.post<any>("https://localhost:7171/authenticate",loginViewModel,{responseType:"json"})

    this.httpClient =new HttpClient(this.httpBackend);//don't want intercept because no need to pass jwt token in header, need to create httpClient using httpBackend
  //  return this.httpClient.post<any>("authenticate",loginViewModel,{responseType:"json"})
    return this.httpClient.post<any>("https://localhost:7171/authenticate",loginViewModel,{responseType:"json"})
    .pipe(map(user=>{
        if (user)
        {
          console.log("FullName: " + user.fullName);
          console.log("Username: " + user.userName);
          console.log("currentUser: " + JSON.stringify(user));
          this.currentUserName=user.fullName;
          //only accessible by the same browser tab, storing token
          sessionStorage.setItem('currentUser',JSON.stringify(user));
        }
        return user;


    }))

  }

}
