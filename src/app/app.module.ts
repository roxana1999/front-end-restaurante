import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservarMesaComponent } from './components/reservar-mesa/reservar-mesa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RestauranteService } from './services/restaurante.service';
import { ClienteService } from './services/cliente.service';
import { MesaService } from './services/mesa.service';
import { ReservaService } from './services/reserva.service';
import { ListarReservasComponent } from './components/listar-reservas/listar-reservas.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservarMesaComponent,
    ListarReservasComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [RestauranteService, ClienteService, MesaService, ReservaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
