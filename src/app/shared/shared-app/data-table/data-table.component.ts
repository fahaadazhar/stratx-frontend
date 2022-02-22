import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() heading: string;
  @Input() tableBody: any;
  @Input() tableHeader: any;
  @Input() rowActions: string[];
  @Output() actionEvent = new EventEmitter(null);

  isLoading: boolean = true;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {

    if (simpleChanges.tableBody && simpleChanges.tableBody.currentValue) {
      this.isLoading = false;
    }
  }

  getBodyValue(object, _key) {
    let key = _key.split('.');
    if (key.length == 1) {
      return object[key[0]];
    } else {
      let val = object[key[0]]
      for (let i = 1; i < key.length; i++) {
        val = val && (val[key[i]] != undefined || val[key[i]] != null) ? val[key[i]] : '';
      }
      return val;
    }
  }

  handleAction(action: string, _data: any, index: number) {
    let data = Object.assign({}, _data);
    delete data.action;
    this.actionEvent.emit({ action, data, index });
  }
}
