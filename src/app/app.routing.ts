import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'followers',
      component: GithubFollowersComponent
    },
    {
      path: 'followers/:id/:username',
      component: GithubProfileComponent
    },
    {
      path: 'posts',
      component: PostsComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'admin',
      component: AdminComponent,
      canActivate: [AuthGuardService, AdminAuthGuardService]
    },
    {
      path: 'no-access',
      component: NoAccessComponent
    },
    {
      path: '**',
      component: NotFoundComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
