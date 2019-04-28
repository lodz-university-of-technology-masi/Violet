<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PositionsService } from './shared/services/positions.service';
import { AuthService } from './shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PositionsListComponent } from './positions-list/positions-list.component';
=======
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PositionsService} from './shared/services/positions.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {PositionsListComponent} from './positions-list/positions-list.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
>>>>>>> master
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
<<<<<<< HEAD
import { ResolveTestComponent } from './resolve-test/resolve-test.component';
import { TestService } from './shared/services/test.service';
import { LoginUserComponent } from './login-user/login-user.component';
=======
import {ResolveTestComponent} from './resolve-test/resolve-test.component';
import {TestService} from './shared/services/test.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {HttpInterceptorService} from './shared/services/http-interceptor.service';
import {MessageService} from './shared/services/message.service';
import {RedactorListComponent} from './redactor-list/redactor-list.component';
import {RedactorService} from './shared/services/redactor.service';
>>>>>>> master

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
  },
  {
<<<<<<< HEAD
    path: 'login-user',
    component: LoginUserComponent
=======
    path: 'redactor-list',
    component: RedactorListComponent
>>>>>>> master
  }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
<<<<<<< HEAD
   declarations: [
      AppComponent,
      PositionsListComponent,
      PositionAddComponent,
      HomeComponent,
      PositionAddComponent,
      RegisterCandidateComponent,
      ResolveTestComponent,
      LoginUserComponent
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
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      PositionsService,
      Configuration,
      CandidateService,
      TestService,
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
=======
  declarations: [
    AppComponent,
    PositionsListComponent,
    PositionAddComponent,
    HomeComponent,
    PositionAddComponent,
    RegisterCandidateComponent,
    ResolveTestComponent,
    RedactorListComponent
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
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right-custom',
    }),
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
    RedactorService,
    TestService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
>>>>>>> master
})
export class AppModule {
}


