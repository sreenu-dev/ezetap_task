import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sideBarEventEmitter: EventEmitter<any>=new EventEmitter();
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  goToLanding(){
    this.router.navigate(['/landing']);
  }
  toggleSideBar(){
    this.sideBarEventEmitter.emit("toggle");
  }
}
