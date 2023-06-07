import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarMesaComponent } from './components/reservar-mesa/reservar-mesa.component';
import { ListarReservasComponent } from './components/listar-reservas/listar-reservas.component';
import { GestionarConsumoComponent } from './components/gestionar-consumo/gestionar-consumo.component';

const routes: Routes = [
  {path: 'reservarMesa', component: ReservarMesaComponent},
  {path: 'listarReservas', component: ListarReservasComponent},
  {path: 'gestionarConsumo', component: GestionarConsumoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
