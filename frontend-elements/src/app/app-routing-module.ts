import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodicTableComponent } from './periodic-table/periodic-table/periodic-table.component';
import { PeriodicResolver } from './resolvers/periodic.resolver';

const routes: Routes = [
  {  
    path: 'periodic-table', 
    component: PeriodicTableComponent,
    resolve: {
      periodic: PeriodicResolver
    }
  },
  { 
    path: '**', redirectTo: 'periodic-table' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
