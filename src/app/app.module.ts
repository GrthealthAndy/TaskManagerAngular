import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about.component';
import { MyProfileComponent } from './admin/my-profile/my-profile.component';
import { AdminModule } from './admin/admin.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './jwt-un-authorized-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { TeamSizeValidatorDirective } from './team-size-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeamSizeValidatorDirective,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return (sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser') as string).token :null
          )

        }

      }

    })
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass:JwtInterceptorService,
      multi:true

},
{
  provide: HTTP_INTERCEPTORS,
  useClass:JwtUnAuthorizedInterceptorService,
  multi:true

}

],

  //start AppComponent and the contents of the component go to the <app-root></app-root> of the index.html file
  bootstrap: [AppComponent]
})
export class AppModule { }
