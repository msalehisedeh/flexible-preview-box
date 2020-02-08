import * as tslib_1 from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
var FlexiblePreviewBoxComponent = /** @class */ (function () {
    function FlexiblePreviewBoxComponent() {
        this.aboveData = [];
        this.belowData = [];
        this.onselect = new EventEmitter();
        this.onaction = new EventEmitter();
        this.enableMobileMagnification = true;
        this.magnificationFactor = 2;
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
        if (this.magnificationFactor < 2) {
            this.magnificationFactor = 2;
        }
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
        if (row.rawContent) {
            return row.rawContent(this.item);
        }
        var content = this.itemValue(this.item, row.key.split("."));
        return (content !== undefined && content != null) ? content : '';
    };
    FlexiblePreviewBoxComponent.prototype.touchstart = function (event) {
        if (this.enableMobileMagnification && this.largeImage && this.effects.zoomOnHover) {
            var img = event.target.children[0];
            if (img) {
                var rect = img.getBoundingClientRect();
                this.largeImage.nativeElement.style.width = (this.magnificationFactor * rect.width) + 'px';
                this.largeImage.nativeElement.style.height = (this.magnificationFactor * rect.height) + 'px';
                img.style.visibility = 'hidden';
            }
            this.onaction.emit({ action: 'viewport', type: event.type, item: this.item });
        }
    };
    FlexiblePreviewBoxComponent.prototype.touchmove = function (event) {
        if (this.enableMobileMagnification && this.largeImage && this.effects.zoomOnHover) {
            event.preventDefault();
            event.stopPropagation();
            var img = event.target.children[0];
            var viewR = img.parentNode.getBoundingClientRect();
            var rect = img.getBoundingClientRect();
            var width = event.touches[0].clientX - viewR.x;
            var height = event.touches[0].clientY - viewR.y;
            var dx = (this.effects.width - rect.width) * (this.magnificationFactor / 2);
            var dy = (this.effects.height - rect.height) * (this.magnificationFactor / 2);
            var y = height * (this.magnificationFactor - 1);
            var x = width * (this.magnificationFactor - 1);
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
    };
    FlexiblePreviewBoxComponent.prototype.touchend = function (event) {
        if (this.enableMobileMagnification && this.largeImage) {
            var img = event.target.children[0];
            img.style.visibility = 'visible';
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
            this.onaction.emit({ action: 'viewport', type: event.type, item: this.item });
        }
    };
    FlexiblePreviewBoxComponent.prototype.hoverOver = function (event) {
        if (this.largeImage && this.effects.zoomOnHover) {
            var img = event.target.children[0];
            if (img) {
                var rect = img.getBoundingClientRect();
                this.largeImage.nativeElement.style.width = (this.magnificationFactor * rect.width) + 'px';
                this.largeImage.nativeElement.style.height = (this.magnificationFactor * rect.height) + 'px';
                img.style.visibility = 'hidden';
            }
            this.onaction.emit({ action: 'viewport', type: event.type, item: this.item });
        }
    };
    FlexiblePreviewBoxComponent.prototype.hoverOut = function (event) {
        if (this.largeImage) {
            var img = event.target.children[0];
            img.style.visibility = 'visible';
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
            this.onaction.emit({ action: 'viewport', type: event.type, item: this.item });
        }
    };
    FlexiblePreviewBoxComponent.prototype.hoverViewPort = function (event) {
        if (this.largeImage && this.effects.zoomOnHover) {
            var img = event.target.children[0];
            var rect = img.getBoundingClientRect();
            var dx = (this.effects.width - rect.width) * (this.magnificationFactor / 2);
            var dy = (this.effects.height - rect.height) * (this.magnificationFactor / 2);
            var y = event.layerY * (this.magnificationFactor - 1);
            var x = event.layerX * (this.magnificationFactor - 1);
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
    };
    FlexiblePreviewBoxComponent.prototype.updateControls = function (event) {
        if (this.video) {
            this.video.nativeElement.play();
        }
    };
    FlexiblePreviewBoxComponent.prototype.resetControls = function (event) {
        if (this.video && this.isPlaying(this.video.nativeElement)) {
            this.video.nativeElement.pause();
        }
    };
    FlexiblePreviewBoxComponent.prototype.isPlaying = function (video) {
        return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    };
    FlexiblePreviewBoxComponent.prototype.keyup = function (event) {
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    FlexiblePreviewBoxComponent.prototype.selectItem = function (event) {
        this.onselect.emit({
            action: "redirect",
            type: 'select',
            item: this.item
        });
    };
    FlexiblePreviewBoxComponent.prototype.videoEvent = function (event) {
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
    };
    FlexiblePreviewBoxComponent.prototype.onComponentChange = function (event) {
        if (event.action && event.type && event.item) {
            this.onaction.emit(event);
        }
        else {
            this.onaction.emit({ action: event.name, type: event.item, item: this.item });
        }
    };
    FlexiblePreviewBoxComponent.prototype.defaultAction = function () {
        // do nothing
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
            template: "<div class=\"above-viewport\" \r\n    [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of aboveData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.link]=\"row.action !== undefined\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\"\r\n        [attr.role]=\"row.action ? 'link' : ''\"\r\n        [tabIndex]=\"row.action ? 0 : -1\"\r\n        (click)=\"row.action ? row.action(item) : defaultAction()\">\r\n        <span class=\"label\" \r\n            [class.off-screen]=\"row.hidelabel\" \r\n            [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" \r\n            [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [tabIndex]=\"row.rawContent ? 0 : -1\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>\r\n<div \r\n    class=\"viewport\" \r\n    tabindex=\"0\"\r\n    [title]=\"item.name\"\r\n    [style.width]=\"effects.width ? (effects.width + 'px') : null\" \r\n    [style.height]=\"effects.height ? (effects.height + 'px') : null\" \r\n    (focus)=\"updateControls($event)\"\r\n    (blur)=\"resetControls($event)\"\r\n    (keyup)=\"keyup($event)\"\r\n    (click)=\"selectItem($event)\"\r\n    (touchstart)=\"touchstart($event)\"\r\n    (touchmove)=\"touchmove($event)\"\r\n    (touchend)=\"touchend($event)\"\r\n    (mouseout)=\"hoverOut($event)\"\r\n    (mouseover)=\"hoverOver($event)\"\r\n    (mousemove)=\"hoverViewPort($event)\">\r\n    <img  class=\"content\" \r\n            [src]=\"viewport.src.small\" \r\n            *ngIf=\"viewport.type === 'image'\" />\r\n    <img  class=\"hover\" #largeImage aria-hidden=\"true\"\r\n            [src]=\"viewport.src.large\" \r\n            *ngIf=\"effects.zoomOnHover\" />\r\n    <video  \r\n        class=\"content\" #video\r\n        [style.width]=\"effects.width ? (effects.width + 'px') : null\" \r\n        [style.height]=\"effects.height ? (effects.height + 'px') : null\" \r\n        [attr.poster]=\"viewport.poster ? viewport.poster : null\"\r\n        (mouseenter)=\"updateControls($event)\"\r\n        (mouseleave)=\"resetControls($event)\"\r\n        (play)=\"videoEvent($event)\"\r\n        (pause)=\"videoEvent($event)\"\r\n        (ended)=\"videoEvent($event)\"\r\n        (seeked)=\"videoEvent($event)\"\r\n        (error)=\"videoEvent($event)\"\r\n        (fullscreenchange)=\"videoEvent($event)\"\r\n        *ngIf=\"viewport.type === 'video'\">\r\n        <source [src]=\"viewport.src.mp4\" type=\"video/mp4\">\r\n        <source [src]=\"viewport.src.webm\" type=\"video/webm\">\r\n        <source [src]=\"viewport.src.egg\" type=\"video/ogg\">\r\n    </video>\r\n</div>\r\n<div class=\"below-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of belowData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.link]=\"row.action !== undefined\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\"\r\n        [attr.role]=\"row.action ? 'link' : ''\"\r\n        [tabIndex]=\"row.action ? 0 : -1\"\r\n        (click)=\"row.action ? row.action(item) : defaultAction()\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" \r\n            [intoName]=\"row.value\"\r\n            [class.full-width]=\"row.hidelabel\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>",
            styles: [":host{background-color:#fff;border:1px solid #ced4da;box-sizing:border-box;display:table;min-height:50px;padding:0;border-radius:5px;margin:5px}:host:focus{border-color:#0ba}:host:hover{border-color:purple;box-shadow:1px 1px 11px purple}:host ::ng-deep .rating{color:red}:host ::ng-deep share-component .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .box-row .label{float:left;font-weight:700;margin-right:5px}:host .box-row .value{float:left}:host .box-row .value.full-width{display:block;width:100%}:host .box-row.link{cursor:pointer}:host .box-row.left{text-align:left}:host .box-row.right .label{font-weight:700;flex:1;text-align:right}:host .box-row.center{width:inherit;display:table;margin:auto}:host .box-row.emphasize{font-weight:700;font-size:1.8rem}:host .box-row.side-by-side{max-width:250px;display:table;float:right;margin:0 5px}:host .above-viewport{padding:5px;box-sizing:border-box}:host .viewport{border-color:purple;box-sizing:border-box;border-top:1px solid #bcd;border-bottom:1px solid #bcd;min-height:100px;overflow:hidden;position:relative;margin:0 auto;box-sizing:border-box;cursor:pointer}:host .viewport img.content{margin:auto;display:table;pointer-events:none}:host .viewport video.content{margin:auto;display:table}:host .viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}:host .viewport:hover{border-color:purple}:host .below-viewport{padding:5px;box-sizing:border-box}@media screen and (max-width:600px){:host{width:100%}:host .above-viewport,:host .below-viewport,:host .viewport{width:100%!important;max-width:100%!important}}.clearblock{clear:both;display:block;width:100%;height:0;padding:0;margin:0}"]
        })
    ], FlexiblePreviewBoxComponent);
    return FlexiblePreviewBoxComponent;
}());
export { FlexiblePreviewBoxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZsZXhpYmxlLXByZXZpZXctYm94LyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1wcmV2aWV3LWJveC9jb21wb25lbnRzL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFFVCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFtQnZCO0lBTEE7UUFPRSxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQVFMLGFBQVEsR0FBRSxJQUFJLFlBQVksRUFBRSxDQUFBO1FBQzVCLGFBQVEsR0FBRSxJQUFJLFlBQVksRUFBRSxDQUFBO1FBTTdCLDhCQUF5QixHQUFHLElBQUksQ0FBQztRQUNqQyx3QkFBbUIsR0FBRyxDQUFDLENBQUM7SUFnTG5DLENBQUM7SUE5S0MsOENBQVEsR0FBUjtRQUFBLGlCQWFDO1FBWkMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFHLFVBQUMsSUFBSTtnQkFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtvQkFDN0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO3FCQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7b0JBQ25DLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQjtZQUNILENBQUMsQ0FBQyxDQUFBO1NBQ0g7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLEVBQUc7WUFDakMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENB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QUFDO1NBQzdFO0lBQ0gsQ0FBQztJQUNELG1EQUFhLEdBQWI7UUFDRSxhQUFhO0lBQ2YsQ0FBQztJQTVMRjtRQURFLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7bUVBQ1g7SUFHL0I7UUFERSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDOzhEQUNYO0lBRWY7UUFBVCxNQUFNLEVBQUU7aUVBQTZCO0lBQzVCO1FBQVQsTUFBTSxFQUFFO2lFQUE2QjtJQUU3QjtRQUFSLEtBQUssRUFBRTs2REFBVztJQUNWO1FBQVIsS0FBSyxFQUFFO2lFQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTtpRUFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7Z0VBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTtrRkFBa0M7SUFDakM7UUFBUixLQUFLLEVBQUU7NEVBQXlCO0lBbkJ0QiwyQkFBMkI7UUFMdkMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyx5MUlBQW9EOztTQUVyRCxDQUFDO09BQ1csMkJBQTJCLENBbU12QztJQUFELGtDQUFDO0NBQUEsQUFuTUQsSUFtTUM7U0FuTVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdQb3J0IHtcclxuICB0eXBlOiBzdHJpbmcsXHJcbiAgcG9zdGVyPzogc3RyaW5nLFxyXG4gIHNyYzoge1xyXG5cdHNtYWxsPzogc3RyaW5nLFxyXG5cdGxhcmdlPzogc3RyaW5nLFxyXG4gICAgZWdnPzogc3RyaW5nLFxyXG4gICAgbXA0Pzogc3RyaW5nLFxyXG4gICAgd2VibT86IHN0cmluZ1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmbGV4aWJsZS1wcmV2aWV3LWJveCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS1wcmV2aWV3LWJveC5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVQcmV2aWV3Qm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBcclxuICBhYm92ZURhdGEgPSBbXTtcclxuICBiZWxvd0RhdGEgPSBbXTtcclxuICBcclxuICBAVmlld0NoaWxkKFwibGFyZ2VJbWFnZVwiLCB7c3RhdGljOiBmYWxzZX0pXHJcblx0cHJpdmF0ZSBsYXJnZUltYWdlOiBFbGVtZW50UmVmO1xyXG5cclxuICBAVmlld0NoaWxkKFwidmlkZW9cIiwge3N0YXRpYzogZmFsc2V9KVxyXG5cdHByaXZhdGUgdmlkZW86IEVsZW1lbnRSZWY7XHJcblxyXG4gIEBPdXRwdXQoKSBvbnNlbGVjdD0gbmV3IEV2ZW50RW1pdHRlcigpXHJcbiAgQE91dHB1dCgpIG9uYWN0aW9uPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHJcbiAgQElucHV0KCkgaXRlbTogYW55O1xyXG4gIEBJbnB1dCgpIHZpZXdwb3J0OiBWaWV3UG9ydDtcclxuICBASW5wdXQoKSBtZXRhZGF0YTogYW55W107XHJcbiAgQElucHV0KCkgZWZmZWN0czogYW55O1xyXG4gIEBJbnB1dCgpIGVuYWJsZU1vYmlsZU1hZ25pZmljYXRpb24gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG1hZ25pZmljYXRpb25GYWN0b3IgPSAyO1xyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLm1ldGFkYXRhKSB7XHJcbiAgICAgIHRoaXMubWV0YWRhdGEubWFwICggKGRhdGEpID0+IHtcclxuICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PT0gJ2Fib3ZlJykge1xyXG4gICAgICAgICAgdGhpcy5hYm92ZURhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB9ZWxzZSBpZiAoZGF0YS5wb3NpdGlvbiA9PT0gJ2JlbG93Jykge1xyXG4gICAgICAgICAgdGhpcy5iZWxvd0RhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yIDwgMikgIHtcclxuICAgICAgdGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yID0gMjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXRlbVZhbHVlKGl0ZW06IGFueSwgaHBhdGg6IGFueVtdKSB7XHJcblx0XHRsZXQgc3ViaXRlbSA9IGl0ZW07XHJcblx0XHRocGF0aC5tYXAoIChzdWJrZXkpID0+IHtcclxuXHRcdFx0aWYgKHN1Yml0ZW0pIHtcclxuXHRcdFx0XHRzdWJpdGVtID0gc3ViaXRlbVtzdWJrZXldO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHN1Yml0ZW0gPT09IHVuZGVmaW5lZCB8fCBzdWJpdGVtID09PSBudWxsIHx8IHN1Yml0ZW0gPT09IFwibnVsbFwiID8gXCJcIiA6IFN0cmluZyhzdWJpdGVtKTtcclxuXHR9XHJcblxyXG4gIHJvd0NvbnRlbnQocm93OiBhbnkpIHtcclxuICAgIGlmIChyb3cucmF3Q29udGVudCkge1xyXG4gICAgICByZXR1cm4gcm93LnJhd0NvbnRlbnQodGhpcy5pdGVtKTtcclxuICAgIH1cclxuICAgIGxldCBjb250ZW50ID0gdGhpcy5pdGVtVmFsdWUodGhpcy5pdGVtLCByb3cua2V5LnNwbGl0KFwiLlwiKSk7XHJcbiAgICByZXR1cm4gKGNvbnRlbnQgIT09IHVuZGVmaW5lZCAmJiBjb250ZW50ICE9IG51bGwpID8gY29udGVudCA6ICcnO1xyXG4gIH1cclxuXHJcbiAgdG91Y2hzdGFydChldmVudDogYW55KSB7XHJcblx0XHRpZiAodGhpcy5lbmFibGVNb2JpbGVNYWduaWZpY2F0aW9uICYmIHRoaXMubGFyZ2VJbWFnZSAmJiB0aGlzLmVmZmVjdHMuem9vbU9uSG92ZXIpIHtcclxuICAgICAgY29uc3QgaW1nID0gZXZlbnQudGFyZ2V0LmNoaWxkcmVuWzBdO1xyXG4gICAgICBpZiAoaW1nKSB7XHJcbiAgICAgICAgY29uc3QgcmVjdCA9IGltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9ICh0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IgKiByZWN0LndpZHRoKSArICdweCc7XHJcbiAgICAgICAgdGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gKHRoaXMubWFnbmlmaWNhdGlvbkZhY3RvciAqIHJlY3QuaGVpZ2h0KSArICdweCc7XHJcbiAgICAgICAgaW1nLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9uYWN0aW9uLmVtaXQoe2FjdGlvbjogJ3ZpZXdwb3J0JywgdHlwZTogZXZlbnQudHlwZSwgaXRlbTogdGhpcy5pdGVtfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvdWNobW92ZShldmVudDogYW55KSB7XHJcblx0XHRpZiAodGhpcy5lbmFibGVNb2JpbGVNYWduaWZpY2F0aW9uICYmIHRoaXMubGFyZ2VJbWFnZSAmJiB0aGlzLmVmZmVjdHMuem9vbU9uSG92ZXIpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGNvbnN0IGltZyA9IGV2ZW50LnRhcmdldC5jaGlsZHJlblswXTtcclxuICAgICAgY29uc3Qgdmlld1IgPSBpbWcucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3QgcmVjdCA9IGltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3Qgd2lkdGggPSAgZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIC0gdmlld1IueDtcclxuICAgICAgY29uc3QgaGVpZ2h0ID0gIGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WSAtIHZpZXdSLnk7XHJcbiAgICAgIGNvbnN0IGR4ID0gKHRoaXMuZWZmZWN0cy53aWR0aCAtIHJlY3Qud2lkdGgpKih0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IvMik7XHJcbiAgICAgIGNvbnN0IGR5ID0gKHRoaXMuZWZmZWN0cy5oZWlnaHQgLSByZWN0LmhlaWdodCkqKHRoaXMubWFnbmlmaWNhdGlvbkZhY3Rvci8yKTtcclxuICAgICAgY29uc3QgeSA9IGhlaWdodCAqICh0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IgLSAxKTtcclxuICAgICAgY29uc3QgeCA9IHdpZHRoICogKHRoaXMubWFnbmlmaWNhdGlvbkZhY3RvciAtIDEpO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSAoLXkgKyBkeSkgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAoLXggKyBkeCkgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICB0aGlzLm9uYWN0aW9uLmVtaXQoe1xyXG4gICAgICAgIGFjdGlvbjogJ3ZpZXdwb3J0JyxcclxuICAgICAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgICAgIHBvc2l0aW9uOiB7WTogeCwgWDogeX0sXHJcbiAgICAgICAgaXRlbTogdGhpcy5pdGVtXHJcbiAgICAgIH0pO1xyXG5cdFx0fVxyXG4gIH1cclxuICB0b3VjaGVuZChldmVudDogYW55KSB7XHJcblx0XHRpZiAodGhpcy5lbmFibGVNb2JpbGVNYWduaWZpY2F0aW9uICYmIHRoaXMubGFyZ2VJbWFnZSkge1xyXG4gICAgICBjb25zdCBpbWcgPSBldmVudC50YXJnZXQuY2hpbGRyZW5bMF07XHJcbiAgICAgIGltZy5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gXCItMTAwMDBweFwiO1xyXG4gICAgICB0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gXCItMTAwMDBweFwiO1xyXG4gICAgICB0aGlzLm9uYWN0aW9uLmVtaXQoe2FjdGlvbjogJ3ZpZXdwb3J0Jyx0eXBlOiBldmVudC50eXBlLCBpdGVtOiB0aGlzLml0ZW19KTtcclxuXHRcdH1cclxuICB9XHJcblxyXG4gIGhvdmVyT3ZlcihldmVudDogYW55KSB7XHJcblx0XHRpZiAodGhpcy5sYXJnZUltYWdlICYmIHRoaXMuZWZmZWN0cy56b29tT25Ib3Zlcikge1xyXG4gICAgICBjb25zdCBpbWcgPSBldmVudC50YXJnZXQuY2hpbGRyZW5bMF07XHJcbiAgICAgIGlmIChpbWcpIHtcclxuICAgICAgICBjb25zdCByZWN0ID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gKHRoaXMubWFnbmlmaWNhdGlvbkZhY3RvciAqIHJlY3Qud2lkdGgpICsgJ3B4JztcclxuICAgICAgICB0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yICogcmVjdC5oZWlnaHQpICsgJ3B4JztcclxuICAgICAgICBpbWcuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub25hY3Rpb24uZW1pdCh7YWN0aW9uOiAndmlld3BvcnQnLCB0eXBlOiBldmVudC50eXBlLCBpdGVtOiB0aGlzLml0ZW19KTtcclxuICAgIH1cclxuXHR9XHJcblx0aG92ZXJPdXQoZXZlbnQ6IGFueSkge1xyXG5cdFx0aWYgKHRoaXMubGFyZ2VJbWFnZSkge1xyXG4gICAgICBjb25zdCBpbWcgPSBldmVudC50YXJnZXQuY2hpbGRyZW5bMF07XHJcbiAgICAgIGltZy5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gXCItMTAwMDBweFwiO1xyXG4gICAgICB0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gXCItMTAwMDBweFwiO1xyXG4gICAgICB0aGlzLm9uYWN0aW9uLmVtaXQoe2FjdGlvbjogJ3ZpZXdwb3J0Jyx0eXBlOiBldmVudC50eXBlLCBpdGVtOiB0aGlzLml0ZW19KTtcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJWaWV3UG9ydChldmVudDogYW55KSB7XHJcblx0XHRpZiAodGhpcy5sYXJnZUltYWdlICYmIHRoaXMuZWZmZWN0cy56b29tT25Ib3Zlcikge1xyXG4gICAgICBjb25zdCBpbWcgPSBldmVudC50YXJnZXQuY2hpbGRyZW5bMF07XHJcbiAgICAgIGNvbnN0IHJlY3QgPSBpbWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGNvbnN0IGR4ID0gKHRoaXMuZWZmZWN0cy53aWR0aCAtIHJlY3Qud2lkdGgpKih0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IvMik7XHJcbiAgICAgIGNvbnN0IGR5ID0gKHRoaXMuZWZmZWN0cy5oZWlnaHQgLSByZWN0LmhlaWdodCkqKHRoaXMubWFnbmlmaWNhdGlvbkZhY3Rvci8yKTtcclxuICAgICAgY29uc3QgeSA9IGV2ZW50LmxheWVyWSAqICh0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IgLSAxKTtcclxuICAgICAgY29uc3QgeCA9IGV2ZW50LmxheWVyWCAqICh0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IgLSAxKTtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gKC15ICsgZHkpICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKC14ICsgZHgpICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgdGhpcy5vbmFjdGlvbi5lbWl0KHtcclxuICAgICAgICBhY3Rpb246ICd2aWV3cG9ydCcsXHJcbiAgICAgICAgdHlwZTogZXZlbnQudHlwZSxcclxuICAgICAgICBwb3NpdGlvbjoge1k6IHgsIFg6IHl9LFxyXG4gICAgICAgIGl0ZW06IHRoaXMuaXRlbVxyXG4gICAgICB9KTtcclxuXHRcdH1cclxuXHR9XHJcbiAgdXBkYXRlQ29udHJvbHMoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMudmlkZW8pIHtcclxuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXkoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVzZXRDb250cm9scyhldmVudDogYW55KSB7XHJcbiAgICAgIGlmICh0aGlzLnZpZGVvICYmIHRoaXMuaXNQbGF5aW5nKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCkpIHtcclxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGF1c2UoKTtcclxuICAgICAgfVxyXG4gIH1cclxuICBwcml2YXRlIGlzUGxheWluZyh2aWRlbzogYW55KSB7XHJcbiAgICAgIHJldHVybiAhISh2aWRlby5jdXJyZW50VGltZSA+IDAgJiYgIXZpZGVvLnBhdXNlZCAmJiAhdmlkZW8uZW5kZWQgJiYgdmlkZW8ucmVhZHlTdGF0ZSA+IDIpO1xyXG4gIH1cclxuICBrZXl1cChldmVudDogYW55KSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoY29kZSA9PT0gMTMpIHtcclxuICAgICAgZXZlbnQudGFyZ2V0LmNsaWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlbGVjdEl0ZW0oZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5vbnNlbGVjdC5lbWl0KHtcclxuICAgICAgYWN0aW9uOiBcInJlZGlyZWN0XCIsXHJcbiAgICAgIHR5cGU6ICdzZWxlY3QnLFxyXG4gICAgICBpdGVtOiB0aGlzLml0ZW1cclxuICAgIH0pO1xyXG4gIH1cclxuICB2aWRlb0V2ZW50KGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMub25hY3Rpb24uZW1pdCh7XHJcbiAgICAgIGFjdGlvbjogJ3ZpZGVvJyxcclxuICAgICAgdHlwZTogZXZlbnQudHlwZSxcclxuICAgICAgaXRlbToge1xyXG4gICAgICAgICAgYXV0b3BsYXk6IGV2ZW50LnRhcmdldC5hdXRvcGxheSxcclxuICAgICAgICAgIGNvbnRyb2xzOiBldmVudC50YXJnZXQuY29udHJvbHMsXHJcbiAgICAgICAgICBkdXJhdGlvbjogZXZlbnQudGFyZ2V0LmR1cmF0aW9uLFxyXG4gICAgICAgICAgZW5kZWQ6IGV2ZW50LnRhcmdldC5lbmRlZCxcclxuICAgICAgICAgIGVycm9yOiBldmVudC50YXJnZXQuZXJyb3IsXHJcbiAgICAgICAgICBwYXVzZWQ6IGV2ZW50LnRhcmdldC5wYXVzZWQsXHJcbiAgICAgICAgICBtdXRlZDogZXZlbnQudGFyZ2V0Lm11dGVkLFxyXG4gICAgICAgICAgY3VycmVudFRpbWU6IGV2ZW50LnRhcmdldC5jdXJyZW50VGltZSxcclxuICAgICAgICAgIHZvbHVtZTogZXZlbnQudGFyZ2V0LnZvbHVtZVxyXG4gICAgICB9XHJcbiAgfSk7XHJcbiAgfVxyXG4gIG9uQ29tcG9uZW50Q2hhbmdlKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuYWN0aW9uICYmIGV2ZW50LnR5cGUgJiYgZXZlbnQuaXRlbSkge1xyXG4gICAgICB0aGlzLm9uYWN0aW9uLmVtaXQoZXZlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vbmFjdGlvbi5lbWl0KHthY3Rpb246IGV2ZW50Lm5hbWUsIHR5cGU6IGV2ZW50Lml0ZW0sIGl0ZW06IHRoaXMuaXRlbX0pO1xyXG4gICAgfVxyXG4gIH1cclxuICBkZWZhdWx0QWN0aW9uKCkge1xyXG4gICAgLy8gZG8gbm90aGluZ1xyXG4gIH1cclxufVxyXG4iXX0=