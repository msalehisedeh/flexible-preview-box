import { Component, Input, Output, ViewChild, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntoPipeModule } from 'into-pipes';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FlexiblePreviewBoxComponent {
    constructor() {
        this.aboveData = [];
        this.belowData = [];
        this.onselect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.metadata) {
            this.metadata.map((data) => {
                if (data.position === 'above') {
                    this.aboveData.push(data);
                }
                else if (data.position === 'below') {
                    this.belowData.push(data);
                }
            });
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
    }
    /**
     * @param {?} item
     * @param {?} hpath
     * @return {?}
     */
    itemValue(item, hpath) {
        let /** @type {?} */ subitem = item;
        hpath.map((subkey) => {
            if (subitem) {
                subitem = subitem[subkey];
            }
        });
        return subitem === undefined || subitem === null || subitem === "null" ? "" : String(subitem);
    }
    /**
     * @param {?} row
     * @return {?}
     */
    rowContent(row) {
        let /** @type {?} */ content = this.itemValue(this.item, row.key.split("."));
        return (content !== undefined && content != null) ? content : '';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    hoverOver(event) {
        if (this.largeImage && this.effects.zoomOnHover && event.target.nodeName === 'IMG') {
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    hoverOut(event) {
        if (this.largeImage) {
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    hoverViewPort(event) {
        if (this.largeImage && this.effects.zoomOnHover) {
            this.largeImage.nativeElement.style.opacity = 1;
            this.largeImage.nativeElement.style.top = -event.layerY + "px";
            this.largeImage.nativeElement.style.left = -event.layerX + "px";
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyup(event) {
        const /** @type {?} */ code = event.which;
        if (code === 13) {
            event.target.click();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    selectItem(event) {
        this.onselect.emit({
            item: this.item,
            selected: true,
            action: "redirect"
        });
    }
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    videoPlayed(trackingTime) {
    }
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    videoPaused(trackingTime) {
    }
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    videoEnded(trackingTime) {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onComponentChange(event) {
        this.onselect.emit(event);
    }
}
FlexiblePreviewBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-preview-box',
                template: `<div class="above-viewport" [style.max-width]="effects.width ? (effects.width + 'px') : 'auto'">
    <div *ngFor="let row of aboveData"
        class="box-row"
        [style.margin-top]="row.spacing ? (row.spacing + 'px') : '0'"
        [class.left]="row.side === 'left'"
        [class.right]="row.side === 'right'"
        [class.center]="row.side === 'center'"
        [class.emphasize]="row.emphasize"
        [class.side-by-side]="row.sidebyside">
        <span class="label" [class.off-screen]="row.hidelabel" [textContent]="row.value"></span>
        <span class="value" [intoName]="row.value"
            [intoId]="row.key + '-' + i"
            [into]="row.format"
            [intoData]="item"
            [rawContent]="rowContent(row)"
            [onComponentChange]="onComponentChange.bind(this)"></span>
    </div>
    <div class="clearblock"></div>
</div>
<div
    class="viewport"
    tabindex="0"
    [title]="item.name"
    [style.width]="effects.width + 'px'"
    [style.height]="effects.height + 'px'"
    (keyup)="keyup($event)"
    (click)="selectItem($event)"
    (mouseout)="hoverOut($event)"
    (mouseover)="hoverOver($event)"
    (mousemove)="hoverViewPort($event)">
    <img  class="content"
            [src]="viewport.src.small"
            *ngIf="viewport.type === 'image'" />
    <img  class="hover" #largeImage
            [style.width]="(effects.width*2) + 'px'"
            [style.height]="(effects.height*2) + 'px'"
            [src]="viewport.src.large"
            *ngIf="effects.zoomOnHover" />
    <video
        class="content" #video
        [style.width]="effects.width + 'px'"
        [style.height]="effects.height + 'px'"
        (play)="videoPlayed(video.currentTime)"
        (pause)="videoPaused(video.currentTime)"
        (ended)="videoEnded(video.currentTime)"
        *ngIf="viewport.type === 'video'" controls>
        <source [src]="viewport.src.mp4" type="video/mp4">
        <source [src]="viewport.src.webm" type="video/webm">
        <source [src]="viewport.src.egg" type="video/ogg">
    </video>
</div>
<div class="below-viewport" [style.max-width]="effects.width ? (effects.width + 'px') : 'auto'">
    <div *ngFor="let row of belowData"
        class="box-row"
        [style.margin-top]="row.spacing ? (row.spacing + 'px') : '0'"
        [class.left]="row.side === 'left'"
        [class.right]="row.side === 'right'"
        [class.center]="row.side === 'center'"
        [class.emphasize]="row.emphasize"
        [class.side-by-side]="row.sidebyside">
        <span class="label" [class.off-screen]="row.hidelabel" [textContent]="row.value"></span>
        <span class="value" [intoName]="row.value"
            [intoId]="row.key + '-' + i"
            [into]="row.format"
            [intoData]="item"
            [rawContent]="rowContent(row)"
            [onComponentChange]="onComponentChange.bind(this)"></span>
    </div>
    <div class="clearblock"></div>
</div>`,
                styles: [`:host{background-color:#fff;border:1px solid #ced4da;-webkit-box-sizing:border-box;box-sizing:border-box;display:table;min-height:50px;padding:0;border-radius:5px;margin:5px}:host ::ng-deep .rating{color:red}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .box-row{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}:host .box-row .label{float:left;font-weight:700;margin-right:5px}:host .box-row .value{float:left}:host .box-row.left{text-align:left}:host .box-row.right .label{font-weight:700;-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:right}:host .box-row.center{width:inherit;display:table;margin:auto}:host .box-row.emphasize{font-weight:700;font-size:1.8rem}:host .box-row.side-by-side{max-width:250px;width:inherit;display:table;float:right;margin:0 5px}:host .above-viewport{padding:5px;-webkit-box-sizing:border-box;box-sizing:border-box}:host .viewport{border-color:purple;-webkit-box-sizing:border-box;box-sizing:border-box;border-top:1px solid #bcd;border-bottom:1px solid #bcd;min-height:150px;overflow:hidden;position:relative;margin:0 auto;box-sizing:border-box;cursor:pointer}:host .viewport img.content{margin:auto;display:table}:host .viewport video.content{margin:auto;display:table}:host .viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}:host .viewport:hover{border-color:purple}:host .below-viewport{padding:5px;-webkit-box-sizing:border-box;box-sizing:border-box}.clearblock{clear:both;display:block;width:100%;height:0;padding:0;margin:0}:host:focus{border-color:#0ba}:host:hover{border-color:purple;-webkit-box-shadow:1px 1px 11px purple;box-shadow:1px 1px 11px purple}`],
            },] },
];
/** @nocollapse */
FlexiblePreviewBoxComponent.ctorParameters = () => [];
FlexiblePreviewBoxComponent.propDecorators = {
    "largeImage": [{ type: ViewChild, args: ["largeImage",] },],
    "onselect": [{ type: Output, args: ["onselect",] },],
    "item": [{ type: Input, args: ["item",] },],
    "viewport": [{ type: Input, args: ["viewport",] },],
    "metadata": [{ type: Input, args: ["metadata",] },],
    "effects": [{ type: Input, args: ["effects",] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FlexiblePreviewBoxModule {
}
FlexiblePreviewBoxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IntoPipeModule
                ],
                declarations: [
                    FlexiblePreviewBoxComponent
                ],
                exports: [
                    FlexiblePreviewBoxComponent
                ],
                entryComponents: [],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
/** @nocollapse */
FlexiblePreviewBoxModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { FlexiblePreviewBoxComponent, FlexiblePreviewBoxModule };
//# sourceMappingURL=flexible-preview-box.js.map
