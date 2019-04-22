import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PositionsService } from './shared/services/positions.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PositionsListComponent } from './positions-list/positions-list.component';
import {
  MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatGridListModule,
  MatToolbarModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PositionAddComponent } from './position-add/position-add.component';
import {HomeComponent} from './home/home.component';
import {Configuration} from './configuration';
import { RegisterCandidateComponent } from './register-candidate/register-candidate.component';
import {CandidateService} from './shared/services/candidate.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'positions-list',
    component: PositionsListComponent
  },
  {
    path: 'position-add',
    component: PositionAddComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register-candidate',
    component: RegisterCandidateComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PositionsListComponent,
    PositionAddComponent,
    HomeComponent,
    PositionAddComponent,
    RegisterCandidateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    MatSortModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PositionsService, Configuration, CandidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }


