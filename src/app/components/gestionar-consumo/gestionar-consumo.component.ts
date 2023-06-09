import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { Cabecera, Detalle } from 'src/app/models/GestionConsumo';
import { Mesa } from 'src/app/models/Mesa';
import { Producto } from 'src/app/models/Producto';
import { ClienteService } from 'src/app/services/cliente.service';
import { MesaService } from 'src/app/services/mesa.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from 'src/app/services/producto.service';
import { GestionConsumoService } from 'src/app/services/gestion-consumo.service';
import { PDFDocument, StandardFonts } from 'pdf-lib';


@Component({
  selector: 'app-gestionar-consumo',
  templateUrl: './gestionar-consumo.component.html',
  styleUrls: ['./gestionar-consumo.component.css']
})
export class GestionarConsumoComponent {
  listaMesas: Mesa[] = [];
  productos: Producto[] = [];
  detallesDeConsumo: Detalle[] = [];
  dataSourceDetallesDeConsumo: MatTableDataSource<any> =  new MatTableDataSource<any>(this.detallesDeConsumo);
  // seleccionar mesa
  idMesa?: number;
  puedoSeleccionarMesa = true;
  mesaSeleccionada = false;
  //seleccionar producto y cantidad
  idProducto: number = 1;
  cantidad: number = 0;
  // id cabecera y total
  idCabecera?: number;
  total?: number;  
  //setear cliente
  cliente?: Cliente;
  nroCedula = "";
  nombresApellidos = "";
  nombres = "";
  apellidos = "";
  clienteEncontrado = false;


  constructor( private servicioMesas: MesaService, 
    private servicioClientes: ClienteService, 
    private servicioProductos: ProductoService,
    private servicioGestionConsumo: GestionConsumoService
    ) { }

  ngOnInit(): void {
    this.getMesas();
    this.getProductos();
  }

  getProductos(){
    this.servicioProductos.getProductos().subscribe({
      next: (entity) => {
        this.productos = entity.datos;
      },
      error: (e) => console.log(e)
    });
  }

  getMesas(){
    this.servicioMesas.getMesas().subscribe({
      next: (entity) => {
        this.listaMesas = entity.datos;
      },
      error: (e) => console.log(e)
    });
  }

  verificarMesa(){
    console.log("verificar mesa");
    console.log(this.idMesa);
    this.servicioGestionConsumo.verificarMesa(this.idMesa!).subscribe({
      next: (entity) => {
        console.log("datos:",entity.datos);
        this.mesaSeleccionada = true;
        if (entity.datos.length>0){
          let datos = entity.datos[0];
          //setear cliente
          this.cliente = datos.clientes;
          this.nroCedula = this.cliente!.nroDocumento
          this.nombres = this.cliente!.nombres;
          this.apellidos = this.cliente!.apellidos;
          this.nombresApellidos = this.nombres + " " + this.apellidos;
          this.clienteEncontrado = true;
          console.log(this.cliente);
          //setear idCabecera
          this.idCabecera = datos.idCabecera;
          this.total = datos.total;
          //setear detalles
          this.detallesDeConsumo = datos.detalles!;
          console.log("detalles de consumo", this.detallesDeConsumo);
          this.dataSourceDetallesDeConsumo.data = this.detallesDeConsumo;
          for (let d of this.detallesDeConsumo){
            this.servicioProductos.getProductoById(d.idProducto).subscribe({
              next: (entity) => {
                d.nombreProducto = entity.datos?.nombreProducto; 
                this.dataSourceDetallesDeConsumo.data = this.detallesDeConsumo;
                console.log(d.nombreProducto);
              },
              error: (e) => console.log(e)
            });
          }
        }
        else {
          console.log("no existe cabecera");
          this.detallesDeConsumo = [];
          this.dataSourceDetallesDeConsumo.data = this.detallesDeConsumo;
          this.nroCedula = '';
          this.clienteEncontrado = false;
          this.nombresApellidos = '';
        }
      },
      error: (e) => console.log(e)
    });
  }

  getCliente(){
    console.log("get cliente con ci:", this.nroCedula);
    this.clienteEncontrado = false;
    this.nombresApellidos = "";
    if (this.nroCedula!="") {
      this.servicioClientes.getCliente({nroDocumento : this.nroCedula}).subscribe({
        next: (entity) => {
          this.cliente = entity.datos;
          console.log(this.cliente);
          if (this.cliente) {
            this.nombresApellidos = this.cliente.nombres + " " + this.cliente.apellidos;
            this.nombres = this.cliente.nombres;
            this.apellidos = this.cliente.apellidos;
            this.clienteEncontrado = true;
          }
          this.checkFormCompletion();
        },
        error: (e) => console.log(e)
      });
    }
    else{
      this.checkFormCompletion();
    }
  }

  agregarDetalle(){
    //console.log(this.cantidad);
    //console.log(Number.isInteger(+this.cantidad))
    if (this.idProducto>0 && this.cantidad!= null && Number.isInteger(+this.cantidad) && this.cantidad>0){
      let detalle = new Detalle(this.idProducto, this.cantidad);
      //console.log("idcabecera",this.idCabecera);
      detalle['idCabecera'] = this.idCabecera;
      this.servicioGestionConsumo.insertarDetalle(detalle).subscribe(
        {
          next: (data) => {
            console.log(data);
            this.total = data.datos?.totalCabecera;
            let detalle = new Detalle(this.idProducto, this.cantidad);
            this.servicioProductos.getProductoById(this.idProducto).subscribe({
              next: (entity) => {
                detalle.nombreProducto = entity.datos?.nombreProducto; 
                console.log(detalle.nombreProducto);
                this.detallesDeConsumo.push(detalle);
                this.dataSourceDetallesDeConsumo.data = this.detallesDeConsumo;
              },
              error: (e) => console.log(e)
            });
            //resetear valores
            this.idProducto = 1;
            this.cantidad = 0;
          }, 
          error: (e) => {console.log(e)}
        }
      );
    }
  }

  cerrarMesa(){
    console.log("cerrar mesa");
    this.servicioGestionConsumo.cerrarMesa(this.idMesa!).subscribe({
      next: (entity) => {
        console.log(entity);
        if (entity.datos){
          let cabeceraCerrada: Cabecera = entity.datos;
          console.log("cabeceraCerrada.idCabecera",cabeceraCerrada.idCabecera);
          this.detallesDeConsumo = [];
          this.dataSourceDetallesDeConsumo.data = this.detallesDeConsumo;
          this.servicioGestionConsumo.getStringBase64(cabeceraCerrada.idCabecera!).subscribe({
            next: (entity) => {
              console.log(entity);
              let base64String = entity.datos;
              // Usage
              const pdfBytesPromise = this.convertBase64ToPDF(base64String!);
              const fileName = 'output.pdf';

              pdfBytesPromise
                .then((pdfBytes: Uint8Array) => {
                  return this.savePDFToFile(pdfBytes, fileName);
                })
                .then(() => {
                  console.log('PDF saved successfully.');
                })
                .catch((error: any) => {
                  console.error('Error saving PDF:', error);
                });
            },
            error: (e) => console.log(e)
          });
        }
        else{
          console.log("no hay datos");
        }
      },
      error: (e) => console.log(e)
    });
  }
  checkFormCompletion(){
    
  }

  convertBase64ToPDF(base64String: string): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      try {
        const pdfBytes = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
        resolve(pdfBytes);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  savePDFToFile(pdfBytes: Uint8Array, fileName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
  
        window.URL.revokeObjectURL(url);
  
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }


}
