import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'//avaiable in the project everywhere
})
export class DashboardService {

  constructor() { }

  getTeamMembersSummary():any[]
  {
    var TeamMembersSummary=[
      {Region: "Wild East", TeamMembersCount:23, TemporarilyUnavailableMembers:500},
      {Region: "West", TeamMembersCount:15, TemporarilyUnavailableMembers:8},
      {Region: "South", TeamMembersCount:42, TemporarilyUnavailableMembers:5},
      {Region: "North", TeamMembersCount:23, TemporarilyUnavailableMembers:9},


    ];

    return TeamMembersSummary;

  }

}
