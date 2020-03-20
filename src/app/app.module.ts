import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { FilmeComponent } from './filme/filme.component';
import { NaveComponent } from './nave/nave.component';
import { PessoasComponent } from './pessoas/pessoas.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmeComponent,
    NaveComponent,
    PessoasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
