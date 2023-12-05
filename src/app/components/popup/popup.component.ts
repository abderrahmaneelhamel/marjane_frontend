import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  hidden : boolean = true;
  @Input() color!: string;
  @Input() name!: string;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(){}

  Toggle(){
    this.hidden = !this.hidden;
  }
}
