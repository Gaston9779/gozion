import { Component } from "@angular/core";
import { ButtonComponent, CardComponent, StackComponent } from "@gozion-ui/angular";
import "@gozion-ui/styles";
@Component({ standalone:true, imports:[ButtonComponent,CardComponent,StackComponent], template:`<ui-stack><ui-card variant="glass"><h1>Gozion UI / Angular</h1><ui-button variant="primary" size="lg">Save</ui-button></ui-card></ui-stack>` })
export class AppComponent {}
