import { __decorate } from 'tslib';
import { EventEmitter, ViewChild, Output, Input, Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntoPipeModule } from '@sedeh/into-pipes';

let FlexiblePreviewBoxComponent = class FlexiblePreviewBoxComponent {
    constructor() {
        this.aboveData = [];
        this.belowData = [];
        this.onselect = new EventEmitter();
        this.onaction = new EventEmitter();
        this.enableMobileMagnification = true;
        this.magnificationFactor = 2;
    }
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
        if (this.magnificationFactor < 2) {
            this.magnificationFactor = 2;
        }
    }
    itemValue(item, hpath) {
        let subitem = item;
        hpath.map((subkey) => {
            if (subitem) {
                subitem = subitem[subkey];
            }
        });
        return subitem === undefined || subitem === null || subitem === "null" ? "" : String(subitem);
    }
    rowContent(row) {
        if (row.rawContent) {
            return row.rawContent(this.item);
        }
        let content = this.itemValue(this.item, row.key.split("."));
        return (content !== undefined && content != null) ? content : '';
    }
    touchstart(event) {
        if (this.enableMobileMagnification && this.largeImage && this.effects.zoomOnHover) {
            const img = event.target.children[0];
            if (img) {
                const rect = img.getBoundingClientRect();
                this.largeImage.nativeElement.style.width = (this.magnificationFactor * rect.width) + 'px';
                this.largeImage.nativeElement.style.height = (this.magnificationFactor * rect.height) + 'px';
                img.style.visibility = 'hidden';
            }
            this.onaction.emit({ action: 'viewport', type: event.type, item: this.item });
        }
    }
    touchmove(event) {
        if (this.enableMobileMagnification && this.largeImage && this.effects.zoomOnHover) {
            event.preventDefault();
            event.stopPropagation();
            const img = event.target.children[0];
            const viewR = img.parentNode.getBoundingClientRect();
            const rect = img.getBoundingClientRect();
            const width = event.touches[0].clientX - viewR.x;
            const height = event.touches[0].clientY - viewR.y;
            const dx = (this.effects.width - rect.width) * (this.magnificationFactor / 2);
            const dy = (this.effects.height - rect.height) * (this.magnificationFactor / 2);
            const y = height * (this.magnificationFactor - 1);
            const x = width * (this.magnificationFactor - 1);
            this.largeImage.nativeElement.style.top = (-y + dy) + "px";
            this.largeImage.nativeElement.style.left = (-x + dx) + "px";
            this.largeImage.nativeElement.style.opacity = 1;
            this.onaction.emit({
                action: 'viewport',
                type: event.type,
                position: { Y: x, X: y },
                item: this.item
            });
        }
    }
    touchend(event) {
        if (this.enableMobileMagnification && this.largeImage) {
            const img = event.target.children[0];
            img.style.visibility = 'visible';
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
            this.onaction.emit({ action: 'viewport', type: event.type, item: this.item });
        }
    }
    hoverOver(event) {
        if (this.largeImage && this.effects.zoomOnHover) {
            const img = event.target.children[0];
            if (img) {
                const rect = img.getBoundingClientRect();
                this.largeImage.nativeElement.style.width = (this.magnificationFactor * rect.width) + 'px';
                this.largeImage.nativeElement.style.height = (this.magnificationFactor * rect.height) + 'px';
                img.style.visibility = 'hidden';
            }
            this.onaction.emit({ action: 'viewport', type: event.type, item: this.item });
        }
    }
    hoverOut(event) {
        if (this.largeImage) {
            const img = event.target.children[0];
            img.style.visibility = 'visible';
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
            this.onaction.emit({ action: 'viewport', type: event.type, item: this.item });
        }
    }
    hoverViewPort(event) {
        if (this.largeImage && this.effects.zoomOnHover) {
            const img = event.target.children[0];
            const rect = img.getBoundingClientRect();
            const dx = (this.effects.width - rect.width) * (this.magnificationFactor / 2);
            const dy = (this.effects.height - rect.height) * (this.magnificationFactor / 2);
            const y = event.layerY * (this.magnificationFactor - 1);
            const x = event.layerX * (this.magnificationFactor - 1);
            this.largeImage.nativeElement.style.top = (-y + dy) + "px";
            this.largeImage.nativeElement.style.left = (-x + dx) + "px";
            this.largeImage.nativeElement.style.opacity = 1;
            this.onaction.emit({
                action: 'viewport',
                type: event.type,
                position: { Y: x, X: y },
                item: this.item
            });
        }
    }
    updateControls(event) {
        if (this.video) {
            this.video.nativeElement.play();
        }
    }
    resetControls(event) {
        if (this.video && this.isPlaying(this.video.nativeElement)) {
            this.video.nativeElement.pause();
        }
    }
    isPlaying(video) {
        return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    }
    keyup(event) {
        const code = event.which;
        if (code === 13) {
            event.target.click();
        }
    }
    selectItem(event) {
        this.onselect.emit({
            action: "redirect",
            type: 'select',
            item: this.item
        });
    }
    videoEvent(event) {
        this.onaction.emit({
            action: 'video',
            type: event.type,
            item: {
                autoplay: event.target.autoplay,
                controls: event.target.controls,
                duration: event.target.duration,
                ended: event.target.ended,
                error: event.target.error,
                paused: event.target.paused,
                muted: event.target.muted,
                currentTime: event.target.currentTime,
                volume: event.target.volume
            }
        });
    }
    onComponentChange(event) {
        if (event.action && event.type && event.item) {
            this.onaction.emit(event);
        }
        else {
            this.onaction.emit({ action: event.name, type: event.item, item: this.item });
        }
    }
    defaultAction() {
        // do nothing
    }
};
__decorate([
    ViewChild("largeImage", { static: false })
], FlexiblePreviewBoxComponent.prototype, "largeImage", void 0);
__decorate([
    ViewChild("video", { static: false })
], FlexiblePreviewBoxComponent.prototype, "video", void 0);
__decorate([
    Output()
], FlexiblePreviewBoxComponent.prototype, "onselect", void 0);
__decorate([
    Output()
], FlexiblePreviewBoxComponent.prototype, "onaction", void 0);
__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "item", void 0);
__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "viewport", void 0);
__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "metadata", void 0);
__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "effects", void 0);
__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "enableMobileMagnification", void 0);
__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "magnificationFactor", void 0);
FlexiblePreviewBoxComponent = __decorate([
    Component({
        selector: 'flexible-preview-box',
        template: "<div class=\"above-viewport\" \r\n    [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of aboveData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.link]=\"row.action !== undefined\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\"\r\n        [attr.role]=\"row.action ? 'link' : ''\"\r\n        [tabIndex]=\"row.action ? 0 : -1\"\r\n        (click)=\"row.action ? row.action(row) : defaultAction()\">\r\n        <span class=\"label\" \r\n            [class.off-screen]=\"row.hidelabel\" \r\n            [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" \r\n            [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [tabIndex]=\"row.rawContent ? 0 : -1\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>\r\n<div \r\n    class=\"viewport\" \r\n    tabindex=\"0\"\r\n    [title]=\"item.name\"\r\n    [style.width]=\"effects.width ? (effects.width + 'px') : null\" \r\n    [style.height]=\"effects.height ? (effects.height + 'px') : null\" \r\n    (focus)=\"updateControls($event)\"\r\n    (blur)=\"resetControls($event)\"\r\n    (keyup)=\"keyup($event)\"\r\n    (click)=\"selectItem($event)\"\r\n    (touchstart)=\"touchstart($event)\"\r\n    (touchmove)=\"touchmove($event)\"\r\n    (touchend)=\"touchend($event)\"\r\n    (mouseout)=\"hoverOut($event)\"\r\n    (mouseover)=\"hoverOver($event)\"\r\n    (mousemove)=\"hoverViewPort($event)\">\r\n    <img  class=\"content\" \r\n            [src]=\"viewport.src.small\" \r\n            *ngIf=\"viewport.type === 'image'\" />\r\n    <img  class=\"hover\" #largeImage aria-hidden=\"true\"\r\n            [src]=\"viewport.src.large\" \r\n            *ngIf=\"effects.zoomOnHover\" />\r\n    <video  \r\n        class=\"content\" #video\r\n        [style.width]=\"effects.width ? (effects.width + 'px') : null\" \r\n        [style.height]=\"effects.height ? (effects.height + 'px') : null\" \r\n        [attr.poster]=\"viewport.poster ? viewport.poster : null\"\r\n        (mouseenter)=\"updateControls($event)\"\r\n        (mouseleave)=\"resetControls($event)\"\r\n        (play)=\"videoEvent($event)\"\r\n        (pause)=\"videoEvent($event)\"\r\n        (ended)=\"videoEvent($event)\"\r\n        (seeked)=\"videoEvent($event)\"\r\n        (error)=\"videoEvent($event)\"\r\n        (fullscreenchange)=\"videoEvent($event)\"\r\n        *ngIf=\"viewport.type === 'video'\">\r\n        <source [src]=\"viewport.src.mp4\" type=\"video/mp4\">\r\n        <source [src]=\"viewport.src.webm\" type=\"video/webm\">\r\n        <source [src]=\"viewport.src.egg\" type=\"video/ogg\">\r\n    </video>\r\n</div>\r\n<div class=\"below-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of belowData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.link]=\"row.action !== undefined\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\"\r\n        [attr.role]=\"row.action ? 'link' : ''\"\r\n        [tabIndex]=\"row.action ? 0 : -1\"\r\n        (click)=\"row.action ? row.action(row) : defaultAction()\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" \r\n            [intoName]=\"row.value\"\r\n            [class.full-width]=\"row.hidelabel\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>",
        styles: [":host{background-color:#fff;border:1px solid #ced4da;box-sizing:border-box;display:table;min-height:50px;padding:0;border-radius:5px;margin:5px}:host:focus{border-color:#0ba}:host:hover{border-color:purple;box-shadow:1px 1px 11px purple}:host ::ng-deep .rating{color:red}:host ::ng-deep share-component .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .box-row .label{float:left;font-weight:700;margin-right:5px}:host .box-row .value{float:left}:host .box-row .value.full-width{display:block;width:100%}:host .box-row.link{cursor:pointer}:host .box-row.left{text-align:left}:host .box-row.right .label{font-weight:700;flex:1;text-align:right}:host .box-row.center{width:inherit;display:table;margin:auto}:host .box-row.emphasize{font-weight:700;font-size:1.8rem}:host .box-row.side-by-side{max-width:250px;display:table;float:right;margin:0 5px}:host .above-viewport{padding:5px;box-sizing:border-box}:host .viewport{border-color:purple;box-sizing:border-box;border-top:1px solid #bcd;border-bottom:1px solid #bcd;min-height:100px;overflow:hidden;position:relative;margin:0 auto;box-sizing:border-box;cursor:pointer}:host .viewport img.content{margin:auto;display:table;pointer-events:none}:host .viewport video.content{margin:auto;display:table}:host .viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}:host .viewport:hover{border-color:purple}:host .below-viewport{padding:5px;box-sizing:border-box}@media screen and (max-width:600px){:host{width:100%}:host .above-viewport,:host .below-viewport,:host .viewport{width:100%!important;max-width:100%!important}}.clearblock{clear:both;display:block;width:100%;height:0;padding:0;margin:0}"]
    })
], FlexiblePreviewBoxComponent);

let FlexiblePreviewBoxModule = class FlexiblePreviewBoxModule {
};
FlexiblePreviewBoxModule = __decorate([
    NgModule({
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
    })
], FlexiblePreviewBoxModule);

/**
 * Generated bundle index. Do not edit.
 */

export { FlexiblePreviewBoxComponent, FlexiblePreviewBoxModule };
//# sourceMappingURL=sedeh-flexible-preview-box.js.map
