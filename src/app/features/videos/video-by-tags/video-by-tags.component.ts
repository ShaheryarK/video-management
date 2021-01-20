import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-by-tags',
  templateUrl: './video-by-tags.component.html',
  styleUrls: ['./video-by-tags.component.scss']
})
export class VideoByTagsComponent implements OnInit {

  icon: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleIcon(){
    this.icon = !this.icon;
  }
}
