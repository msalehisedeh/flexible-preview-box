/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
var FlexiblePreviewBoxComponent = /** @class */ (function () {
    function FlexiblePreviewBoxComponent() {
        this.aboveData = [];
        this.belowData = [];
        this.onselect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    /**
     * @param {?} changes
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
    };
    /**
     * @param {?} item
     * @param {?} hpath
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.itemValue = /**
     * @param {?} item
     * @param {?} hpath
     * @return {?}
     */
    function (item, hpath) {
        /** @type {?} */
        var subitem = item;
        hpath.map(function (subkey) {
            if (subitem) {
                subitem = subitem[subkey];
            }
        });
        return subitem === undefined || subitem === null || subitem === "null" ? "" : String(subitem);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.rowContent = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        /** @type {?} */
        var content = this.itemValue(this.item, row.key.split("."));
        return (content !== undefined && content != null) ? content : '';
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.hoverOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.largeImage && this.effects.zoomOnHover && event.target.nodeName === 'IMG') {
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.hoverOut = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.largeImage) {
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.hoverViewPort = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.largeImage && this.effects.zoomOnHover) {
            this.largeImage.nativeElement.style.opacity = 1;
            this.largeImage.nativeElement.style.top = -event.layerY + "px";
            this.largeImage.nativeElement.style.left = -event.layerX + "px";
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.keyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.selectItem = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onselect.emit({
            item: this.item,
            selected: true,
            action: "redirect"
        });
    };
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.videoPlayed = /**
     * @param {?} trackingTime
     * @return {?}
     */
    function (trackingTime) {
    };
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.videoPaused = /**
     * @param {?} trackingTime
     * @return {?}
     */
    function (trackingTime) {
    };
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.videoEnded = /**
     * @param {?} trackingTime
     * @return {?}
     */
    function (trackingTime) {
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.onComponentChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onselect.emit(event);
    };
    FlexiblePreviewBoxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'flexible-preview-box',
                    template: "<div class=\"above-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of aboveData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>\r\n<div \r\n    class=\"viewport\" \r\n    tabindex=\"0\"\r\n    [title]=\"item.name\"\r\n    [style.width]=\"effects.width + 'px'\" \r\n    [style.height]=\"effects.height + 'px'\"\r\n    (keyup)=\"keyup($event)\"\r\n    (click)=\"selectItem($event)\"\r\n    (mouseout)=\"hoverOut($event)\"\r\n    (mouseover)=\"hoverOver($event)\"\r\n    (mousemove)=\"hoverViewPort($event)\">\r\n    <img  class=\"content\" \r\n            [src]=\"viewport.src.small\" \r\n            *ngIf=\"viewport.type === 'image'\" />\r\n    <img  class=\"hover\" #largeImage\r\n            [style.width]=\"(effects.width*2) + 'px'\"\r\n            [style.height]=\"(effects.height*2) + 'px'\"\r\n            [src]=\"viewport.src.large\" \r\n            *ngIf=\"effects.zoomOnHover\" />\r\n    <video  \r\n        class=\"content\" #video\r\n        [style.width]=\"effects.width + 'px'\" \r\n        [style.height]=\"effects.height + 'px'\"\r\n        (play)=\"videoPlayed(video.currentTime)\"\r\n        (pause)=\"videoPaused(video.currentTime)\"\r\n        (ended)=\"videoEnded(video.currentTime)\"\r\n        *ngIf=\"viewport.type === 'video'\" controls>\r\n        <source [src]=\"viewport.src.mp4\" type=\"video/mp4\">\r\n        <source [src]=\"viewport.src.webm\" type=\"video/webm\">\r\n        <source [src]=\"viewport.src.egg\" type=\"video/ogg\">\r\n    </video>\r\n</div>\r\n<div class=\"below-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of belowData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>",
                    styles: [":host{background-color:#fff;border:1px solid #ced4da;box-sizing:border-box;display:table;min-height:50px;padding:0;border-radius:5px;margin:5px}:host ::ng-deep .rating{color:red}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .box-row{display:flex;width:100%}:host .box-row .label{float:left;font-weight:700;margin-right:5px}:host .box-row .value{float:left}:host .box-row.left{text-align:left}:host .box-row.right .label{font-weight:700;flex:1;text-align:right}:host .box-row.center{width:inherit;display:table;margin:auto}:host .box-row.emphasize{font-weight:700;font-size:1.8rem}:host .box-row.side-by-side{max-width:250px;width:inherit;display:table;float:right;margin:0 5px}:host .above-viewport{padding:5px;box-sizing:border-box}:host .viewport{border-color:purple;box-sizing:border-box;border-top:1px solid #bcd;border-bottom:1px solid #bcd;min-height:150px;overflow:hidden;position:relative;margin:0 auto;box-sizing:border-box;cursor:pointer}:host .viewport img.content{margin:auto;display:table}:host .viewport video.content{margin:auto;display:table}:host .viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}:host .viewport:hover{border-color:purple}:host .below-viewport{padding:5px;box-sizing:border-box}.clearblock{clear:both;display:block;width:100%;height:0;padding:0;margin:0}:host:focus{border-color:#0ba}:host:hover{border-color:purple;box-shadow:1px 1px 11px purple}"]
                }] }
    ];
    /** @nocollapse */
    FlexiblePreviewBoxComponent.ctorParameters = function () { return []; };
    FlexiblePreviewBoxComponent.propDecorators = {
        largeImage: [{ type: ViewChild, args: ["largeImage",] }],
        onselect: [{ type: Output, args: ["onselect",] }],
        item: [{ type: Input, args: ["item",] }],
        viewport: [{ type: Input, args: ["viewport",] }],
        metadata: [{ type: Input, args: ["metadata",] }],
        effects: [{ type: Input, args: ["effects",] }]
    };
    return FlexiblePreviewBoxComponent;
}());
export { FlexiblePreviewBoxComponent };
if (false) {
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.aboveData;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.belowData;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.largeImage;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.onselect;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.item;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.viewport;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.metadata;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.effects;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZmxleGlibGUtcHJldmlldy1ib3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2ZsZXhpYmxlLXByZXZpZXctYm94L2NvbXBvbmVudHMvZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7O0lBOEJyQjt5QkFyQlksRUFBRTt5QkFDRixFQUFFO3dCQU1KLElBQUksWUFBWSxFQUFFO0tBZTNCOzs7O0lBRUQsOENBQVE7OztJQUFSO1FBQUEsaUJBVUM7UUFUQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRyxVQUFDLElBQUk7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO2dCQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQjthQUNGLENBQUMsQ0FBQTtTQUNIO0tBQ0Y7Ozs7O0lBRUQsaURBQVc7Ozs7SUFBWCxVQUFZLE9BQU87S0FFbEI7Ozs7OztJQUVPLCtDQUFTOzs7OztjQUFDLElBQUksRUFBRSxLQUFLOztRQUM3QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsS0FBSyxDQUFDLEdBQUcsQ0FB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Qjs7OztJQUFqQixVQUFrQixLQUFLO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzNCOztnQkExR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLDh3R0FBb0Q7O2lCQUVyRDs7Ozs7NkJBTUUsU0FBUyxTQUFDLFlBQVk7MkJBR3RCLE1BQU0sU0FBQyxVQUFVO3VCQUdqQixLQUFLLFNBQUMsTUFBTTsyQkFHWixLQUFLLFNBQUMsVUFBVTsyQkFHaEIsS0FBSyxTQUFDLFVBQVU7MEJBR2hCLEtBQUssU0FBQyxTQUFTOztzQ0FyQ2xCOztTQWlCYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ZsZXhpYmxlLXByZXZpZXctYm94JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVByZXZpZXdCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgXHJcbiAgYWJvdmVEYXRhID0gW107XHJcbiAgYmVsb3dEYXRhID0gW107XHJcbiAgXHJcbiAgQFZpZXdDaGlsZChcImxhcmdlSW1hZ2VcIilcclxuXHRwcml2YXRlIGxhcmdlSW1hZ2U6IEVsZW1lbnRSZWY7XHJcblxyXG4gIEBPdXRwdXQoXCJvbnNlbGVjdFwiKVxyXG4gIG9uc2VsZWN0PSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHJcbiAgQElucHV0KFwiaXRlbVwiKVxyXG4gIGl0ZW06IGFueTtcclxuXHJcbiAgQElucHV0KFwidmlld3BvcnRcIilcclxuICB2aWV3cG9ydDogYW55O1xyXG4gIFxyXG4gIEBJbnB1dChcIm1ldGFkYXRhXCIpXHJcbiAgbWV0YWRhdGE6IGFueVtdO1xyXG5cclxuICBASW5wdXQoXCJlZmZlY3RzXCIpXHJcbiAgZWZmZWN0czogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcdCAgXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLm1ldGFkYXRhKSB7XHJcbiAgICAgIHRoaXMubWV0YWRhdGEubWFwICggKGRhdGEpID0+IHtcclxuICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PT0gJ2Fib3ZlJykge1xyXG4gICAgICAgICAgdGhpcy5hYm92ZURhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB9ZWxzZSBpZiAoZGF0YS5wb3NpdGlvbiA9PT0gJ2JlbG93Jykge1xyXG4gICAgICAgICAgdGhpcy5iZWxvd0RhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpdGVtVmFsdWUoaXRlbSwgaHBhdGgpIHtcclxuXHRcdGxldCBzdWJpdGVtID0gaXRlbTtcclxuXHRcdGhwYXRoLm1hcCggKHN1YmtleSkgPT4ge1xyXG5cdFx0XHRpZiAoc3ViaXRlbSkge1xyXG5cdFx0XHRcdHN1Yml0ZW0gPSBzdWJpdGVtW3N1YmtleV07XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gc3ViaXRlbSA9PT0gdW5kZWZpbmVkIHx8IHN1Yml0ZW0gPT09IG51bGwgfHwgc3ViaXRlbSA9PT0gXCJudWxsXCIgPyBcIlwiIDogU3RyaW5nKHN1Yml0ZW0pO1xyXG5cdH1cclxuXHJcbiAgcm93Q29udGVudChyb3cpIHtcclxuICAgIGxldCBjb250ZW50ID0gdGhpcy5pdGVtVmFsdWUodGhpcy5pdGVtLCByb3cua2V5LnNwbGl0KFwiLlwiKSk7XHJcbiAgICByZXR1cm4gKGNvbnRlbnQgIT09IHVuZGVmaW5lZCAmJiBjb250ZW50ICE9IG51bGwpID8gY29udGVudCA6ICcnO1xyXG4gIH1cclxuXHJcbiAgaG92ZXJPdmVyKGV2ZW50KSB7XHJcblx0XHRpZiAodGhpcy5sYXJnZUltYWdlICYmIHRoaXMuZWZmZWN0cy56b29tT25Ib3ZlciAmJiBldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdJTUcnKSB7XHJcblxyXG4gICAgfVxyXG5cdH1cclxuXHRob3Zlck91dChldmVudCkge1xyXG5cdFx0aWYgKHRoaXMubGFyZ2VJbWFnZSkge1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gXCItMTAwMDBweFwiO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gXCItMTAwMDBweFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRob3ZlclZpZXdQb3J0KGV2ZW50KSB7XHJcblx0XHRpZiAodGhpcy5sYXJnZUltYWdlICYmIHRoaXMuZWZmZWN0cy56b29tT25Ib3Zlcikge1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gLWV2ZW50LmxheWVyWSArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IC1ldmVudC5sYXllclggKyBcInB4XCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICBrZXl1cChldmVudCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cclxuICAgIGlmIChjb2RlID09PSAxMykge1xyXG4gICAgICBldmVudC50YXJnZXQuY2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0SXRlbShldmVudCkge1xyXG4gICAgdGhpcy5vbnNlbGVjdC5lbWl0KHtcclxuICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICBzZWxlY3RlZDogdHJ1ZSxcclxuICAgICAgYWN0aW9uOiBcInJlZGlyZWN0XCJcclxuICAgIH0pO1xyXG4gIH1cclxuICB2aWRlb1BsYXllZCh0cmFja2luZ1RpbWUpIHsgXHJcbiAgfVxyXG4gIHZpZGVvUGF1c2VkKHRyYWNraW5nVGltZSkge1xyXG5cclxuICB9XHJcbiAgdmlkZW9FbmRlZCh0cmFja2luZ1RpbWUpIHtcclxuXHJcbiAgfVxyXG4gIG9uQ29tcG9uZW50Q2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uc2VsZWN0LmVtaXQoZXZlbnQpO1xyXG4gIH1cclxufVxyXG4iXX0=