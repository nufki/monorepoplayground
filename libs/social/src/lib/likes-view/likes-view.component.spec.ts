import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesViewComponent } from './likes-view.component';

describe('LikesViewComponent', () => {
  let component: LikesViewComponent;
  let fixture: ComponentFixture<LikesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
