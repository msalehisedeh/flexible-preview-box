import { Component } from '@angular/core';
import { ComponentPool } from '@sedeh/into-pipes';

import { 
  CustomFavoriteComponent,
  CustomCartComponent,
  CustomInventoryComponent
} from '@sedeh/flexible-preview-box';

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
      poster: '/assets/video-viewing.png',
      src: {
        egg: "ttps://static.vecteezy.com/system/resources/previews/013/279/729/mp4/young-girl-which-applying-virtual-reality-headset-during-working-at-home-in-the-evening-modern-technology-concept-free-video.mp4",
        mp4: "https://static.vecteezy.com/system/resources/previews/013/279/729/mp4/young-girl-which-applying-virtual-reality-headset-during-working-at-home-in-the-evening-modern-technology-concept-free-video.mp4",
        webm: "https://static.vecteezy.com/system/resources/previews/013/279/729/young-girl-which-applying-virtual-reality-headset-during-working-at-home-in-the-evening-modern-technology-concept-free-video.webm"
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
      format: 'catalog',
      value: 'Item #',
      present: true,
      spacing: "10",
      position: 'below',
      action: (item: any) => {},
      side: 'center'
    },
    {
      key: 'description',
      format: 'description',
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
  config: any = {
    zoomOnHover: true,
    hovereffect: true,
    fixedHover: false,
    rating: true,
    cart: true,
    favorite: true,
    currency: true,
    inventory: true,
    description: true,
    catalog: true,
    width: "250",
    height: "140"
  }

  constructor(private pool:ComponentPool) {
    this.pool.registerComponent("favorite", CustomFavoriteComponent);
    this.pool.registerComponent("cart", CustomCartComponent);
    this.pool.registerComponent("inventory", CustomInventoryComponent);
    this.presentationKeys.map(
      (item: any) => {
        if (item.key === 'catalog_number') {
          item.action = (item: any) => {
            this.onselect({type: 'cart', target: item});
          }
        }
      }
    );
  }

  click(event: any, key: any) {
    this.config[key] = event.target.checked;
  }
  onaction(event: any) {
    this.events.push(event);
  }
  onselect(event: any) {
    this.events.push(event);
    alert('selected');
  }
}
