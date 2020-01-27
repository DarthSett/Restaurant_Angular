import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatFormFieldModule,
  MatListModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatGridListModule,
  MatButtonModule,
  MatExpansionModule,
  MatTableModule,
  MatDialogModule, MatTabsModule, MatTooltipModule, MatCheckboxModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BannerComponent } from './banner/banner.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestlistComponent } from './restlist/restlist.component';
import { LoginDetails } from './login-details';
import { CustomerDetails } from './customer-details';
import { Restaurant } from './restaurant';
import {
  DeleteRestaurantComponent,
  RestaurantComponent,
  UpdateFoodComponent,
  UpdateRestaurantComponent
} from './restaurant/restaurant.component';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import { TestComponent } from './test/test.component';
import {CreateUserComponent, DeleteUserComponent, SuperAdminListComponent} from './super-admin-list/super-admin-list.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminComponent } from './admin/admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerComponent } from './owner/owner.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BannerComponent,
    SignupComponent,
    HomeComponent,
    HomeComponent,
    DashboardComponent,
    RestlistComponent,
    RestaurantComponent,
    UpdateRestaurantComponent,
    DeleteRestaurantComponent,
    UpdateFoodComponent,
    TestComponent,
    SuperAdminListComponent,
    SuperAdminComponent,
    CreateUserComponent,
    DeleteUserComponent,
    AdminComponent,
    AdminListComponent,
    OwnerListComponent,
    OwnerComponent
  ],
  imports: [
    FormsModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFiiAKvKjV8FMb-6hKlg6ZN5zx9ne6h_M'
    }),
    MatCheckboxModule
  ],
  entryComponents: [UpdateRestaurantComponent, DeleteRestaurantComponent, UpdateFoodComponent, CreateUserComponent, DeleteUserComponent],
  providers: [LoginDetails, CustomerDetails, Restaurant],
  bootstrap: [AppComponent]
})
export class AppModule { }
