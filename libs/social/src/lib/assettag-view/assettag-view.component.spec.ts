import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssettagViewComponent } from './assettag-view.component';

describe('AssettagViewComponent', () => {
  let component: AssettagViewComponent;
  let fixture: ComponentFixture<AssettagViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssettagViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssettagViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
