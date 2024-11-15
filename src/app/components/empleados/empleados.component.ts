import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpEmpleadosService } from '../../services/http-empleados.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  private formbuilder = new FormBuilder();
  empleadosForm = this.formbuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    direccion: [''],
    posicion: ['', Validators.required],
    salario: ['', Validators.required],
    contrato: [''],
    estado: ['', Validators.required]
  });

  empleados: any;
  mensaje: any;
  empleadoEditar: any = null;

  constructor(private empledosService: HttpEmpleadosService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empledosService.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  guardar() {
    if (this.empleadoEditar) {
      // Si estamos editando, actualizamos el empleado
      this.empledosService.updateEmpleado(this.empleadoEditar.id, this.empleadosForm.value).subscribe(data => {
        this.mensaje = 'Empleado actualizado con éxito';
        console.log(this.mensaje);
        this.cargarEmpleados(); // Recargar la lista de empleados después de actualizar
        this.empleadoEditar = null; // Limpiar la variable después de la actualización
      });
    } else {
      // Si no estamos editando, creamos un nuevo empleado
      this.empledosService.createEmpleado(this.empleadosForm.value).subscribe(data => {
        this.mensaje = 'Empleado creado con éxito';
        console.log(this.mensaje);
        this.cargarEmpleados(); // Recargar la lista de empleados después de crear
      });
    }
  }

  editar(empleado: any) {
    this.empleadoEditar = empleado;
    this.empleadosForm.setValue({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      telefono: empleado.telefono,
      direccion: empleado.direccion,
      posicion: empleado.posicion,
      salario: empleado.salario,
      contrato: empleado.contrato,
      estado: empleado.estado
    });
  }

  eliminar(id: number) {
    this.empledosService.deleteEmpleado(id).subscribe(data => {
      this.mensaje = 'Empleado eliminado con éxito';
      console.log(this.mensaje);
      this.cargarEmpleados(); // Recargar la lista de empleados después de eliminar
    }, error => {
      this.mensaje = 'Error al eliminar empleado';
      console.error('Error al eliminar empleado:', error);
    });
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
