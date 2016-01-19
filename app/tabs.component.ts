import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
  selector: 'tabs',
  directives: [NgClass],
  template: `
  <div [ngClass]="{tabWrapper: true, crossfade:_fade}">
    <ul>
      <li *ngFor="#tab of tabs" 
        (click)="selectTab(tab)">
        {{ tab.tabTitle }}
     </li>
    </ul>
    <ng-content></ng-content>
  </div>
  `,
  styles: [
   `
    .crossfade{
      position: relative;
    }
    ul{
      list-style: none;
      margin: 0 0 10px 0;
      padding: 0;
    }
    li{
      display: inline-block;
      margin-right: 10px
    }
   ` 
  ]
})

export class Tabs{
  @Input() set crossFade(fade:boolean){
    this._fade = fade || false;
  }
  _fade: boolean;
  tabs: Tab[] = [];
  selectedTab: Tab;
  constructor(){
  }
  addTab(tab:Tab) {
    tab.id = this.tabs.length;
    if (this.tabs.length === 0) {
      this.selectedTab = tab;
      tab.active = true;
    }
    this.tabs.push(tab);
  }
  selectTab(tab:Tab) {
    this.tabs[this.selectedTab.id].active = false;
    tab.active = true;
    this.selectedTab = tab;
  }
}

@Component({
  selector: 'tab',
  directives: [NgClass],
  template: `
    <div  [ngClass] = "{tab: true, fade: crossfade,active: active}">
      <ng-content></ng-content>
    </div>
  `,
  styles:[`
    .tab:not(.fade){
      display: none;
    }
    .tab.fade{
      opacity: 0;
      transition: all 0.5s;
      z-index: -1;
      position: absolute;
    }
    .tab.active{
      opacity: 1;
      display: block;
      z-index: 1;
    }
  `]
})
export class Tab {
  @Input() tabTitle;
  active: boolean = false;
  crossfade: boolean = false;
  id: number = 0;
  ngOnInit(){
    this.crossfade = this.tabs._fade;
  }
  constructor(private tabs: Tabs) {
    tabs.addTab(this)
  }
}