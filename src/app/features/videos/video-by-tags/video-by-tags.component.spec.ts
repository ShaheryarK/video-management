import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoByTagsComponent } from './video-by-tags.component';

describe('VideoByTagsComponent', () => {
  let component: VideoByTagsComponent;
  let fixture: ComponentFixture<VideoByTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoByTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoByTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
