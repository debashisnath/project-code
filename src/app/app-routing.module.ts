import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { StudyMaterialsComponent } from './study-materials/study-materials.component';
import { ClassSixComponent } from './class-six/class-six.component';
import { DisplayNotesComponent } from './display-notes/display-notes.component';
import { PaymentComponentComponent } from './payment-component/payment-component.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "register", component: UserRegistrationComponent },
  { path: "dashboard", component: UserDashboardComponent },
  { path: "login", component: UserLoginComponent },
  { path: "study-materials", component: StudyMaterialsComponent },
  { path: "class-six", component: ClassSixComponent },
  { path: "display-notes", component: DisplayNotesComponent },
  { path: "payment", component: PaymentComponentComponent },
  { path: "payment-status", component: PaymentStatusComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [HomePageComponent, UserRegistrationComponent, UserDashboardComponent,
UserLoginComponent, StudyMaterialsComponent, ClassSixComponent, DisplayNotesComponent, PaymentComponentComponent,
PaymentStatusComponent];
