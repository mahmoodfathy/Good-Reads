import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  aboutInfo: any[] = [
    {
      name: 'Mahmood Fathy',
    },
    {
      name: 'Islam Hany',
    },
    {
      name: 'Amaal Asaad',
    },
    {
      name: 'Esraa Abou El Kassem',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
