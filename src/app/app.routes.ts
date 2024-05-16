import { Routes } from '@angular/router';

const adminRountes: Routes = [
  {
    'path': '',
    pathMatch: 'full',
    redirectTo: 'check-in',
  },
  {
    path: 'check-in',
    // Como temos apenas uma pagina vou importar diretamente o componente aqui.
    // Em um projeto maior, modular as rodas de cada seção da aplicação seria um caminho melhor.
    loadComponent: () =>
      import('./view/check-in/check-in.component').then(
        m => m.CheckInComponent
      ),
  },
]

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin',
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./shared/layouts/admin/admin.component').then(
        m => m.AdminComponent
      ),
    children: adminRountes,
  }
];

