import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: ` 
    <h5>Buscar:  </h5>
    <input type="text"
    class="form-control custom-input"
    placeholder="Buscar gifs"
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
    ` ,
    styleUrl: './search-box.component.css'
})

export class SearchBoxComponent  {

    @ViewChild('txtTagInput')
    /** !Not null operator  **/ 
    private tagInput!: ElementRef<HTMLInputElement>;



    constructor(
        private gifsService: GifsService
    ) { }

    searchTag (){
        const newTag = this.tagInput.nativeElement.value;
        this.gifsService.searchTag(newTag);

        this.tagInput.nativeElement.value= '';
    }



}