import { Component, Input, Output, ViewChild, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntoPipeModule } from 'into-pipes';

var FlexiblePreviewBoxComponent = /** @class */ (function () {
    function FlexiblePreviewBoxComponent() {
        this.aboveData = [];
        this.belowData = [];
        this.onselect = new EventEmitter();
    }
    FlexiblePreviewBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.metadata) {
            this.metadata.map(function (data) {
                if (data.position === 'above') {
                    _this.aboveData.push(data);
                }
                else if (data.position === 'below') {
                    _this.belowData.push(data);
                }
            });
        }
    };
    FlexiblePreviewBoxComponent.prototype.ngOnChanges = function (changes) {
    };
    FlexiblePreviewBoxComponent.prototype.itemValue = function (item, hpath) {
        var subitem = item;
        hpath.map(function (subkey) {
            if (subitem) {
                subitem = subitem[subkey];
            }
        });
        return subitem === undefined || subitem === null || subitem === "null" ? "" : String(subitem);
    };
    FlexiblePreviewBoxComponent.prototype.rowContent = function (row) {
        var content = this.itemValue(this.item, row.key.split("."));
        return (content !== undefined && content != null) ? content : '';
    };
    FlexiblePreviewBoxComponent.prototype.hoverOver = function (event) {
        if (this.largeImage && this.effects.zoomOnHover && event.target.nodeName === 'IMG') {
        }
    };
    FlexiblePreviewBoxComponent.prototype.hoverOut = function (event) {
        if (this.largeImage) {
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
        }
    };
    FlexiblePreviewBoxComponent.prototype.hoverViewPort = function (event) {
        if (this.largeImage && this.effects.zoomOnHover) {
            this.largeImage.nativeElement.style.opacity = 1;
            this.largeImage.nativeElement.style.top = -event.layerY + "px";
            this.largeImage.nativeElement.style.left = -event.layerX + "px";
        }
    };
    FlexiblePreviewBoxComponent.prototype.keyup = function (event) {
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    FlexiblePreviewBoxComponent.prototype.selectItem = function (event) {
        this.onselect.emit({
            item: this.item,
            selected: true,
            action: "redirect"
        });
    };
    FlexiblePreviewBoxComponent.prototype.videoPlayed = function (trackingTime) {
    };
    FlexiblePreviewBoxComponent.prototype.videoPaused = function (trackingTime) {
    };
    FlexiblePreviewBoxComponent.prototype.videoEnded = function (trackingTime) {
    };
    FlexiblePreviewBoxComponent.prototype.onComponentChange = function (event) {
        this.onselect.emit(event);
    };
    return FlexiblePreviewBoxComponent;
}());
FlexiblePreviewBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-preview-box',
                template: "<div class=\"above-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\n    <div *ngFor=\"let row of aboveData\"\n        class=\"box-row\"\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\n        [class.left]=\"row.side === 'left'\"\n        [class.right]=\"row.side === 'right'\"\n        [class.center]=\"row.side === 'center'\"\n        [class.emphasize]=\"row.emphasize\"\n        [class.side-by-side]=\"row.sidebyside\">\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\n        <span class=\"value\" [intoName]=\"row.value\"\n            [intoId]=\"row.key + '-' + i\"\n            [into]=\"row.format\"\n            [intoData]=\"item\"\n            [rawContent]=\"rowContent(row)\"\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\n    </div>\n    <div class=\"clearblock\"></div>\n</div>\n<div\n    class=\"viewport\"\n    tabindex=\"0\"\n    [title]=\"item.name\"\n    [style.width]=\"effects.width + 'px'\"\n    [style.height]=\"effects.height + 'px'\"\n    (keyup)=\"keyup($event)\"\n    (click)=\"selectItem($event)\"\n    (mouseout)=\"hoverOut($event)\"\n    (mouseover)=\"hoverOver($event)\"\n    (mousemove)=\"hoverViewPort($event)\">\n    <img  class=\"content\"\n            [src]=\"viewport.src.small\"\n            *ngIf=\"viewport.type === 'image'\" />\n    <img  class=\"hover\" #largeImage\n            [style.width]=\"(effects.width*2) + 'px'\"\n            [style.height]=\"(effects.height*2) + 'px'\"\n            [src]=\"viewport.src.large\"\n            *ngIf=\"effects.zoomOnHover\" />\n    <video\n        class=\"content\" #video\n        [style.width]=\"effects.width + 'px'\"\n        [style.height]=\"effects.height + 'px'\"\n        (play)=\"videoPlayed(video.currentTime)\"\n        (pause)=\"videoPaused(video.currentTime)\"\n        (ended)=\"videoEnded(video.currentTime)\"\n        *ngIf=\"viewport.type === 'video'\" controls>\n        <source [src]=\"viewport.src.mp4\" type=\"video/mp4\">\n        <source [src]=\"viewport.src.webm\" type=\"video/webm\">\n        <source [src]=\"viewport.src.egg\" type=\"video/ogg\">\n    </video>\n</div>\n<div class=\"below-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\n    <div *ngFor=\"let row of belowData\"\n        class=\"box-row\"\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\n        [class.left]=\"row.side === 'left'\"\n        [class.right]=\"row.side === 'right'\"\n        [class.center]=\"row.side === 'center'\"\n        [class.emphasize]=\"row.emphasize\"\n        [class.side-by-side]=\"row.sidebyside\">\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\n        <span class=\"value\" [intoName]=\"row.value\"\n            [intoId]=\"row.key + '-' + i\"\n            [into]=\"row.format\"\n            [intoData]=\"item\"\n            [rawContent]=\"rowContent(row)\"\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\n    </div>\n    <div class=\"clearblock\"></div>\n</div>",
                styles: [":host{background-color:#fff;border:1px solid #ced4da;-webkit-box-sizing:border-box;box-sizing:border-box;display:table;min-height:50px;padding:0;border-radius:5px;margin:5px}:host ::ng-deep .rating{color:red}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .box-row{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}:host .box-row .label{float:left;font-weight:700;margin-right:5px}:host .box-row .value{float:left}:host .box-row.left{text-align:left}:host .box-row.right .label{font-weight:700;-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:right}:host .box-row.center{width:inherit;display:table;margin:auto}:host .box-row.emphasize{font-weight:700;font-size:1.8rem}:host .box-row.side-by-side{max-width:250px;width:inherit;display:table;float:right;margin:0 5px}:host .above-viewport{padding:5px;-webkit-box-sizing:border-box;box-sizing:border-box}:host .viewport{border-color:#880500;-webkit-box-sizing:border-box;box-sizing:border-box;border-top:1px solid #bcd;border-bottom:1px solid #bcd;min-height:150px;overflow:hidden;position:relative;margin:0 auto;box-sizing:border-box}:host .viewport img.content{margin:auto;display:table}:host .viewport video.content{margin:auto;display:table}:host .viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}:host .viewport:hover{border-color:#f1523c}:host .below-viewport{padding:5px;-webkit-box-sizing:border-box;box-sizing:border-box}.clearblock{clear:both;display:block;width:100%;height:0;padding:0;margin:0}:host:focus{border-color:#0ba}:host:hover{border-color:#f1523c}"],
            },] },
];
FlexiblePreviewBoxComponent.ctorParameters = function () { return []; };
FlexiblePreviewBoxComponent.propDecorators = {
    "largeImage": [{ type: ViewChild, args: ["largeImage",] },],
    "onselect": [{ type: Output, args: ["onselect",] },],
    "item": [{ type: Input, args: ["item",] },],
    "viewport": [{ type: Input, args: ["viewport",] },],
    "metadata": [{ type: Input, args: ["metadata",] },],
    "effects": [{ type: Input, args: ["effects",] },],
};
var FlexiblePreviewBoxModule = /** @class */ (function () {
    function FlexiblePreviewBoxModule() {
    }
    return FlexiblePreviewBoxModule;
}());
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
FlexiblePreviewBoxModule.ctorParameters = function () { return []; };

export { FlexiblePreviewBoxComponent, FlexiblePreviewBoxModule };
//# sourceMappingURL=flexible-preview-box.js.map
