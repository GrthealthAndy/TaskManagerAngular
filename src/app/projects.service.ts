import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) {
//an event handle call a service with perform ajax call to server to retrieve data back to the component and then to the component template
//make components contain code for only supplying the data to the template and respond to the user actions such as
//click and also call the necessary services.
  }
  getAllProjects() : Observable<Project[]>
  {
    /*Manuall create a header to send token in the header
   var currentUser={token: ""};

    var headers = new HttpHeaders();
    headers = headers.set("Authorization","Bear ");
    if (sessionStorage.getItem('currentUser') != null)
    {
      console.log("Get currentUser:" + sessionStorage.getItem('currentUser'));
      currentUser=JSON.parse(sessionStorage.getItem('currentUser')!);//! non-null assertion operator to tell typescript you know what you are doing
      console.log("Get token:" + currentUser.token);
      headers=headers.set("Authorization", "Bearer " + currentUser.token)

    }
*/
    //them "Map" is an RXJS Operator, which executes a function after recieving response from the server  you can perform operations on the returned data before giving to subscriber
    //return this.httpClient.get<Project[]>("/api/projects", {headers: headers, responseType:"json"}).pipe(map(
    /*  return this.httpClient.get<Project[]>("/api/projects", {responseType:"json"}).pipe(map(
      (data:Project[])=>{
        for (let i=0;i<data.length;i++)
        {
          data[i].teamSize=data[i].teamSize * 100;
        }

        return data;
      }
    ));*/
   //return this.httpClient.get<Project[]>("http://localhost:4200/api/projects", {responseType:"json"});
    return this.httpClient.get<Project[]>("/api/projects", {responseType:"json"});
  }
  insertProject(newProject:Project) : Observable<Project>
  {
    return this.httpClient.post<Project>("/api/projects", newProject, {responseType:"json"});
   // return this.httpClient.post<Project>("http://localhost:7171/api/projects", newProject, {responseType:"json"});
  }
  updateProject(existingProject:Project) : Observable<Project>
  {
    return this.httpClient.put<Project>("/api/projects", existingProject, {responseType:"json"});
  }
  deleteProject(ProjectID:number) : Observable<string>
  {
   // return this.httpClient.delete<string>("http://localhost:7171/api/projects?ProjectID=" + ProjectID);
   return this.httpClient.delete<string>("/api/projects?ProjectID=" + ProjectID);
  }
 searchProjects(searchBy:string, searchText:string) : Observable<Project[]>
  {
    return this.httpClient.get<Project[]>("/api/projects/search/" + searchBy + "/" + searchText, {responseType:"json"});
  }
}
