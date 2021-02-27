import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';


const appRoutes: Routes = [

    { path: '', redirectTo: "notifications", pathMatch: "full" }
    , { path: 'login', component: LoginComponent }
    , {
        path: 'notifications', canActivate: [AuthGuard]
        , component: NotificationsListComponent
    }

    , { path: '**', redirectTo: 'notifications' }

];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}