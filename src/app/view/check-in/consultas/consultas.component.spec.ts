import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultasComponent } from './consultas.component';
import { HttpClientModule } from '@angular/common/http';
import { Pessoa } from '../../../shared/models/pessoa';

const diaria = GlobalConstants.diaria;
const diariaFimDeSemana = GlobalConstants.diariaFimDeSemana;
const diariaGaragem = GlobalConstants.diariaGaragem;
const diariaGaragemFimDeSemana = GlobalConstants.diariaGaragemFimDeSemana;

describe('ConsultasComponent', () => {
  let component: ConsultasComponent;
  let fixture: ComponentFixture<ConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasComponent, HttpClientModule],
      providers: [CheckInService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deveria criar', () => {
    expect(component).toBeTruthy();
  });

  it('deveria calcular diaria', () => {
    let data = new Date('2010-01-01 12:00:00'); // sexta-feira
    expect(data.getDay()).toBe(5);

    let result = component.calcularDiaria(data, false);

    expect(result).toBe(diaria);
  })

  it('deveria calcular adicional de fim de semana', () => {
    let data = new Date('2010-01-02 12:00:00'); // sábado
    expect(data.getDay()).toBe(6);

    let result = component.calcularDiaria(data, false);

    expect(result).toBe(diariaFimDeSemana);
  })

  it('deveria calcular diaria com adicional de veiculo', () => {
    let data = new Date('2010-01-01 12:00:00'); // sexta-feira
    expect(data.getDay()).toBe(5);

    let result = component.calcularDiaria(data, true);

    expect(result).toBe(diaria + diariaGaragem);
  })

  it('deveria calcular diaria de fim de semana com adicional de veiculo', () => {
    let data = new Date('2010-01-02 12:00:00'); // sexta-feira
    expect(data.getDay()).toBe(6);

    let result = component.calcularDiaria(data, true);

    expect(result).toBe(diariaFimDeSemana + diariaGaragemFimDeSemana);
  })

  it('deveria calcular diarias em um range de datas', () => {
    let entrada = new Date('2010-01-01 12:00:00');
    let saida = new Date('2010-01-03 12:00:00');

    let result = component.calcularHospedagem({
      pessoa: {} as Pessoa,
      dataEntrada: entrada,
      dataSaida: saida,
      adicionalVeiculo: false,
    })

    expect(result).toBe(
      diaria + diariaFimDeSemana * 2
    );
  })

  it('deveria calcular mais uma diaria hora de saida por depois de 16:30', () => {
    let entrada = new Date('2010-01-01 12:00:00');
    let saida = new Date('2010-01-03 17:00:00');

    let result = component.calcularHospedagem({
      pessoa: {} as Pessoa,
      dataEntrada: entrada,
      dataSaida: saida,
      adicionalVeiculo: false,
    })

    expect(result).toBe(
      diaria * 2 + diariaFimDeSemana * 2
    );
  })
});import { GlobalConstants } from '../../../shared/global-constants';
import { CheckInService } from '../../../core/services/check-in.service';

