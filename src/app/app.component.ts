import { Component } from '@angular/core';
import { ComponentPool } from '@sedeh/into-pipes';

import { CustomFavoriteComponent } from './formatters/favorite-formatter';
import { CustomCartComponent } from './formatters/cart-formatter';
import { CustomInventoryComponent } from './formatters/inventory-formatter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flexible preview Box';
  events: string[] = [];

  myPreviews= [
  {
    price: 6.35,
    name: "priceless bettyy",
    catalog_number: 'j00000po8768',
    description: 'sdf sfd sdfds  sdf ssd fdfsf sfsd fsd fsdfsf sdfs',
    inventory: 4,
    images: {
      type: 'video',
      poster: 'https://www.skandium.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/n/snaps-high.jpg',
      src: {
        egg: "https://theorganiccompany.dk/new/wp-content/uploads/2017/06/Long_Apron_The_Organic_Company_lowres.mp4",
        mp4: "https://theorganiccompany.dk/new/wp-content/uploads/2017/06/Long_Apron_The_Organic_Company_lowres.mp4",
        webm: "https://theorganiccompany.dk/new/wp-content/uploads/2017/06/Long_Apron_The_Organic_Company_lowres.mp4"
      }
    },
    favorites: false,
    reviews: 1.5,
    cart: 'cart'
  },
  {
    price: 2.95,
    name: "evil apron pretty",
    catalog_number: 'k24234jh6446',
    description: 'asfasdas s  s as asdas dsad adasd a ad as aas dasda ds',
    inventory: -6,
    images: {
      type: 'image',
      src: {
        small: "https://rlv.zcache.com/create_custom_personalized_bbq_barbecue_gardening_long_apron-r2ef3fadb6fc143078e4983d25bfa1f5d_v9wta_8byvr_140.jpg", 
        large: "https://rlv.zcache.com/create_custom_personalized_bbq_barbecue_gardening_long_apron-r2ef3fadb6fc143078e4983d25bfa1f5d_v9wta_8byvr_140.jpg"
      }
    },
    favorites: false,
    reviews: 3.5,
    cart: 'cart'
  }

  ];
  presentationKeys = [
    {
      key: 'reviews',
      value: 'Reviews',
      hidelabel: true,
      present: true,
      position: 'above',
      side: 'left',
      rawContent: (item: any) => item.reviews,
      format: 'rating'
    },
    {
      key: 'favorites',
      value: 'Favorites',
      hidelabel: true,
      present: true,
      spacing: "5",
      position: 'above',
      sidebyside: true,
      side: 'right',
      format:'favorite'
    },
    {
      key: 'cart',
      value: 'Add to cart',
      present: true,
      hidelabel: true,
      spacing: "5",
      position: 'above',
      sidebyside: true,
      side: 'right',
      format:'cart'
    },
    {
      key: 'share',
      value: 'Share item',
      present: true,
      hidelabel: true,
      spacing: "5",
      position: 'above',
      sidebyside: true,
      side: 'right',
      rawContent: (item: any) => 'http://myside.com/?ref-id=' + item.id,
      format:'share:facebook:linkedin:google:twitter'
    },
    {
      key: 'price',
      value: 'Sale price',
      hidelabel: true,
      emphasize: true,
      present: true,
      position: 'below',
      side: 'center',
      format: 'currency'
    },
    {
      key: 'catalog_number',
      value: 'Item #',
      present: true,
      spacing: "10",
      position: 'below',
      side: 'center'
    },
    {
      key: 'description',
      value: 'Description',
      hidelabel: true,
      present: true,
      spacing: "10",
      position: 'below',
      side: 'left'
    },
    {
      key: 'inventory',
      value: '',
      present: true,
      hidelabel: true,
      spacing: "10",
      position: 'below',
      side: 'right',
      format: 'inventory'
    }
  ]
  config = {
    zoomOnHover: true,
    hovereffect: true,
    width: "250",
    height: "140"
  }

  constructor(private pool:ComponentPool) {
    this.pool.registerComponent("favorite", CustomFavoriteComponent);
    this.pool.registerComponent("cart", CustomCartComponent);
    this.pool.registerComponent("inventory", CustomInventoryComponent);
    this.presentationKeys.map(
      (presentation: any) => {
        if (presentation.key === 'sku') {
          presentation.action = (item: any) => {
            // do something here
          }
        }
      }
    );
  }

  onaction(event: any) {
    this.events.push(event);
  }
  onselect(event: any) {
    this.events.push(event);
  }
}
