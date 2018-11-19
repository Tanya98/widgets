import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { data$, IInfo } from '../data';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output() public selectType: EventEmitter<any> = new EventEmitter();
  @Output() public selectedItem: EventEmitter<any> = new EventEmitter();

  public bg_image = 'assets/images/marina-bay-sands.jpg';
  public data$ = data$;
  public unsortedData: IInfo[] = [];
  public sortedByType: IInfo[] = [];
  public selected = {};
  public filterType = '';
  constructor() { }

  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.unsortedData = data;
      this.onChange('hotel');
    });
  }

  onChange(type: string): void {
    this.sortedByType = this.unsortedData.filter(function (item) {
      return item.type === type;
    });
    this.selected = this.sortedByType[0];
  }

  navClick(event, type) {
    this.onChange(type);
    this.selectType.emit();
  }

  clicked(event, card): void {
    this.selected = card;
    this.selectedItem.emit();
  }
}


