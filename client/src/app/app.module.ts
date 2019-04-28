import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PositionsService} from './shared/services/positions.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {PositionsListComponent} from './positions-list/positions-list.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {
  MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatGridListModule, MatRadioModule,
  MatToolbarModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PositionAddComponent} from './position-add/position-add.component';
import {HomeComponent} from './home/home.component';
import {Configuration} from './configuration';
import {RegisterCandidateComponent} from './register-candidate/register-candidate.component';
import {CandidateService} from './shared/services/candidate.service';
import {ResolveTestComponent} from './resolve-test/resolve-test.component';
import {TestService} from './shared/services/test.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
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
  },
  {
    path: 'resolve-test',
    component: ResolveTestComponent
  }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PositionsListComponent,
    PositionAddComponent,
    HomeComponent,
    PositionAddComponent,
    RegisterCandidateComponent,
    ResolveTestComponent
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
    ReactiveFormsModule,
    MatSortModule,
    MatRadioModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PositionsService,
    Configuration,
    CandidateService,
    TestService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}


