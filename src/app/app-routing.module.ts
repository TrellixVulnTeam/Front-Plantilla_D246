import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisenoHeaderComponent } from './components/diseno-header/diseno-header.component';
import { FullcalendarExampleComponent } from './components/fullcalendar-example/fullcalendar-example.component';
import { PruebaInicialComponent } from './components/prueba-inicial/prueba-inicial.component';

const routes: Routes = [
  {path: 'PruebaInicial', component: PruebaInicialComponent},
  {path: 'Buscador', component: DisenoHeaderComponent},
  {path: 'Fullcalendar', component: FullcalendarExampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
