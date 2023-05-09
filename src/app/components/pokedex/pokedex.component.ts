import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { PokeinfosService } from 'src/app/shared/services/pokeinfos.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonList: Array<any> = [];
  pokeUrlList: Array<any> = [];
  pokeData2: Array<any> = [];
  pokeListToRender: Array<any> = [];

  // paginacao
  pagAtual = 1;
  offSet = 0;

  SetInputValue = (id: any) =>{
    this._pokeinfosService.inputServ = id;    
  }

  GetPokedex = async () => {
    let res = await fetch('https://pokeapi.co/api/v2/pokemon/');    
    let pokeData = await res.json();
    this.pokemonList = await pokeData.results;
    for (let i = 0; i < this.pokemonList.length; i++) {
      this.pokeUrlList[i] = this.pokemonList[i].url;
    }
    for (let i = 0; i < this.pokeUrlList.length; i++) {
      let res2 = await fetch(this.pokeUrlList[i]);
      let pokeData2 = await res2.json();
      this.pokeListToRender[i] = pokeData2;
    }
    console.log(this.pokeListToRender);

  }

  GoNext = async () => {
    this.pagAtual = this.pagAtual+1;
    this.offSet = this.offSet + 20;
    console.log("Página Atual: " + this.pagAtual);
    console.log("OffSet: " + this.offSet);
    let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this.offSet);
    console.log(res);
    let pokeData = await res.json();
    this.pokemonList = await pokeData.results;
    for (let i = 0; i < this.pokemonList.length; i++) {
      this.pokeUrlList[i] = this.pokemonList[i].url;
    }
    for (let i = 0; i < this.pokeUrlList.length; i++) {
      let res2 = await fetch(this.pokeUrlList[i]);
      let pokeData2 = await res2.json();
      this.pokeListToRender[i] = pokeData2;
    }
  }

  GoPrev = async () => {
    if (this.pagAtual > 1) {
      this.pagAtual = this.pagAtual-1;
      this.offSet = this.offSet - 20;
      console.log("Página Atual: " + this.pagAtual);
      console.log("OffSet: " + this.offSet);
      let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this.offSet);
      console.log(res);
      let pokeData = await res.json();
      this.pokemonList = await pokeData.results;
      for (let i = 0; i < this.pokemonList.length; i++) {
        this.pokeUrlList[i] = this.pokemonList[i].url;
      }
      for (let i = 0; i < this.pokeUrlList.length; i++) {
        let res2 = await fetch(this.pokeUrlList[i]);
        let pokeData2 = await res2.json();
        this.pokeListToRender[i] = pokeData2;
      }
    } else {
      console.log("Você já está na primeira página.");
    }
  }

  constructor(private _pokeinfosService: PokeinfosService) { }

  ngOnInit() {
    this.GetPokedex();
  }
}


