import { Component, OnInit, Input} from '@angular/core';
import { ApiService } from '../share/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nave',
  templateUrl: './nave.component.html',
})
export class NaveComponent implements OnInit{

  @Input()personagens:string[] //array com as urls das personagens do filme
  id:number = 10 // id da nave para para busca na API
  nave:any // atributo que receberá os dados referentes a nave Millenniun Falcon
  pilotos:any[] // array para as urls dos pilotos da nave
  capUtilizada:number = 99 // capacidade de carga utilizada em %
  decolar:string // atributo de controle para a decolagem da nave
  total:any // peso total dos ocupantes da nave para a decolagem
  inscricao:Subscription

  constructor(private apiService: ApiService) { } // injeção da classe de servico 

  ngOnInit() {
    /**
     * O id da nave é passado para o metodo da classe de serviço 
     * responsável por trazer os dados da nave    
    **/
    this.inscricao = this.apiService.getStarchip(this.id).subscribe({
      next: n => {
        this.nave = n
        this.pilotos = n.pilots
      },
      error: ()=> console.log("erro")
    })
  }

  /**
   * Metodo responsável pelo
   * controle da decolagem da nave com base
   * no parâmetro recebido
   * @parameter event: parâmetro enviado por um
   * emissor de evento do componente filho (pessoas.component),
   * é o peso total das personagens que irão embarcar na nave
   **/
  pesoTotal(event:number){
    this.total = event
    if(this.total < this.capDisponivel())//true se o peso total for menor 
      this.decolar='decolar'
    else
      this.decolar = 'excedido'
  }

  /**
   * Metodo responsável pelo cálculo da capacidade 
   * de carga ainda disponível na nave
   **/
  capDisponivel(){
    return this.nave.cargo_capacity * (1 - this.capUtilizada/100)
  }
 
  ngOndestroy(){
    this.inscricao.unsubscribe()
  }
}
