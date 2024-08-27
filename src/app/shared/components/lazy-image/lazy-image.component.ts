import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  url!: string;

  @Input()
  alt: string = '';

  hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is requried');
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 800);
  }
}
