import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  cargando = true;


  constructor( private heroesService : HeroesService) { }

  ngOnInit() {
    // inicio cargando
    this.cargando = true;

    // Llamo metodo para traer información de los heroes
    this.heroesService.getHeroes()
    .subscribe( resp =>{
      this.heroes = resp;
      // false el cargando
      this.cargando = false;
    });
  
}


borrarHeroe( heroe: HeroeModel, i :number){

  Swal.fire({
    title: 'Esta seguro??',
    text: `Esta seguro que desea eliminar a ${ heroe.nombre}?`,
    icon: 'question',
    showConfirmButton: true,
    showCancelButton: true
  }).then( resp =>{
    // Si la respuesta es true ( OK )
    if(resp.value){
      //Borro en la posición i solo 1
      this.heroes.splice(i, 1);
      this.heroesService.borrarHeroe(heroe.id).subscribe();
    }
    // caso contrario ignora( Cancel )
  });

}


}