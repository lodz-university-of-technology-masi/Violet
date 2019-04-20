import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PositionsService } from './shared/positions/positions.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PositionsListComponent } from './positions-list/positions-list.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PositionEditComponent } from './position-edit/position-edit.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/positions-list', pathMatch: 'full' },
  {
    path: 'positions-list',
    component: PositionsListComponent
  },
  {
    path: 'position-add',
    component: PositionEditComponent
  },
  {
    path: 'position-edit/:id',
    component: PositionEditComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PositionsListComponent,
    PositionEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PositionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }


