import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  listFilter: string = 'cart'; 
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;

  @ViewChild('filterElement') filterElementRef: ElementRef;   // this 'filterElement' gets access to the corresponding DOM
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits:' + this.hitCount;
    }
  }
  
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if(this.filterElementRef)
    {
      this.filterElementRef.nativeElement.focus();
    }
  }
}
