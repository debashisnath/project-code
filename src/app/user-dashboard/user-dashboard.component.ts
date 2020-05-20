import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { IgxNavigationDrawerComponent } from "igniteui-angular";


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

constructor(private router:Router) {
 
}
public ngOnInit(): void {
}
@ViewChild(IgxNavigationDrawerComponent)
public drawer: IgxNavigationDrawerComponent;

closeDrawer(){
  this.drawer.close();
}

displayStudyMaterials(){
  this.closeDrawer();
  this.router.navigate(['/study-materials']);
  
}
}
