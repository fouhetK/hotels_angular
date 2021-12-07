import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './clients/client-details/client-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { AuthGuard } from './guard/in/auth.guard';
import { ClientGuard } from './guard/out/client.guard';
import { ResasGuard } from './guard/out/resas.guard';
import { HotelComponent } from './hotels/hotel.component';
import { LoginComponent } from './login/login/login.component';
import { ResasDetailsComponent } from './resas/resas-details/resas-details.component';
import { ResasComponent } from './resas/resas.component';

const routes: Routes = [
  { path : "" , component: LoginComponent },
  { path : "login" , component: LoginComponent },
  { path : "clients" , component: ClientsComponent, canActivate: [AuthGuard] },
  { path : "clients/addedit/:id" , component: ClientDetailComponent, canActivate: [AuthGuard], canDeactivate: [ClientGuard] },
  { path : "hotels" , component: HotelComponent, canActivate: [AuthGuard] },
  { path : "resas" , component: ResasComponent, canActivate: [AuthGuard] },
  { path : "resas/addedit/:id" , component: ResasDetailsComponent, canActivate: [AuthGuard], canDeactivate: [ResasGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
