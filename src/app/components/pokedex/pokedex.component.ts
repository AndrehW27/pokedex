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
  movesAllData: Array<any> = [];
  moves: Array<any> = [];
  pokeListToRender: Array<any> = [];

  // paginacao
  pagAtual = 1;
  offSet = 0;

  SetInputValue = (id: any) => {
    this._pokeinfosService.inputServ = id;
  }

  GetPokedex = async () => {
    if (this._pokeinfosService.changeGen) {
      let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset='+this._pokeinfosService.genOffSet);
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
      this._pokeinfosService.changeGen = false;
    } else {
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
    }

  }

  GoNext = async () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.pagAtual = this.pagAtual + 1;
    this.offSet = this.offSet + 20;
    let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this.offSet);
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    if (this.pagAtual > 1) {
      this.pagAtual = this.pagAtual - 1;
      this.offSet = this.offSet - 20;
      let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this.offSet);
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
  }



  // GetMoves = async () => {
  //   let res = await fetch('https://pokeapi.co/api/v2/pokemon/6');
  //   let pokeData = await res.json();
  //   this.movesAllData = pokeData.moves;

  //   for (let i = 0; i < this.movesAllData.length; i++) {
  //     this.moves[i] = this.movesAllData[i].move.name;
  //   }
  //   console.log("this.moves");
  //   console.log(this.moves);


  // }

  constructor(private _pokeinfosService: PokeinfosService) { }

  ngOnInit() {
    this.GetPokedex();
  }
}


