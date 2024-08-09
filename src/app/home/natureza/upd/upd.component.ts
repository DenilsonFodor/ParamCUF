import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDialogService } from '@po-ui/ng-components';
import { Location } from '@angular/common';
import { NaturezaService } from '../natureza.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-upd',
  templateUrl: './upd.component.html',
  styleUrl: './upd.component.css'
})

export class UpdComponent implements OnInit {

  constructor(private location: Location,
              private natService: NaturezaService,
              private storageService: StorageService,
              private poDialog:PoDialogService,
              private route:ActivatedRoute,
              private router: Router) {}

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, 
            { label: 'Naturezas', link: 'home/natureza' },
            { label: 'Alterar' }
    ]
  };

  regUpdNat: any = {
    ['char-1'] :"",
    ['date-1']:null,
    ['int-1']:0,
    ['it-codigo']:"",
    ['nat-operacao']:"",
    ['pRowid']:"",
    ['zera-aliq']:true
  }

  RetornoDados: string = ''

  action: string = ''
  escondeTimer = true
  regsRelatorio: any = []
  
  ngOnInit(): void {
    this.regUpdNat = this.storageService.getDados('ItemNatur')
  }

  salvar() {
    this.poDialog.confirm({
      title: 'Alteração de Registro',
      message: `Confirma a alteração do registro?`,
      confirm: () => this.gravaRegistro(),
      cancel: () => {}
    })
  } 
  

  gravaRegistro() {
    this.escondeTimer = false
    let jsonRegistros = JSON.stringify(this.regUpdNat);
    this.regsRelatorio = jsonRegistros
    console.log(jsonRegistros)
    this.natService.updReg(this.regsRelatorio).subscribe(
      resposta => {
          console.log(resposta)
          this.escondeTimer = true
        }
    )
    this.storageService.removeDados('ItemNatur')
    this.location.back();
    
  }
 
  cancelar(): void {
    this.location.back(); // Volta para a página anterior
  }

}
