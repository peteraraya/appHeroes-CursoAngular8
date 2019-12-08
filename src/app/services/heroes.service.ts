import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
// Operador map sirve para transformar lo que un observador puede regresar
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {


  // Propiedad privada para copiar la url del servicio
  private url = 'https://crud-angular8.firebaseio.com';

  constructor(
              // Para poder utilizar las peticiones http necesito inicializar el servicio http
              private http: HttpClient
            ) { }

  crearHeroe( heroe: HeroeModel){
    // Llame este metodo para retornar información a la pagina que llame este metodo de mi servicio
    return this.http.post(
      `${this.url}/heroes.json`,heroe
      ).pipe(
        map( (resp:any) => {
          heroe.id = resp.name;
          return heroe
        })
      );
  }


  actualizarHeroe( heroe: HeroeModel){

    // Rompemos la referencia para no enviar id
    const heroeTemp = {
      ...heroe // creara un objeto con todas propiedades 
    };

    // Ahora podemos borrar sin perder la referencia de js
    delete heroeTemp.id;

    // puts para actualizar
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroe);
  }


  borrarHeroe( id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }



  // Obtener un heroe por id para traer los datos cargados
  getHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${ id }.json`);
  }

  getHeroes(){
    // Mostrar toda información
    return this.http.get(`${ this.url }/eroes.jsonh`)
    .pipe(
        // operador map : transforma la infp y regresa cualquier otra COSA
        map( this.crearArreglo ),
         delay(1500) // retrasa la carga
    );
  }

private crearArreglo( heroesObj: Object){

  const heroes: HeroeModel[] = [];

  console.log(heroesObj);

  // Validar si en la bd no tenemos ningun dato
  if ( heroesObj === null ){ return []; }

  // Transformo los datos en un array
  Object.keys(heroesObj).forEach(key =>{

    const heroe: HeroeModel = heroesObj[key];
    heroe.id = key;

    heroes.push(heroe);

  });
  return heroes;
}


}

// Si hace un posteo correcto en firebase