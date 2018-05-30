import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
// import { HttpModule, BaseRequestOptions } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses.component';
import { PanelComponent } from './panel/panel.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { CourseComponent } from './course/course.component';

import { AppErrorHandler } from './common/app-error-handler';

import { SummaryPipe } from './summary.pipe';
import { InputFormatDirective } from './input-format.directive';

import { ContactFormComponent } from './contact-form/contact-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { PostsComponent } from './posts/posts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';

import { fakeBackendProvider } from './fake-backend-provider';
import { JwtInterceptor } from './jwt-interceptor';

import { CoursesService } from './services/courses.service';
import { PostService } from './services/post.service';
import { GithubFollowersService } from './services/github-followers.service';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    SummaryPipe,
    FavoriteComponent,
    PanelComponent,
    InputFormatDirective,
    ContactFormComponent,
    SignupFormComponent,
    NewCourseFormComponent,
    PostsComponent,
    NavbarComponent,
    HomeComponent,
    GithubProfileComponent,
    NotFoundComponent,
    GithubFollowersComponent,
    LoginComponent,
    AdminComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpModule,
    HttpClientModule,
    routing
  ],
  providers: [
  	CoursesService,
    PostService,
    GithubFollowersService,
    AuthService,
    OrderService,    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },

    fakeBackendProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
