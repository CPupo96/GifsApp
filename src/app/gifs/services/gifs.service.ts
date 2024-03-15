import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


import { Gif, SearchGifsResponse } from '../interfaces/gifs,interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = '30qC3gWwspSUGC6jqWETH7Udk0j1oBzA';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];

  }

  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice( 0, 10);

      localStorage.setItem('historial', JSON.stringify( this._historial ) );
    }

    const params = new HttpParams()
          .set( 'api_key', this.apiKey )
          .set( 'limit', '10' )
          .set( 'q', query );

    this.http.get<SearchGifsResponse>(`${ this.servicioURL }/search`, { params })
      .subscribe( ( resp ) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ) );
      })
      

  }

}
