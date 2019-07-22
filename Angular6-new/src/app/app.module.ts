import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { MaterialModule } from "./material/material.module";
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material';

//routes
import {appRoutes} from './routes';

import { SignInComponent } from './user/sign-in/sign-in.component'; 
import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { DataTableComponent } from './data-table/data-table.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './userProfiles/user-profile/user-profile.component';
import { UsersListComponent } from './userProfiles/users-list/users-list.component';
import {MatSortModule} from '@angular/material/sort';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    NavbarComponent,
    DataTableComponent,
    UsersListComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
