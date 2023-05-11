import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { HeaderComponent } from './components/header/header.component';
import { FightComponent } from './components/fight/fight.component';
import { GenerationsComponent } from './components/generations/generations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokedexComponent,
    PokemonComponent,
    HeaderComponent,
    FightComponent,
    GenerationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
