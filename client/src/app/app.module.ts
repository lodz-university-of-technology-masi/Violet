import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PositionsService} from './shared/services/positions.service';
import {AuthService} from './shared/services/auth.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
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
import {LoginUserComponent} from './login-user/login-user.component';
import {ResolveTestComponent} from './resolve-test/resolve-test.component';
import {TestService} from './shared/services/test.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {HttpInterceptorService} from './shared/services/http-interceptor.service';
import {MessageService} from './shared/services/message.service';
import {RedactorListComponent} from './redactor-list/redactor-list.component';
import {RedactorService} from './shared/services/redactor.service';
import {RedactorAddComponent} from './redactor-add/redactor-add.component';
import {TestListComponent} from './test-list/test-list.component';
import {AuthGuard} from './shared/services/auth-guard.service';
import {UserRole} from './shared/model/user-model';
import {RedactorTestListComponent} from './redactor-test-list/redactor-test-list.component';
import {RedactorEditComponent} from './redactor-edit/redactor-edit.component';
import {ExportService} from './shared/services/export.service';
import {TestAddComponent} from './test-add/test-add.component';
import {MatIconModule} from '@angular/material/icon';
import {TestModifyComponent} from './test-modify/test-modify.component';
import { ResolveTestListComponent } from './resolve-test-list/resolve-test-list.component';
import { TestAddVersionComponent } from './test-add-version/test-add-version.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'positions-list',
    component: PositionsListComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.moderator]
    }
  },
  {
    path: 'position-add',
    component: PositionAddComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.moderator]
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.guest, UserRole.moderator, UserRole.redactor]
    }
  },
  {
    path: 'register-candidate',
    component: RegisterCandidateComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.guest]
    }
  },
  {
    path: 'resolve-test',
    component: ResolveTestComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.guest]
    }
  },
  {
    path: 'login-user',
    component: LoginUserComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.guest]
    }
  },
  {
    path: 'redactor-list',
    component: RedactorListComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.moderator]
    }
  },
  {
    path: 'redactor-add',
    component: RedactorAddComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.moderator]
    }
  },
  {
    path: 'redactor-edit',
    component: RedactorEditComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: [UserRole.moderator]
    }
  },
  {
    path: 'test-list',
    component: TestListComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.moderator]
    }
  },
  {
    path: 'test-list-redactor',
    component: RedactorTestListComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.redactor]
    }
  },
  {
    path: 'test-add',
    component: TestAddComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.moderator]
    }
  },
  {
    path: 'test-modify',
    component: TestModifyComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.moderator, UserRole.redactor]
    }
  },
  {
    path: 'resolve-test-list',
    component: ResolveTestListComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.redactor]
    }
  },
  {
    path: 'test-add-version',
    component: TestAddVersionComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.redactor]
    }
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AuthGuard], data: {
      permittedRoles: [UserRole.guest, UserRole.moderator, UserRole.redactor]
    }
  }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LoginUserComponent,
    AppComponent,
    PositionsListComponent,
    HomeComponent,
    PositionAddComponent,
    RegisterCandidateComponent,
    ResolveTestComponent,
    RedactorListComponent,
    RedactorAddComponent,
    RedactorEditComponent,
    TestListComponent,
    RedactorTestListComponent,
    TestAddComponent,
    TestModifyComponent,
    ResolveTestListComponent,
    TestAddVersionComponent
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
    RouterModule.forRoot(appRoutes),
    MatIconModule
  ],
  providers: [
    AuthService,
    PositionsService,
    Configuration,
    CandidateService,
    RedactorService,
    TestService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    MessageService,
    ExportService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
