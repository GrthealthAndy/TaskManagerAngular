import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Designation: string = "";
  Username: string = "";
  NoOfTeamMembers: number = 0;
  TotalCostOfAllProjects: number = 0;
  PendingTasks: number = 0;
  UpComingProjects: number = 0;
  ProjectCost: number = 0;
  CurrentExpenditure: number = 0;
  AvailableFunds: number = 0;

  Clients: string[]=[];
  Projects: string[] = [];
  Years: number[] = [];
  TeamMembersSummary: any = [];
  TeamMembers: any = [];
  ToDay: Date=new Date();
constructor(private dashboardService: DashboardService)
{


}
  ngOnInit()
  {
    this.Designation = 'Team Leader';
    this.Username = 'Ryan Smith';
    this.NoOfTeamMembers = 67;
    this.TotalCostOfAllProjects = 240;
    this.PendingTasks = 15;
    this.UpComingProjects = 0.2;
    this.ProjectCost = 2113507;
    this.CurrentExpenditure = 96788;
    this.AvailableFunds = 52536;


    this.Clients=[
      "ABC Infotech Ltd.","DEEEEF Software Solutions","KKK Industries","OPQ Consulting"
    ];
    this.Projects=[
      "Project A", "Project B", "Project Impossible"
    ];
    for (var i = 2019; i >= 2010; i--)
    {
      this.Years.push(i);
    }

    this.TeamMembersSummary=this.dashboardService.getTeamMembersSummary();

    /*this.TeamMembersSummary = [
      {
        Region: 'East',
        TeamMembersCount: 20,
        TemporarilyUnavailableMembers: 4,
      },
      {
        Region: 'West',
        TeamMembersCount: 15,
        TemporarilyUnavailableMembers: 8,
      },
      {
        Region: 'South',
        TeamMembersCount: 17,
        TemporarilyUnavailableMembers: 1,
      },
      {
        Region: 'North',
        TeamMembersCount: 15,
        TemporarilyUnavailableMembers: 6,
      },
    ];*/

    this.TeamMembers = [
      {
        Region: 'East',
        Members: [
          { ID: 1, Name: 'Ford', Status: 'Available' },
          { ID: 2, Name: 'Miller', Status: 'Available' },
          { ID: 3, Name: 'Jones', Status: 'Busy' },
          { ID: 4, Name: 'James', Status: 'Busy' },
        ],
      },
      {
        Region: 'West',
        Members: [
          { ID: 5, Name: 'Anna', Status: 'Available' },
          { ID: 6, Name: 'Arun', Status: 'Available' },
          { ID: 7, Name: 'Varun', Status: 'Busy' },
          { ID: 8, Name: 'Jasmine', Status: 'Busy' },
        ],
      },
      {
        Region: 'South',
        Members: [
          { ID: 9, Name: 'Krishna', Status: 'Available' },
          { ID: 10, Name: 'Mohan', Status: 'Available' },
          { ID: 11, Name: 'Raju', Status: 'Busy' },
          { ID: 12, Name: 'Farooq', Status: 'Busy' },
        ],
      },
      {
        Region: 'North',
        Members: [
          { ID: 13, Name: 'Jacob', Status: 'Available' },
          { ID: 14, Name: 'Smith', Status: 'Available' },
          { ID: 15, Name: 'Jones', Status: 'Busy' },
          { ID: 16, Name: 'James', Status: 'Busy' },
        ],
      },
    ];

  }
  onProjectChange($event:any){
    console.log($event.target.innerHTML);
    if ($event.target.innerHTML=="Project A")
    {
      this.ProjectCost=123123;
      this.CurrentExpenditure=234234;
      this.AvailableFunds=52435;
    }
    else if($event.target.innerHTML=="Project B")
    {
      this.ProjectCost=1223223;
      this.CurrentExpenditure=234234;
      this.AvailableFunds=156435;
    }
    else if($event.target.innerHTML=="Project Impossible")
    {
      this.ProjectCost=123123;
      this.CurrentExpenditure=999999;
      this.AvailableFunds=52435;
    }
    else if($event.target.innerHTML=="Project D")
    {
      this.ProjectCost=123123;
      this.CurrentExpenditure=234234;
      this.AvailableFunds=52435;
    }
  }
}