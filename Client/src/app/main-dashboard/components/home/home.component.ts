import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  contactInfo: any = [
    {
      name: 'Address',
      icon: '/assets/marker.png',
      description: 'Smart Village , 6th October',
    },
    {
      name: 'Contact Number',
      icon: '/assets/phone.png',
      description: '010101010',
    },
    {
      name: 'Email Address',
      icon: '/assets/email.png',
      description: 'info@goodreads.com',
    },
    {
      name: 'Website',
      icon: '/assets/website.png',
      description: 'www.goodreads.com',
    },
  ];
  ngOnInit(): void {}
}
