import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {

  constructor(private loginService:LoginService, private router: Router, private jwtHelperService:JwtHelperService) {


   }

   canActivate(route: ActivatedRouteSnapshot):boolean
       {
        var token = sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser') as string).token: null;
          if(this.loginService.IsAuthenticate() && this.jwtHelperService.decodeToken(token).role ==route.data['expectedRole'])
          {
            console.log("route.data['expectedRole']:" + route.data['expectedRole']);
            console.log("I am in role according to jwt payload:" + this.jwtHelperService.decodeToken(token).role);
            console.log("this.loginService.IsAuthenticate():" + this.loginService.IsAuthenticate())
            return true;//the user can navigate to the particular route
          }
          else
          {
            console.log("route.data['expectedRole']:" + route.data['expectedRole']);
            console.log("I am in role according to jwt payload:" + this.jwtHelperService.decodeToken(token).role);
            console.log("this.loginService.IsAuthenticate():" + this.loginService.IsAuthenticate())
            this.router.navigate(["login"])
            return false;//the user can't navigate to the particular route
          }
       }
  }

