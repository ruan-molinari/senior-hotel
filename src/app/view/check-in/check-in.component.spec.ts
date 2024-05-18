import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInComponent } from './check-in.component';
import { HttpClientModule } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInComponent, HttpClientModule],
      providers: [provideNgxMask()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
