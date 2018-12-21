import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  nomes: string[];
  constructor() {
    this.nomes = ['Antônio', 'Isael', 'João Bosco', 'Weber', 'Renato', 'Maurício']; // set the name
  }

  ngOnInit() {
  }

}
