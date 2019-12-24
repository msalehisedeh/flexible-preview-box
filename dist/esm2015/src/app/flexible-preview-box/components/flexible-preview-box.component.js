import * as tslib_1 from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
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
};
tslib_1.__decorate([
    ViewChild("largeImage", { static: false })
], FlexiblePreviewBoxComponent.prototype, "largeImage", void 0);
tslib_1.__decorate([
    ViewChild("video", { static: false })
], FlexiblePreviewBoxComponent.prototype, "video", void 0);
tslib_1.__decorate([
    Output()
], FlexiblePreviewBoxComponent.prototype, "onselect", void 0);
tslib_1.__decorate([
    Output()
], FlexiblePreviewBoxComponent.prototype, "onaction", void 0);
tslib_1.__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "item", void 0);
tslib_1.__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "viewport", void 0);
tslib_1.__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "metadata", void 0);
tslib_1.__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "effects", void 0);
tslib_1.__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "enableMobileMagnification", void 0);
tslib_1.__decorate([
    Input()
], FlexiblePreviewBoxComponent.prototype, "magnificationFactor", void 0);
FlexiblePreviewBoxComponent = tslib_1.__decorate([
    Component({
        selector: 'flexible-preview-box',
        template: "<div class=\"above-viewport\" \r\n    [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of aboveData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\">\r\n        <span class=\"label\" \r\n            [class.off-screen]=\"row.hidelabel\" \r\n            [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>\r\n<div \r\n    class=\"viewport\" \r\n    tabindex=\"0\"\r\n    [title]=\"item.name\"\r\n    [style.width]=\"effects.width ? (effects.width + 'px') : null\" \r\n    [style.height]=\"effects.height ? (effects.height + 'px') : null\" \r\n    (focus)=\"updateControls($event)\"\r\n    (blur)=\"resetControls($event)\"\r\n    (keyup)=\"keyup($event)\"\r\n    (click)=\"selectItem($event)\"\r\n    (touchstart)=\"touchstart($event)\"\r\n    (touchmove)=\"touchmove($event)\"\r\n    (touchend)=\"touchend($event)\"\r\n    (mouseout)=\"hoverOut($event)\"\r\n    (mouseover)=\"hoverOver($event)\"\r\n    (mousemove)=\"hoverViewPort($event)\">\r\n    <img  class=\"content\" \r\n            [src]=\"viewport.src.small\" \r\n            *ngIf=\"viewport.type === 'image'\" />\r\n    <img  class=\"hover\" #largeImage aria-hidden=\"true\"\r\n            [src]=\"viewport.src.large\" \r\n            *ngIf=\"effects.zoomOnHover\" />\r\n    <video  \r\n        class=\"content\" #video\r\n        [style.width]=\"effects.width ? (effects.width + 'px') : null\" \r\n        [style.height]=\"effects.height ? (effects.height + 'px') : null\" \r\n        [attr.poster]=\"viewport.poster ? viewport.poster : null\"\r\n        (mouseenter)=\"updateControls($event)\"\r\n        (mouseleave)=\"resetControls($event)\"\r\n        (play)=\"videoEvent($event)\"\r\n        (pause)=\"videoEvent($event)\"\r\n        (ended)=\"videoEvent($event)\"\r\n        (seeked)=\"videoEvent($event)\"\r\n        (error)=\"videoEvent($event)\"\r\n        (fullscreenchange)=\"videoEvent($event)\"\r\n        *ngIf=\"viewport.type === 'video'\">\r\n        <source [src]=\"viewport.src.mp4\" type=\"video/mp4\">\r\n        <source [src]=\"viewport.src.webm\" type=\"video/webm\">\r\n        <source [src]=\"viewport.src.egg\" type=\"video/ogg\">\r\n    </video>\r\n</div>\r\n<div class=\"below-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of belowData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>",
        styles: [":host{background-color:#fff;border:1px solid #ced4da;box-sizing:border-box;display:table;min-height:50px;padding:0;border-radius:5px;margin:5px}:host:focus{border-color:#0ba}:host:hover{border-color:purple;box-shadow:1px 1px 11px purple}:host ::ng-deep .rating{color:red}:host ::ng-deep share-component .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .box-row .label{float:left;font-weight:700;margin-right:5px}:host .box-row .value{float:left}:host .box-row.left{text-align:left}:host .box-row.right .label{font-weight:700;flex:1;text-align:right}:host .box-row.center{width:inherit;display:table;margin:auto}:host .box-row.emphasize{font-weight:700;font-size:1.8rem}:host .box-row.side-by-side{max-width:250px;display:table;float:right;margin:0 5px}:host .above-viewport{padding:5px;box-sizing:border-box}:host .viewport{border-color:purple;box-sizing:border-box;border-top:1px solid #bcd;border-bottom:1px solid #bcd;min-height:100px;overflow:hidden;position:relative;margin:0 auto;box-sizing:border-box;cursor:pointer}:host .viewport img.content{margin:auto;display:table;pointer-events:none}:host .viewport video.content{margin:auto;display:table}:host .viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}:host .viewport:hover{border-color:purple}:host .below-viewport{padding:5px;box-sizing:border-box}@media screen and (max-width:600px){:host{width:100%}:host .above-viewport,:host .below-viewport,:host .viewport{width:100%!important;max-width:100%!important}}.clearblock{clear:both;display:block;width:100%;height:0;padding:0;margin:0}"]
    })
], FlexiblePreviewBoxComponent);
export { FlexiblePreviewBoxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZsZXhpYmxlLXByZXZpZXctYm94LyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1wcmV2aWV3LWJveC9jb21wb25lbnRzL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFFVCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFtQnZCLElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTJCO0lBTHhDO1FBT0UsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFRTCxhQUFRLEdBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUM1QixhQUFRLEdBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQU03Qiw4QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDakMsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDO0lBNktuQyxDQUFDO0lBM0tDLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtvQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO3FCQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQjtZQUNILENBQUMsQ0FBQyxDQUFBO1NBQ0g7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLEVBQUc7WUFDakMs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RUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7K0RBQ1g7QUFHL0I7SUFERSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDOzBEQUNYO0FBRWY7SUFBVCxNQUFNLEVBQUU7NkRBQTZCO0FBQzVCO0lBQVQsTUFBTSxFQUFFOzZEQUE2QjtBQUU3QjtJQUFSLEtBQUssRUFBRTt5REFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzZEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs2REFBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7NERBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTs4RUFBa0M7QUFDakM7SUFBUixLQUFLLEVBQUU7d0VBQXlCO0FBbkJ0QiwyQkFBMkI7SUFMdkMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxteEhBQW9EOztLQUVyRCxDQUFDO0dBQ1csMkJBQTJCLENBZ012QztTQWhNWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmlld1BvcnQge1xyXG4gIHR5cGU6IHN0cmluZyxcclxuICBwb3N0ZXI/OiBzdHJpbmcsXHJcbiAgc3JjOiB7XHJcblx0c21hbGw/OiBzdHJpbmcsXHJcblx0bGFyZ2U/OiBzdHJpbmcsXHJcbiAgICBlZ2c/OiBzdHJpbmcsXHJcbiAgICBtcDQ/OiBzdHJpbmcsXHJcbiAgICB3ZWJtPzogc3RyaW5nXHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ZsZXhpYmxlLXByZXZpZXctYm94JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVByZXZpZXdCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIFxyXG4gIGFib3ZlRGF0YSA9IFtdO1xyXG4gIGJlbG93RGF0YSA9IFtdO1xyXG4gIFxyXG4gIEBWaWV3Q2hpbGQoXCJsYXJnZUltYWdlXCIsIHtzdGF0aWM6IGZhbHNlfSlcclxuXHRwcml2YXRlIGxhcmdlSW1hZ2U6IEVsZW1lbnRSZWY7XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJ2aWRlb1wiLCB7c3RhdGljOiBmYWxzZX0pXHJcblx0cHJpdmF0ZSB2aWRlbzogRWxlbWVudFJlZjtcclxuXHJcbiAgQE91dHB1dCgpIG9uc2VsZWN0PSBuZXcgRXZlbnRFbWl0dGVyKClcclxuICBAT3V0cHV0KCkgb25hY3Rpb249IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBASW5wdXQoKSBpdGVtOiBhbnk7XHJcbiAgQElucHV0KCkgdmlld3BvcnQ6IFZpZXdQb3J0O1xyXG4gIEBJbnB1dCgpIG1ldGFkYXRhOiBhbnlbXTtcclxuICBASW5wdXQoKSBlZmZlY3RzOiBhbnk7XHJcbiAgQElucHV0KCkgZW5hYmxlTW9iaWxlTWFnbmlmaWNhdGlvbiA9IHRydWU7XHJcbiAgQElucHV0KCkgbWFnbmlmaWNhdGlvbkZhY3RvciA9IDI7XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMubWV0YWRhdGEpIHtcclxuICAgICAgdGhpcy5tZXRhZGF0YS5tYXAgKCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLnBvc2l0aW9uID09PSAnYWJvdmUnKSB7XHJcbiAgICAgICAgICB0aGlzLmFib3ZlRGF0YS5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH1lbHNlIGlmIChkYXRhLnBvc2l0aW9uID09PSAnYmVsb3cnKSB7XHJcbiAgICAgICAgICB0aGlzLmJlbG93RGF0YS5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IgPCAyKSAge1xyXG4gICAgICB0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IgPSAyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpdGVtVmFsdWUoaXRlbTogYW55LCBocGF0aDogYW55W10pIHtcclxuXHRcdGxldCBzdWJpdGVtID0gaXRlbTtcclxuXHRcdGhwYXRoLm1hcCggKHN1YmtleSkgPT4ge1xyXG5cdFx0XHRpZiAoc3ViaXRlbSkge1xyXG5cdFx0XHRcdHN1Yml0ZW0gPSBzdWJpdGVtW3N1YmtleV07XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gc3ViaXRlbSA9PT0gdW5kZWZpbmVkIHx8IHN1Yml0ZW0gPT09IG51bGwgfHwgc3ViaXRlbSA9PT0gXCJudWxsXCIgPyBcIlwiIDogU3RyaW5nKHN1Yml0ZW0pO1xyXG5cdH1cclxuXHJcbiAgcm93Q29udGVudChyb3c6IGFueSkge1xyXG4gICAgaWYgKHJvdy5yYXdDb250ZW50KSB7XHJcbiAgICAgIHJldHVybiByb3cucmF3Q29udGVudCh0aGlzLml0ZW0pO1xyXG4gICAgfVxyXG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLml0ZW1WYWx1ZSh0aGlzLml0ZW0sIHJvdy5rZXkuc3BsaXQoXCIuXCIpKTtcclxuICAgIHJldHVybiAoY29udGVudCAhPT0gdW5kZWZpbmVkICYmIGNvbnRlbnQgIT0gbnVsbCkgPyBjb250ZW50IDogJyc7XHJcbiAgfVxyXG5cclxuICB0b3VjaHN0YXJ0KGV2ZW50OiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLmVuYWJsZU1vYmlsZU1hZ25pZmljYXRpb24gJiYgdGhpcy5sYXJnZUltYWdlICYmIHRoaXMuZWZmZWN0cy56b29tT25Ib3Zlcikge1xyXG4gICAgICBjb25zdCBpbWcgPSBldmVudC50YXJnZXQuY2hpbGRyZW5bMF07XHJcbiAgICAgIGlmIChpbWcpIHtcclxuICAgICAgICBjb25zdCByZWN0ID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gKHRoaXMubWFnbmlmaWNhdGlvbkZhY3RvciAqIHJlY3Qud2lkdGgpICsgJ3B4JztcclxuICAgICAgICB0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yICogcmVjdC5oZWlnaHQpICsgJ3B4JztcclxuICAgICAgICBpbWcuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub25hY3Rpb24uZW1pdCh7YWN0aW9uOiAndmlld3BvcnQnLCB0eXBlOiBldmVudC50eXBlLCBpdGVtOiB0aGlzLml0ZW19KTtcclxuICAgIH1cclxuICB9XHJcbiAgdG91Y2htb3ZlKGV2ZW50OiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLmVuYWJsZU1vYmlsZU1hZ25pZmljYXRpb24gJiYgdGhpcy5sYXJnZUltYWdlICYmIHRoaXMuZWZmZWN0cy56b29tT25Ib3Zlcikge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgY29uc3QgaW1nID0gZXZlbnQudGFyZ2V0LmNoaWxkcmVuWzBdO1xyXG4gICAgICBjb25zdCB2aWV3UiA9IGltZy5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBjb25zdCByZWN0ID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBjb25zdCB3aWR0aCA9ICBldmVudC50b3VjaGVzWzBdLmNsaWVudFggLSB2aWV3Ui54O1xyXG4gICAgICBjb25zdCBoZWlnaHQgPSAgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZIC0gdmlld1IueTtcclxuICAgICAgY29uc3QgZHggPSAodGhpcy5lZmZlY3RzLndpZHRoIC0gcmVjdC53aWR0aCkqKHRoaXMubWFnbmlmaWNhdGlvbkZhY3Rvci8yKTtcclxuICAgICAgY29uc3QgZHkgPSAodGhpcy5lZmZlY3RzLmhlaWdodCAtIHJlY3QuaGVpZ2h0KSoodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yLzIpO1xyXG4gICAgICBjb25zdCB5ID0gaGVpZ2h0ICogKHRoaXMubWFnbmlmaWNhdGlvbkZhY3RvciAtIDEpO1xyXG4gICAgICBjb25zdCB4ID0gd2lkdGggKiAodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yIC0gMSk7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9ICgteSArIGR5KSArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICgteCArIGR4KSArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgIHRoaXMub25hY3Rpb24uZW1pdCh7XHJcbiAgICAgICAgYWN0aW9uOiAndmlld3BvcnQnLFxyXG4gICAgICAgIHR5cGU6IGV2ZW50LnR5cGUsXHJcbiAgICAgICAgcG9zaXRpb246IHtZOiB4LCBYOiB5fSxcclxuICAgICAgICBpdGVtOiB0aGlzLml0ZW1cclxuICAgICAgfSk7XHJcblx0XHR9XHJcbiAgfVxyXG4gIHRvdWNoZW5kKGV2ZW50OiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLmVuYWJsZU1vYmlsZU1hZ25pZmljYXRpb24gJiYgdGhpcy5sYXJnZUltYWdlKSB7XHJcbiAgICAgIGNvbnN0IGltZyA9IGV2ZW50LnRhcmdldC5jaGlsZHJlblswXTtcclxuICAgICAgaW1nLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBcIi0xMDAwMHB4XCI7XHJcbiAgICAgIHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBcIi0xMDAwMHB4XCI7XHJcbiAgICAgIHRoaXMub25hY3Rpb24uZW1pdCh7YWN0aW9uOiAndmlld3BvcnQnLHR5cGU6IGV2ZW50LnR5cGUsIGl0ZW06IHRoaXMuaXRlbX0pO1xyXG5cdFx0fVxyXG4gIH1cclxuXHJcbiAgaG92ZXJPdmVyKGV2ZW50OiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLmxhcmdlSW1hZ2UgJiYgdGhpcy5lZmZlY3RzLnpvb21PbkhvdmVyKSB7XHJcbiAgICAgIGNvbnN0IGltZyA9IGV2ZW50LnRhcmdldC5jaGlsZHJlblswXTtcclxuICAgICAgaWYgKGltZykge1xyXG4gICAgICAgIGNvbnN0IHJlY3QgPSBpbWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSAodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yICogcmVjdC53aWR0aCkgKyAncHgnO1xyXG4gICAgICAgIHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9ICh0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IgKiByZWN0LmhlaWdodCkgKyAncHgnO1xyXG4gICAgICAgIGltZy5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vbmFjdGlvbi5lbWl0KHthY3Rpb246ICd2aWV3cG9ydCcsIHR5cGU6IGV2ZW50LnR5cGUsIGl0ZW06IHRoaXMuaXRlbX0pO1xyXG4gICAgfVxyXG5cdH1cclxuXHRob3Zlck91dChldmVudDogYW55KSB7XHJcblx0XHRpZiAodGhpcy5sYXJnZUltYWdlKSB7XHJcbiAgICAgIGNvbnN0IGltZyA9IGV2ZW50LnRhcmdldC5jaGlsZHJlblswXTtcclxuICAgICAgaW1nLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBcIi0xMDAwMHB4XCI7XHJcbiAgICAgIHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBcIi0xMDAwMHB4XCI7XHJcbiAgICAgIHRoaXMub25hY3Rpb24uZW1pdCh7YWN0aW9uOiAndmlld3BvcnQnLHR5cGU6IGV2ZW50LnR5cGUsIGl0ZW06IHRoaXMuaXRlbX0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRob3ZlclZpZXdQb3J0KGV2ZW50OiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLmxhcmdlSW1hZ2UgJiYgdGhpcy5lZmZlY3RzLnpvb21PbkhvdmVyKSB7XHJcbiAgICAgIGNvbnN0IGltZyA9IGV2ZW50LnRhcmdldC5jaGlsZHJlblswXTtcclxuICAgICAgY29uc3QgcmVjdCA9IGltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3QgZHggPSAodGhpcy5lZmZlY3RzLndpZHRoIC0gcmVjdC53aWR0aCkqKHRoaXMubWFnbmlmaWNhdGlvbkZhY3Rvci8yKTtcclxuICAgICAgY29uc3QgZHkgPSAodGhpcy5lZmZlY3RzLmhlaWdodCAtIHJlY3QuaGVpZ2h0KSoodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yLzIpO1xyXG4gICAgICBjb25zdCB5ID0gZXZlbnQubGF5ZXJZICogKHRoaXMubWFnbmlmaWNhdGlvbkZhY3RvciAtIDEpO1xyXG4gICAgICBjb25zdCB4ID0gZXZlbnQubGF5ZXJYICogKHRoaXMubWFnbmlmaWNhdGlvbkZhY3RvciAtIDEpO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSAoLXkgKyBkeSkgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAoLXggKyBkeCkgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICB0aGlzLm9uYWN0aW9uLmVtaXQoe1xyXG4gICAgICAgIGFjdGlvbjogJ3ZpZXdwb3J0JyxcclxuICAgICAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgICAgIHBvc2l0aW9uOiB7WTogeCwgWDogeX0sXHJcbiAgICAgICAgaXRlbTogdGhpcy5pdGVtXHJcbiAgICAgIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuICB1cGRhdGVDb250cm9scyhldmVudDogYW55KSB7XHJcbiAgICBpZiAodGhpcy52aWRlbykge1xyXG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXNldENvbnRyb2xzKGV2ZW50OiBhbnkpIHtcclxuICAgICAgaWYgKHRoaXMudmlkZW8gJiYgdGhpcy5pc1BsYXlpbmcodGhpcy52aWRlby5uYXRpdmVFbGVtZW50KSkge1xyXG4gICAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wYXVzZSgpO1xyXG4gICAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgaXNQbGF5aW5nKHZpZGVvOiBhbnkpIHtcclxuICAgICAgcmV0dXJuICEhKHZpZGVvLmN1cnJlbnRUaW1lID4gMCAmJiAhdmlkZW8ucGF1c2VkICYmICF2aWRlby5lbmRlZCAmJiB2aWRlby5yZWFkeVN0YXRlID4gMik7XHJcbiAgfVxyXG4gIGtleXVwKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmIChjb2RlID09PSAxMykge1xyXG4gICAgICBldmVudC50YXJnZXQuY2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0SXRlbShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLm9uc2VsZWN0LmVtaXQoe1xyXG4gICAgICBhY3Rpb246IFwicmVkaXJlY3RcIixcclxuICAgICAgdHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgIGl0ZW06IHRoaXMuaXRlbVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHZpZGVvRXZlbnQoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5vbmFjdGlvbi5lbWl0KHtcclxuICAgICAgYWN0aW9uOiAndmlkZW8nLFxyXG4gICAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgICBpdGVtOiB7XHJcbiAgICAgICAgICBhdXRvcGxheTogZXZlbnQudGFyZ2V0LmF1dG9wbGF5LFxyXG4gICAgICAgICAgY29udHJvbHM6IGV2ZW50LnRhcmdldC5jb250cm9scyxcclxuICAgICAgICAgIGR1cmF0aW9uOiBldmVudC50YXJnZXQuZHVyYXRpb24sXHJcbiAgICAgICAgICBlbmRlZDogZXZlbnQudGFyZ2V0LmVuZGVkLFxyXG4gICAgICAgICAgZXJyb3I6IGV2ZW50LnRhcmdldC5lcnJvcixcclxuICAgICAgICAgIHBhdXNlZDogZXZlbnQudGFyZ2V0LnBhdXNlZCxcclxuICAgICAgICAgIG11dGVkOiBldmVudC50YXJnZXQubXV0ZWQsXHJcbiAgICAgICAgICBjdXJyZW50VGltZTogZXZlbnQudGFyZ2V0LmN1cnJlbnRUaW1lLFxyXG4gICAgICAgICAgdm9sdW1lOiBldmVudC50YXJnZXQudm9sdW1lXHJcbiAgICAgIH1cclxuICB9KTtcclxuICB9XHJcbiAgb25Db21wb25lbnRDaGFuZ2UoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC5hY3Rpb24gJiYgZXZlbnQudHlwZSAmJiBldmVudC5pdGVtKSB7XHJcbiAgICAgIHRoaXMub25hY3Rpb24uZW1pdChldmVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9uYWN0aW9uLmVtaXQoe2FjdGlvbjogZXZlbnQubmFtZSwgdHlwZTogZXZlbnQuaXRlbSwgaXRlbTogdGhpcy5pdGVtfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==