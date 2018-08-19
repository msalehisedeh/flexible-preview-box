# Welcome to flexible preview box!

Have you ever wanted a preview box that can display anything in different ways on different application flows just by toggling metadata rules for each flow? Flexible preview box is built with Angular 4+ code and can display images or videos with relative data or action links above or below its view port. links or any content display is controlled and formatted by the metadat rules you provide. You can write your own formatters and achieve what is needed for a specific cituation or use existing formatter from into-pipes library.  Flexible preview box can display any data for any purpose. For example: product display, user info display, video teaser display, ..., possibilities are endless.

**NOTE:** Starting with version 1.1.0 this library is compatible with Angular 6+.

Please send your requests or comments through the link provided below:

[Live Demo](https://flexible-preview-box.stackblitz.io) | [Source code](https://github.com/msalehisedeh/flexible-preview-box) | [Comments/Requests](https://github.com/msalehisedeh/flexible-preview-box/issues)

# Version 1.1.0
Updated libraries to become compatible with Angular 6+. 


# Version 1.0.0

```
DEPENDENCIES: 
	"font-awesome": "^4.7.0", 
	"into-pipes": "^1.5.1"
```

## Formatting the preview box display content.

We are using "into-pipes" library. To see available formatting options, please follow what is supported by the library.

## Sample Use

```javascript
<flexible-preview-box
  *ngFor="let preview of myPreviews"
  [item]="preview"
  [viewport]="preview.images"
  [metadata]="presentationKeys"
  [effects]="config"
  (onselect)="onselect($event)"></flexible-preview-box>

```

In above example the following could be a possible way of previewing the item presented to the box:
```javascript
config = {
    zoomOnHover: true,
    hovereffect: true,
    width: "250",
    height: "150"
  }

  presentationKeys = [
    {
      key: 'reviews',
      value: 'Reviews',
      hidelabel: true,
      present: true,
      position: 'above',
      side: 'right',
      format: 'rating'
    },
    {
      key: 'favorites',
      value: 'Favorites',
      hidelabel: true,
      present: true,
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
      position: 'above',
      sidebyside: true,
      side: 'right',
      format:'cart'
    },
    {
      key: 'price',
      value: 'Price',
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
      value: 'Remaining Items',
      present: true,
      spacing: "10",
      position: 'below',
      side: 'right',
      format: 'inventory'
    }
  ]
```
So we need to create three custom fomatters "favorite", "cart", and "inventory".
favorite custom pipe shoud display an icon if value is set and toggle it and its value on click and perform saving or removing favorite or fire an event.
cart custom pipe should display an icon if value is set and toggle it and its value on click and insert/remove the item in/from a cart or fire an event.
inventory custom pipe should display relative information if inventory item is greater or less than zero.

To see how you can create custom formatters, look at **into-pipes** library. 

## attributes

| Attribute       |Details                                                                      |
|-----------------|-----------------------------------------------------------------------------|
|item             | JSON data to be displayed.                                                  |
|viewport         | Place to display image or video.                                            |
|metadata         | Data that contols which item attribute has to be isplayed and in what form. |
|effects          | Configuration attributed that controls the box.                             |

### viewport
the value passed to view port can be of the following:
```javascript
{
  type: string, // video
  src: {
    egg: string, // URL
    mp4: string, // URL,
    webm: string, // URL,
  }
}

OR

{
  type: string, // image
  src: {
    small: string,
    large: string
  }
}
```

### mtadata

| Attribute       |Details                                                                      |
|-----------------|-----------------------------------------------------------------------------|
|key              | JSON path to the item to be displayed.                                      |
|value            | Textual representation of key on the box.                                   |
|present          | Display the attribute if present is set or skip.                            |
|position         | Display the attribute above or below the box view port.                     |
|side             | Display the attribute on right, left, or center of box.                     |
|emphasize        | Display in a large and bold fashion.                                        |
|spacing          | Top margin on the displayed row.                                            |
|hidelabel        | Do not show the label.                                                      |
|format           | Format the value using **into-pipes** library.                              |


### effects
the following are type of effects that control the box

| Attribute       |Details                                                                             |
|-----------------|------------------------------------------------------------------------------------|
|zoomOnHover      | if view port has two small and large images, displays large image on hover if set. |
|hovereffect      | will give a small zoom out effect on hover if set.                                 |
|width            | will control the viewport width.                                                   |
|height           | will control the viewport height.                                                  |


## Events
You can register to receive the following events:

| Event       |Details                                                                                             |
|-------------|----------------------------------------------------------------------------------------------------|
|onselect     |`'{ "id": "<tag box ID>", "selecedIndex": "<index list of selected items>" }'`                      |



![alt text](https://raw.githubusercontent.com/msalehisedeh/flexible-preview-box/master/sample.png  "What you would see when a flexible-preview-box is used")
