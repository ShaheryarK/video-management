import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoByCategoryComponent } from './video-by-category.component';

describe('VideoByCategoryComponent', () => {
  let component: VideoByCategoryComponent;
  let fixture: ComponentFixture<VideoByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
