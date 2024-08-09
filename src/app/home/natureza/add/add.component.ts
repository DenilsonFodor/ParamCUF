import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDialogService } from '@po-ui/ng-components';
import { Location } from '@angular/common';
import { NaturezaService } from '../natureza.service';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {

  constructor(private location: Location,
              private natService: NaturezaService,
              private storageService: StorageService,
              private poDialog: PoDialogService) {}

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, 
            { label: 'Naturezas', link: 'home/natureza' },
            { label: 'Incluir' }
    ]
  };

  regNat: any = {
   // ['char-1'] :"",
   // ['date-1']:null,
   // ['int-1']:0,
    ['it-codigo']:"",
    ['nat-operacao']:"",
   // ['pRowid']:"",
    ['zera-aliq']:true
  }

  action: string = ''
  escondeTimer = true
  registroADD: any = []
  
  ngOnInit(): void {
  
  }

  salvar() {
    this.poDialog.confirm({
      title: 'Inclusão de Registro',
      message: `Confirma a inclusão do registro?`,
      confirm: () => this.gravaRegistro(),
      cancel: () => {}
    })
  } 

  gravaRegistro() {
    this.escondeTimer = false
    let jsonRegistros = JSON.stringify(this.regNat);
    this.registroADD = jsonRegistros
    console.log(this.registroADD)
    this.natService.addReg(this.registroADD).subscribe(
      resposta => {
          console.log(resposta)
          this.storageService.setDados('LastADD', this.registroADD) 
          
        }
    )
    this.escondeTimer = true
    this.location.back();
    
  }
 
  cancelar(): void {
    this.location.back(); // Volta para a página anterior
  }

}