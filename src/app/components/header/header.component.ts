import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

//   pokemonList:Array<any> = [];

//   GetPokedex = async () => {   
//     let res = await fetch('https://pokeapi.co/api/v2/pokemon/');
//     let pokeData = await res.json();
//     this.pokemonList = await pokeData.results;
//     console.log(this.pokemonList);    
// }

  constructor() { }

  ngOnInit(): void {
  }

}
