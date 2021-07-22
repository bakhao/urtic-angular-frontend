import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletProfileFormComponent } from './complet-profile-form.component';

describe('CompletProfileFormComponent', () => {
  let component: CompletProfileFormComponent;
  let fixture: ComponentFixture<CompletProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletProfileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
