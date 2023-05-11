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
  
  movesAllData: Array<any> = [];
  moves: Array<any> = [];
  // paginacao
  offSet = 0;

  SetInputValue = (id: any) => {
    this._pokeinfosService.inputServ = id;
  }

  GetPokedex = async () => {
    if (!this._pokeinfosService.changeGen) {
      this._pokeinfosService.offSetServ = 0;
    }
    let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this._pokeinfosService.offSetServ);
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
  }

  GoNext = async () => {

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    console.log("offset antes:");
    console.log(this._pokeinfosService.offSetServ);
    this._pokeinfosService.offSetServ = this._pokeinfosService.offSetServ + 20;
    console.log("offset depois:");
    console.log(this._pokeinfosService.offSetServ);

    let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this._pokeinfosService.offSetServ);
    let pokeData = await res.json();
    console.log(pokeData);

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
    if (this._pokeinfosService.offSetServ > 0) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

      console.log("offset antes:");
      console.log(this._pokeinfosService.offSetServ);
      this._pokeinfosService.offSetServ = this._pokeinfosService.offSetServ - 20;
      console.log("offset depois:");
      console.log(this._pokeinfosService.offSetServ);

      let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this._pokeinfosService.offSetServ);
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


