import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MenuItem, MenuItemsNested } from 'src/app/models/menu-items';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  menuItems:MenuItemsNested[] = [
    {menuItem:{ name: 'Users', url: 'users' }}
    ,{menuItem:{ name: 'Videos', url: 'videos' }, subMenu: [
      { name: 'Category', url: 'videos/by-category' },
      { name: 'Tag', url: 'videos/by-tags' },
    ]},
    {menuItem: { name: 'Categories', url: 'categories' }}
  ];
  subMenu:MenuItem[] = [];
  searchText = '';

  toggleSearch: boolean = false;
  public now: Date = new Date();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  openSearch() {
    this.toggleSearch = true;
    // this.searchBar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }
  checkForSubMenu(item: MenuItemsNested) {
    if (item.subMenu != null) {
      this.subMenu = item.subMenu;
    } else {
      this.subMenu = [];
    }
    console.log(this.subMenu);
  }

  onLogout(){
    this.authService.logout();
  }
}
