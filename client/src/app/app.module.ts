import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PositionsService } from './shared/positions/positions.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PositionsListComponent } from './positions-list/positions-list.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule,
  MatToolbarModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PositionAddComponent } from './position-add/position-add.component';
import {HomeComponent} from './home/home.component';
import {Configuration} from './configuration';

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
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PositionsListComponent,
    PositionAddComponent,
    HomeComponent,
    PositionAddComponent
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
    FormsModule,
    MatSortModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PositionsService, Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }


