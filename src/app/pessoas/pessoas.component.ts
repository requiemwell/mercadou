import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RepositorioService } from '../share/repositorio/repositorio.service';

@Component({
  selector: 'pessoas',
  templateUrl: './pessoas.component.html',
})

export class PessoasComponent implements OnInit {
  @Input()crew:string[] //array com as urls da tripulaçãa da nave
  @Input()characters:string[] //array com as urls dos personagens do filme
  @Output()pesoTot = new EventEmitter()// o valor é passado para o componete pai(nave) 

  passageiros:any[] // array `a ser populado pelo repositorio.service
  
  usuario = {name: 'Você', mass: 0}//o sexto tripulante
 
  constructor(private repo:RepositorioService) { } //injeção da depencencia RepositorioService

  ngOnInit() {
    /**
     * as personagens aleatorias são escolhidas atráves do metodo
     * da classe de serviço RepositorioService recebendo como parametro as personagens do
     * filme e estes são filtrados, removendo as 4 personagens que sao os tripulantes da nave
     * para não haver duplicidades no array.
     * a tripulação é embarcada pelo metodo embarcar()
     **/
    this.repo.personagensAleatorios(this.characters.filter(p => !this.crew.includes(p)))
    this.repo.embarcar(this.crew)//embarcando os 4 tripulantes
    this.passageiros = this.repo.getPersonagens()//array populado com as personagens retornadas
    this.passageiros.push(this.usuario)// o usuario é colocado com as demais personaens
   }

  /**
   * Metodo responsavel por calcular o peso total
   * dos ocupantes da nave e emitir o valor para o componente nave
   * que verificará se o peso excede o permitido
   **/
  pesoTtotal(){
    let peso = this.passageiros
      .map(p=>{
        if(p.mass.toString().indexOf(',') > -1) // remove a virgula usada como separador decimal
          p.mass = p.mass.toString().replace(/,/gi,'')
        return +p.mass
      })
      .reduce((curr,prev)=>curr += isNaN(prev)?80:prev,0)//valor arbitrário em caso de 'unknown'
    this.pesoTot.emit(peso)//emitindo o resultado
  }
}
