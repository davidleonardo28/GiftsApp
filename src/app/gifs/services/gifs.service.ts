import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({
  providedIn: 'root',
})
export class GifsService {

  gifList : Gif []  = [];
  private _tagsHistory: string[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', environment.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(
        `${environment.serviceUrl}/search`,{params})
      .subscribe((resp ) => {
        this.gifList = resp.data;
      });
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    /** Inserta los valores proporcionados al inicio de un objeto del tipo array unshift */
    this._tagsHistory.unshift(tag);
    /** Crear una matriz dinámica de la concatenación elemento por elemento splice */
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('History', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('History')) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('History')!);
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }
}
