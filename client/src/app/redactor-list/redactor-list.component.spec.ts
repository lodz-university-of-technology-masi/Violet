import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactorListComponent } from './redactor-list.component';

describe('RedactorListComponent', () => {
  let component: RedactorListComponent;
  let fixture: ComponentFixture<RedactorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedactorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
