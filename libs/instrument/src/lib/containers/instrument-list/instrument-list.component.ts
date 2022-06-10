import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'united-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.scss'],
})
export class InstrumentListComponent implements OnInit {
  instruments = [
    {
      id: '83f2c478-dcd1-4d0a-9a90-5c7c7dcfc422',
      name: 'Tesla',
      symbol: 'TSLA',
    },
    {
      id: '143008f4-d298-4171-ad02-71902441373a',
      name: 'AXA',
      symbol: 'AXA:EURONEXT',
    },
    {
      id: '5f5377bb-6844-439b-b7e0-212493837273',
      name: 'BNP Paribas',
      symbol: 'BNP:EURONEXT',
    },
    {
      id: '3a655765-994e-4cf4-ac4d-45fb21ca5100',
      name: 'Carrefour',
      symbol: 'CA:EURONEXT',
    },
    {
      id: '3a655765-994e-4cf4-ac4d-45fb21ca5300',
      name: 'Nestle AG',
      symbol: 'NESN:SIX',
    },
  ];

  constructor() {
    console.log('InstrumentComponent - constructor');
  }

  ngOnInit(): void {
    console.log('InstrumentComponent - ngOnInit');
  }
}
