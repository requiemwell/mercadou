
import { Injectable, OnDestroy } from '@angular/core';

import { ApiService } from '../api/api.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositorioService implements OnDestroy {

  private personagens: any[] = [] //armazenas as personagens que irão embarcar na nave 
  private inscricao: Subscription[] = [] // para desinscrição do subscrible

  constructor(private apiService: ApiService) { }

  /**
   * retorna o array de personagens
  **/
  getPersonagens() {
    return this.personagens
  }

  /**
   * metodo responsavél por popular o array 
   * de personagens
   * @parameter urls: array com as urls das personagens 
   * que irão embarcar na nave
   **/
  embarcar(urls: string[]) {
    // para cada url do array é feita uma busca na api
    urls.forEach(url => {
      this.inscricao.push(this.apiService.getPeoples(url).subscribe({
        next: p => this.personagens.push(p)
      }))
    })
  }

  /**
   * Metodo para escolher 5 personagens aleatorios
   * @parameter p: array com as personagens `a serem escolhidas 
   * aleatoriamente
   **/
  personagensAleatorios(p: string[]) {
    let escolhidos = [];
    while (escolhidos.length < 5) {
      let ind = Math.floor(Math.random() * p.length)
      if (!escolhidos.includes(p[ind])) //garante a não duplicidade de personagens no array
        escolhidos.push(p[ind])
    }
    this.embarcar(escolhidos)//os cinco escolhidos para embarcar
  }

  ngOnDestroy() {
    // this.inscricao.unsubscribe()
    this.inscricao.forEach(ins => ins.unsubscribe())
  }
}
