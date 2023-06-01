import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    //members of current modules
    DashboardComponent,
    MyProfileComponent,
    AboutComponent,
    ProjectsComponent
  ],
  imports: [
    //list of modules that the current module imports so that the current module can use component exported by that module
    CommonModule,
    FormsModule
  ],
  exports: [
    //component that can accessible by other modules
    //if not exported the component only accessible within the same module
    DashboardComponent,
    MyProfileComponent,
    AboutComponent,
    ProjectsComponent
  ]
})
export class AdminModule { }

//providers are list of services that can be used by the components, directives and pipes of current module
