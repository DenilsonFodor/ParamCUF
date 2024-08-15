import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDialogService, PoLookupColumn } from '@po-ui/ng-components';
import { Location } from '@angular/common';
import { NaturezaService } from '../natureza.service';
import { StorageService } from '../../../storage.service';
import { ProductService } from '../product.service';
import { NatOperacaoService } from '../nat-operacao.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  constructor(private location: Location,
              private natService: NaturezaService,
              private storageService: StorageService,
              private poDialog: PoDialogService,
              public prodService: ProductService,
              public natOperacaoService: NatOperacaoService
            ) {
            }

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, 
            { label: 'Naturezas', link: 'home/natureza' },
            { label: 'Incluir', link: undefined }
    ]
  };

  public readonly columnsProduto: Array<PoLookupColumn> = [
    { property: 'product',              label: 'Item' },
    { property: 'productDescription',   label: 'Descricao' },
    { property: 'fiscalClassification', label: 'Class.Fiscal' }
  ];

 
  public readonly columnsNatOperacao: Array<PoLookupColumn> = [
    { property: 'cfopCode',        label: 'CFOP' },
    { property: 'description',     label: 'Descricao' },
    { property: 'descriptionType', label: 'Tipo' },
    { property: 'natOperation',    label: 'Nat.Operacao' },
  ];

  public readonly obrigatorio: boolean = true

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
  endpoint: string = ''
  header: any
  escondeTimer = true
  registroADD: any = []

  entity:any;
  filmItemsFiltered:any;
  filterParams = 'people';
  
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