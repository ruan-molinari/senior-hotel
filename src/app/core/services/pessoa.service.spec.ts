import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { PessoaService } from './pessoa.service';
import { HttpClientModule } from '@angular/common/http';
import { Pessoa } from '../../shared/models/pessoa';
import { GlobalConstants } from '../../shared/global-constants';

describe('PessoaService', () => {
  let httpTestingController: HttpTestingController;
  let service: PessoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [provideHttpClientTesting()]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(PessoaService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('#getAll deveria retornar valores esperados', (done) => {
    const pessoasStub: Pessoa[] = [
      {
        nome: 'Maria',
        CPF: '12345',
        telefone: '4444-4444',
      },
      {
        nome: 'Joao',
        CPF: '54321',
        telefone: '123-1234',
      },
    ];

    service.getAll().subscribe(pessoas => {
      expect(pessoas).toEqual(pessoasStub);
      done();
    })

    const testRequest = httpTestingController.expectOne(`${GlobalConstants.apiUrl}/pessoa`);

    testRequest.flush(pessoasStub);
  })

  it('#save deveria fazer post na api', (done) => {
    service.save({} as Pessoa).subscribe(_ => {
      done();
    })

    const testRequest = httpTestingController.expectOne(`${GlobalConstants.apiUrl}/pessoa`);

    expect(testRequest.request.method).toEqual('POST');

    testRequest.flush({} as Pessoa);
  })

  it('#save body deveria ser valor esperado', (done) => {
    const pessoasStub: Pessoa = {
      nome: 'Maria',
      CPF: '12345',
      telefone: '4444-4444',
    };

    service.save(pessoasStub).subscribe(pessoa => {
      expect(pessoa).toBeDefined();
      expect(pessoa).toEqual(pessoasStub);
      done();
    })

    const testRequest = httpTestingController.expectOne(`${GlobalConstants.apiUrl}/pessoa`);

    expect(testRequest.request.body).toEqual(pessoasStub);

    testRequest.flush(pessoasStub);
  })
});
