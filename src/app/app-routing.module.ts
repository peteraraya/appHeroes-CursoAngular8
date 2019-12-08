import { NgModule } from '@angular/core';

// definir la ruta
import { Routes, RouterModule } from '@angular/router';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent},
  { path: 'heroe/:id', component: HeroeComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes, {useHash:true} ) // archivo de rutas principal
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
