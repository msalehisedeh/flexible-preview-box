import { Component, Output, EventEmitter } from '@angular/core';
import { PipeComponent } from '@sedeh/into-pipes';
import { WizardStorageService } from '@sedeh/wizard-storage';

@Component({
    selector: 'cart-component',
    template: `
    <a class="fa" tabindex="0" (keyup)="keyup($event)" (click)="toggle($event)" [class.fa-shopping-bag]="true" [class.selected]="selected"></a>
    `,
    styles: [
        `
        a {cursor: pointer;color:#888}
        a.selected {color:pink}
        `
    ]
})
export class CustomCartComponent implements PipeComponent {
  source: string;
  item: any;
  name: string;
  selected = false;
  id: string;

  @Output("onIntoComponentChange")
  onIntoComponentChange = new EventEmitter();
 
  constructor(private storage: WizardStorageService) {}

  transform(source: any, item:any, args: any[]) {
      this.source = source;
      this.item = item;
      const existing = this.getItem(this.item.catalog_number);
      this.selected = (existing !== null);
  }
  keyup(event) {
    const code = event.which;

    if (code === 13) {
      event.target.click();
    }
  }
  private addItem(id) {
    const saved = this.storage.local.getItem("cart-items");
    if (saved) {
      saved.push(id);
      this.storage.local.setItem("cart-items", saved);
    } else {
      this.storage.local.setItem("cart-items", [id]);
    }
  }
  private removeItem(id) {
    const saved = this.storage.local.getItem("cart-items");
    if (saved) {
      if (saved.length > 1) {
        const i = saved.indexOf(id);

        saved.splice(i, 1);
      } else {
        this.storage.local.setItem("cart-items", saved);
      }
    }
  }
  private getItem(id) {
    const saved = this.storage.local.getItem("cart-items");
    let found = null;

    if (saved) {
      const i = saved.indexOf(id);

      found = i < 0 ? null : saved[i];
    }
    return found;
  }
  toggle(event) {
    this.selected = !this.selected;

    if (this.selected) {
      const existing = this.getItem(this.item.catalog_number);
      if (!existing) {
        this.addItem(this.item.catalog_number)
        this.onIntoComponentChange.emit({
          id: this.id,
          name: this.name,
          value: this.source,
          action: "add",
          type: "cart",
          item: this.item
        });
      }
    } else {
      this.removeItem(this.item.catalog_number);
      this.onIntoComponentChange.emit({
        id: this.id,
        name: this.name,
        value: this.source,
        action: "remove",
        type: "cart",
        item: this.item
      });
    }
  }
}