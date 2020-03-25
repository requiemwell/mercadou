import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService } from '../share/api/api.service';

@Component({
  selector: 'filme',
  templateUrl: './filme.component.html',
})
export class FilmeComponent implements OnInit, OnDestroy {

  private id: number = 1 //o id do filme à ser buscado na API
  public filme: any // atributo que irá receber o filme retornado da API
  inscricao: Subscription // atributo para realização do unsubscribe

  constructor(private apiService: ApiService) { }//injeção da dependencia ApiService

  ngOnInit() {
    // inscrição para recebimento do get do filme
    this.inscricao = this.apiService.getFilm(this.id).subscribe({
      next: f => this.filme = f
    })
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe()
  }

}
