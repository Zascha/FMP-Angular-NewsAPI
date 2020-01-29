import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  templateUrl: './standard-button.component.html',
  styleUrls: ['./standard-button.component.less']
})
export class StandardButtonComponent implements OnInit {
  @Input() text: string;
  @Input() clickAction: any;

  @Output() buttonClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {  }

  onClick() {
    this.clickAction();
    this.buttonClicked.emit(this.text + ' action finished');
  }
}
