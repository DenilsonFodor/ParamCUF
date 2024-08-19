import { StorageService } from './../../storage.service';
import { NaturezaService } from './natureza.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoDialogService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-natureza',
  templateUrl: './natureza.component.html',
  styleUrl: './natureza.component.css'
})
export class NaturezaComponent implements OnInit {


constructor(private natService: NaturezaService,
            private storageService: StorageService,
            private router: Router,
            private poDialog: PoDialogService) {}

  filtros: any = {
    pageSize: '100' ,
    page: '1'
  };

  actions: Array<PoPageAction> = [
    { label: 'Incluir', action: this.incluiRegistros.bind(this)}
  ]

  columnsNatur:Array<PoTableColumn> = [
    { property: "it-codigo",    label: "Item/Serviço"} ,
    { property: "nat-operacao", label: "Natureza"} ,
    { property: "zera-aliq",    label: "Zera Aliquota", type: 'boolean',
      labels: [ { value: 'true',  color: 'green', label: "SIM"},
                { value: 'false', color: 'red',   label: "NAO"}
      ]
    } 
  ]

  actionsNatur: Array<PoTableAction> = [
    { label: 'Editar',  icon: "po-icon-edit",   action: this.editaRegistros.bind(this)},
    { label: 'Excluir', icon: "po-icon-delete", action: this.excluir.bind(this)},
  ]

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Naturezas' }]
  };

  itemsNatur: any
  hasMore$!: boolean
  escondeTimer = true

  ngOnInit(): void {
    this.atualizaDados()
      
    ;
  }

  atualizaDados() {
    this.escondeTimer = false
    this.filtros.page = 1
    this.natService.getAll(this.filtros).subscribe({
      next:result => {
        this.escondeTimer = true
        this.itemsNatur = result.items
        this.hasMore$ = result.hasNext
      },
      error:erro => {

        console.log(erro)
      },
    })
  }
 
  incluiRegistros(): void {
    this.router.navigate(['/home/natureza/add'])
  }

  editaRegistros(reg: any) {
    this.storageService.setDados('ItemNatur', reg) 
    this.router.navigate(['/home/natureza/upd'])
    
  }

  excluir(reg: any) {
    this.poDialog.confirm({
      title: 'Exclusão de Registro',
      message: `Confirma a exclusão do registro?`,
      confirm: () => this.excluiRegistros(reg),
      cancel: () => {}
    })
    
  }
  excluiRegistros(reg: any) {
    this.escondeTimer = false
    this.natService.delReg(reg.pRowid).subscribe(
      retorno => {
        this.atualizaDados();
      }
    ) 
    this.escondeTimer = true
    
    
      
  }
}
