import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./Inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'ubicacion',
        loadChildren: () => import('./ubicacion/ubicacion.module').then(m => m.UbicacionPageModule)
      },
      {
        path: 'notificacion',
        loadChildren: () => import('./notificacion/notificacion.module').then(m => m.NotificacionPageModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
