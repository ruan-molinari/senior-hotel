import { TestBed } from '@angular/core/testing';

import { CheckInService } from './check-in.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CheckIn } from '../../shared/models/check-in';

import { GlobalConstants } from '../../shared/global-constants';

describe('CheckInService', () => {
  let httpTestingController: HttpTestingController;
  let service: CheckInService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [provideHttpClientTesting()]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(CheckInService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('#getAll deveria retornar valores esperados', (done) => {
    const checkInStub: CheckIn[] = [
      {
        pessoa: {
          nome: 'Maria',
          CPF: '12345',
          telefone: '4444-4444',
        },
        dataEntrada: '2024-05-05T12:00:00',
        dataSaida: '2024-05-10T12:00:00',
        adicionalVeiculo: false
      },
      {
        pessoa: {
          nome: 'Pedro',
          CPF: '5313',
          telefone: '31415926',
        },
        dataEntrada: '2024-04-10T12:00:00',
        dataSaida: '2024-04-15T12:00:00',
        adicionalVeiculo: false
      }
    ];

    service.getByDate(false).subscribe(result => {
      expect(result).toEqual(checkInStub);
      done();
    })

    const testRequest = httpTestingController.expectOne(`${GlobalConstants.apiUrl}/pessoa`);

    testRequest.flush(checkInStub);
  })

  it('#save deveria fazer post na api', (done) => {
    service.save({} as CheckIn).subscribe(_ => {
      done();
    })

    const testRequest = httpTestingController.expectOne(`${GlobalConstants.apiUrl}/pessoa`);

    expect(testRequest.request.method).toEqual('POST');

    testRequest.flush({} as CheckIn);
  })

  it('#save body deveria ser valor esperado', (done) => {
    const pessoasStub: CheckIn = {
        pessoa: {
          nome: 'Maria',
          CPF: '12345',
          telefone: '4444-4444',
        },
        dataEntrada: '2024-05-05T12:00:00',
        dataSaida: '2024-05-10T12:00:00',
        adicionalVeiculo: false
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

