import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarMesaComponent } from './components/reservar-mesa/reservar-mesa.component';

const routes: Routes = [
  {path: 'reservarMesa', component: ReservarMesaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
