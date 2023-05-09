import { Component, OnInit } from '@angular/core';
import { PokeinfosService } from 'src/app/shared/services/pokeinfos.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  constructor(public _pokeinfosService: PokeinfosService) {}

  ngOnInit(): void {
  }

}
