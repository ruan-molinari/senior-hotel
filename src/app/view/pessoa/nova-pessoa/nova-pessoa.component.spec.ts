import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPessoaComponent } from './nova-pessoa.component';
import { HttpClientModule } from '@angular/common/http';

describe('NovaPessoaComponent', () => {
  let component: NovaPessoaComponent;
  let fixture: ComponentFixture<NovaPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaPessoaComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
