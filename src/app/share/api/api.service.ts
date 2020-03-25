import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Classe de serviço para realizaçaõ de requisições 
 * à API
 **/
export class ApiService {
  
  urlStarchip: string = "https://swapi.co/api/starships/"
  urlFilm: string = "https://swapi.co/api/films/"

  constructor(private http: HttpClient) { }

  /**
   * Metodo para o get da starchip
   * @parameter id: id da nave
   **/
  getStarchip(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlStarchip} + ${id}`)
  }

  /**
   * Metodo para o get do filme
   * @parameter id: id do filme
   **/
  getFilm(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlFilm} + ${id}`)
  }

  /**
   * Metodo para o get da personagem
   * @parameter url: endereço da personagem
   **/
  getPeoples(url: string): Observable<any> {
    return this.http.get<any>(url)
  }
}
