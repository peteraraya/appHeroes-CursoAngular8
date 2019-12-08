import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
// SweetAlert2
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  //asignamos el heroe
  heroe = new HeroeModel();



  constructor(
          // Para utilizar el servicio inyectamos
          private heroesService: HeroesService,
          // Leer del url
          private route: ActivatedRoute
          ) { }

  ngOnInit() {
    // Logica para establecer id por heroe
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    // Preguntar si es nuevo o tengo el id
    if ( id !== 'nuevo') {

      this.heroesService.getHeroe(id)
      .subscribe( (resp: HeroeModel) => {
          console.log(resp);
          this.heroe = resp;
          this.heroe.id = id;
      });


    }
  }


  // Condicioón si actualizar o crear


  guardar( form: NgForm){

    if (form.invalid) {
      console.log('formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espera',
      text:  'Guardar información',
      icon: 'info',
      allowOutsideClick: false
    });

    let peticion: Observable<any>;


    Swal.showLoading(); // para reemplazar el boton ok

    if ( this.heroe.id) {
      // voy actualizar
      // LLamar el metodo crear
     peticion =  this.heroesService.actualizarHeroe(this.heroe);
        // .subscribe(resp => {  // para que la petición se dispare
        //   console.log(resp);
        // });
    } else {
      // voy a crear
      // LLamar el metodo crear
     peticion =  this.heroesService.crearHeroe(this.heroe);
        // .subscribe(resp => {  // para que la petición se dispare
        //   console.log(resp);
        //   this.heroe = resp;
        // });
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });

    // console.log(form);
    // console.log(this.heroe);
  }
}
