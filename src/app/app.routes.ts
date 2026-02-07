import { Routes } from '@angular/router';
import { RuleListComponent } from './Rule-request-types/rule-list/rule-list.component';
import { RuleDetailsComponent } from './Rule-request-types/rule-details/rule-details.component';

export const routes: Routes = [
  {
    path: 'rules',
    component: RuleListComponent,
    children: [
      { path: 'details', component: RuleDetailsComponent },           
      { path: 'details/:id', component: RuleDetailsComponent },       
      { path: 'details/:id/view', component: RuleDetailsComponent }  
    ]
  },
  { path: '', redirectTo: 'rules', pathMatch: 'full' }
];
