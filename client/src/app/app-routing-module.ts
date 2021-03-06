import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/notAuth.guard';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import {DeleteBlogComponent} from './components/blog/delete-blog/delete-blog.component';





const appRouts = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [notAuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [notAuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: "blog",
        component: BlogComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "edit-blog/:id",
        component: EditBlogComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "delete-blog/:id",
        component: DeleteBlogComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: HomeComponent
    },

    // {path: '**',
    // component: HomeComponent
    // }

]
@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRouts)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }