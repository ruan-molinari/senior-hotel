import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginaPipe',
  standalone: true
})
export class PaginaPipe implements PipeTransform {

  transform<T>(value: T[], pagina: number, porPagina: number): T[] {
    return value.slice(pagina * porPagina, (pagina + 1) * porPagina);
  }

}
