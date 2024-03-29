import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./aut-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";

const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent
    }, {
      path: 'users',
      component: UsersComponent,
      children: [
        {
          path: ':id/:name',
          component: UserComponent
        }
      ]
    }, {
      path: 'servers',
      canActivate: [AuthGuard],
      component: ServersComponent,
      children: [
        {
          path: ':id/edit',
          component: EditServerComponent,
          canDeactivate: [CanDeactivateGuard]
        }, {
          path: ':id',
          component: ServerComponent
        }
      ]
    }, {
      path: 'not-found',
      component: ErrorPageComponent,
      data: {message: 'Page not found!'}
      // component: PageNotFoundComponent
    }, {
      path: '**', // wildcard route, always at the bottom
      redirectTo: '/not-found'
    }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}