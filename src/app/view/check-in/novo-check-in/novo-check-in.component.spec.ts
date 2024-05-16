import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCheckInComponent } from './novo-check-in.component';

describe('NovoCheckInComponent', () => {
  let component: NovoCheckInComponent;
  let fixture: ComponentFixture<NovoCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoCheckInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovoCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
