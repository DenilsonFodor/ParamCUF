import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

menus: Array<PoMenuItem> = [
  { label: 'Naturezas', 
    link: 'natureza', 
    icon: 'po-icon-parameters', 
    shortLabel: 'Naturezas'
  }
]

ngOnInit(): void {
  
}


}
