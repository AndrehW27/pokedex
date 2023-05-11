import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { PokeinfosService } from 'src/app/shared/services/pokeinfos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {  

  inputValue = "";

  SetInputValue = () =>{
    this._pokeinfosService.inputServ = this.inputValue.toLowerCase();
  }

  constructor(private _pokeinfosService: PokeinfosService) { }

  ngOnInit(): void {
  }

}
