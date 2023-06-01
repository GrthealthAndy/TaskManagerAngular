import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ClientLocation } from 'src/app/client-location';
import { ClientLocationsService } from 'src/app/client-locations.service';
import * as $ from "jquery";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] =[];

  clientLocations: ClientLocation[]=[];

  showLoading:boolean=true;

  newProject: Project = new Project();
  deleteProject: Project= new Project();
  editProject: Project = new Project();
  editIndex:number=0;
  deleteIndex:number=0;
  searchBy:string="ProjectName";
  searchText:string="";
//access the newForm #newForm in the form tag based on the reference name in the component use ViewChild
  @ViewChild("newForm") newForm:NgForm | any=null;
  @ViewChild("editForm") editForm:NgForm |any = null;

  constructor(private projectsService: ProjectsService, private clientLocationsService:ClientLocationsService) {


  }
/*
Logical flow of execution:

- Component: Calls insertProject method.

- insertProject method in service: Makes a request.

- HttpClient service: Makes a HTTP POST request to server; and also creates an observable object.

- Component: Creates a subscription (using subscribe method) for that observable object. So it is ready get notified when we have received the response from the server.

- HttpClient service: When the response is received from the server, it notifies to the subscribers of the observable.

- Subscriber in component: Receives the notification and executes the onSuccess / next() method.



So in this whole story, there is no point about project array.

So we have to manually make essential changes to the array (adding a new project to the array) that we want, if we want.

(Observer subscribes Observable to listen for new data/any event)
Observable is like a youtube channel of someone else. (( It uploads new videos(data) from time to time, so it is a data source for you))

Your youtube account is an Observer

Your youtube account (Observer) can only get notifications about whether someone else's youtube channel (Observable) has uploaded a new video (has new data) or made a livestream (new event) only if you have subscribed to that channel
*/
onSearchClick()
{
  this.projectsService.searchProjects(this.searchBy,this.searchText).subscribe(
    (response:Project[])=>{

      this.projects=response;
    },
    ()=>{


    }
  );
}

onNewClick(event:any)
{
  this.newForm.resetForm();  //clear all fields, reset validation rules

}
  ngOnInit(): void {
    //make ajax call to server get project array and assign to the local projects array
    this.projectsService.getAllProjects().subscribe(
      (response:Project[])=>{
          this.projects=response;
          this.showLoading=false;
      }

    //  }, (error)=>{ now handle by interceptor
        //  console.log(error);
   //   }

    );
    this.clientLocationsService.getClientLocations().subscribe(
      (response:ClientLocation[])=>{
          this.clientLocations=response;
      });
  }
  //index stars at zero
onEditClick(event:any, index:number)
{
  this.editForm.resetForm();

  setTimeout(()=>
  {
    this.editProject.projectId=this.projects[index].projectId;
    this.editProject.projectName=this.projects[index].projectName;
    this.editProject.dateOfStart=this.projects[index].dateOfStart.split("/").reverse().join("-");//yyyy-MM-dd
    this.editProject.teamSize=this.projects[index].teamSize;

    this.editProject.active=this.projects[index].active;
    this.editProject.clientLocationID=this.projects[index].clientLocationID;
    this.editProject.clientLocation=this.projects[index].clientLocation;
    this.editProject.status=this.projects[index].status;

    this.editIndex=index;
  },100);//executes after 100 ms

}
onDeleteClick(event:any, index:number)
{
  this.deleteProject.projectId=this.projects[index].projectId;
  this.deleteProject.projectName=this.projects[index].projectName;
  this.deleteProject.dateOfStart=this.projects[index].dateOfStart;
  this.deleteProject.teamSize=this.projects[index].teamSize;
  this.deleteIndex=index;
}
onDeleteConfirmClick()
{
  this.projectsService.deleteProject(this.deleteProject.projectId).subscribe(

    (response)=>{
     //delete the projects from the projects array  take the position and delete one object only
     this.projects.splice(this.deleteIndex,1);

        //clear delete project,
        this.deleteProject.projectId=null;
        this.deleteProject.projectName=null;
        this.deleteProject.dateOfStart=null;
        this.deleteProject.teamSize=null;

    },(error)=>{


    }
  )
}
onUpdateClick()
{
  if (this.editForm.valid)
  {
  this.projectsService.updateProject(this.editProject).subscribe(

    (response:Project)=>{
      var p = new Project();
      p.projectId=response.projectId;
      p.projectName=response.projectName;
      p.dateOfStart=response.dateOfStart;
      p.teamSize=response.teamSize;

      p.clientLocation=response.clientLocation;
      p.active=response.active;
      p.clientLocationID=response.clientLocationID;
      p.status=response.status;



      this.projects[this.editIndex]=p;

        //clear new project, so when new project is clicked previous data is not there
        this.editProject.projectId=null;
        this.editProject.projectName=null;
        this.editProject.dateOfStart=null;
        this.editProject.teamSize=null;

        this.editProject.clientLocation=null;
        this.editProject.active=null;
        this.editProject.clientLocationID=null;
        this.editProject.status=null;
        $("#editFormCancel").trigger("click");
        //programmatically click the cancel button and close the form (becuase of the data-dismiss="modal")

    },(error)=>{
      console.log(error);

    });
  }

}
  onSaveClick()
  {
    if (this.newForm.valid)//save only if form is valid
    {
  this.newProject.clientLocation.clientLocationID=0;
    this.projectsService.insertProject(this.newProject).subscribe(

      (response)=>{
        //refresh project table after a new project is added.
        var p =new Project();
        p.projectId=response.projectId;
        p.projectName=response.projectName;
        p.dateOfStart=response.dateOfStart;
        p.teamSize=response.teamSize;
        p.clientLocation=response.clientLocation;
        p.active=response.active;
        p.clientLocationID=response.clientLocationID;
        p.status=response.status;
          this.projects?.push(p);
          //clear new project, so when new project is clicked previous data is not there
          this.newProject.projectId=null;
          this.newProject.projectName=null;
          this.newProject.dateOfStart=null;
          this.newProject.teamSize=null;

          this.newProject.active=null;
          this.newProject.clientLocationID  =null;
          this.newProject.status=null;

          //we need to use jquery in order to close the modal popup dialog programmatically
          //by default jquery is not available in Angular
          //to include jquery

          // import jquery.js in the angular.json
          //npm install -D @types/jquery
          //import * as $ from "jquery";
          //  "scripts": [
         //   "node_modules/jquery/dist/jquery.js",
          //  "node_modules/popper.js/dist/umd/popper.js",
        //    "node_modules/bootstrap/dist/js/bootstrap.js"
         // ]

          $("#newFormCancel").trigger("click");

      },(error)=>{

        console.log(error);
      }

    );
    }
  }

}
