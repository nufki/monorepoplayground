import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemViewComponent } from './post-item-view.component';

describe('PostItemViewComponent', () => {
  let component: PostItemViewComponent;
  let fixture: ComponentFixture<PostItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostItemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
