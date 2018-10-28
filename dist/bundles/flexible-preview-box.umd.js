(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('into-pipes')) :
    typeof define === 'function' && define.amd ? define('flexible-preview-box', ['exports', '@angular/core', '@angular/common', 'into-pipes'], factory) :
    (factory((global['flexible-preview-box'] = {}),global.ng.core,global.ng.common,global.intoPipes));
}(this, (function (exports,core,common,intoPipes) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FlexiblePreviewBoxComponent = (function () {
        function FlexiblePreviewBoxComponent() {
            this.aboveData = [];
            this.belowData = [];
            this.onselect = new core.EventEmitter();
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
                if (this.largeImage && this.effects.zoomOnHover && event.target.nodeName === 'IMG') ;
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
            { type: core.Component, args: [{
                        selector: 'flexible-preview-box',
                        template: "<div class=\"above-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of aboveData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>\r\n<div \r\n    class=\"viewport\" \r\n    tabindex=\"0\"\r\n    [title]=\"item.name\"\r\n    [style.width]=\"effects.width + 'px'\" \r\n    [style.height]=\"effects.height + 'px'\"\r\n    (keyup)=\"keyup($event)\"\r\n    (click)=\"selectItem($event)\"\r\n    (mouseout)=\"hoverOut($event)\"\r\n    (mouseover)=\"hoverOver($event)\"\r\n    (mousemove)=\"hoverViewPort($event)\">\r\n    <img  class=\"content\" \r\n            [src]=\"viewport.src.small\" \r\n            *ngIf=\"viewport.type === 'image'\" />\r\n    <img  class=\"hover\" #largeImage\r\n            [style.width]=\"(effects.width*2) + 'px'\"\r\n            [style.height]=\"(effects.height*2) + 'px'\"\r\n            [src]=\"viewport.src.large\" \r\n            *ngIf=\"effects.zoomOnHover\" />\r\n    <video  \r\n        class=\"content\" #video\r\n        [style.width]=\"effects.width + 'px'\" \r\n        [style.height]=\"effects.height + 'px'\"\r\n        (play)=\"videoPlayed(video.currentTime)\"\r\n        (pause)=\"videoPaused(video.currentTime)\"\r\n        (ended)=\"videoEnded(video.currentTime)\"\r\n        *ngIf=\"viewport.type === 'video'\" controls>\r\n        <source [src]=\"viewport.src.mp4\" type=\"video/mp4\">\r\n        <source [src]=\"viewport.src.webm\" type=\"video/webm\">\r\n        <source [src]=\"viewport.src.egg\" type=\"video/ogg\">\r\n    </video>\r\n</div>\r\n<div class=\"below-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of belowData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>",
                        styles: [":host{background-color:#fff;border:1px solid #ced4da;box-sizing:border-box;display:table;min-height:50px;padding:0;border-radius:5px;margin:5px}:host ::ng-deep .rating{color:red}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .box-row{display:flex;width:100%}:host .box-row .label{float:left;font-weight:700;margin-right:5px}:host .box-row .value{float:left}:host .box-row.left{text-align:left}:host .box-row.right .label{font-weight:700;flex:1;text-align:right}:host .box-row.center{width:inherit;display:table;margin:auto}:host .box-row.emphasize{font-weight:700;font-size:1.8rem}:host .box-row.side-by-side{max-width:250px;width:inherit;display:table;float:right;margin:0 5px}:host .above-viewport{padding:5px;box-sizing:border-box}:host .viewport{border-color:purple;box-sizing:border-box;border-top:1px solid #bcd;border-bottom:1px solid #bcd;min-height:150px;overflow:hidden;position:relative;margin:0 auto;box-sizing:border-box;cursor:pointer}:host .viewport img.content{margin:auto;display:table}:host .viewport video.content{margin:auto;display:table}:host .viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}:host .viewport:hover{border-color:purple}:host .below-viewport{padding:5px;box-sizing:border-box}.clearblock{clear:both;display:block;width:100%;height:0;padding:0;margin:0}:host:focus{border-color:#0ba}:host:hover{border-color:purple;box-shadow:1px 1px 11px purple}"]
                    }] }
        ];
        /** @nocollapse */
        FlexiblePreviewBoxComponent.ctorParameters = function () { return []; };
        FlexiblePreviewBoxComponent.propDecorators = {
            largeImage: [{ type: core.ViewChild, args: ["largeImage",] }],
            onselect: [{ type: core.Output, args: ["onselect",] }],
            item: [{ type: core.Input, args: ["item",] }],
            viewport: [{ type: core.Input, args: ["viewport",] }],
            metadata: [{ type: core.Input, args: ["metadata",] }],
            effects: [{ type: core.Input, args: ["effects",] }]
        };
        return FlexiblePreviewBoxComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FlexiblePreviewBoxModule = (function () {
        function FlexiblePreviewBoxModule() {
        }
        FlexiblePreviewBoxModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            intoPipes.IntoPipeModule
                        ],
                        declarations: [
                            FlexiblePreviewBoxComponent
                        ],
                        exports: [
                            FlexiblePreviewBoxComponent
                        ],
                        entryComponents: [],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return FlexiblePreviewBoxModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.FlexiblePreviewBoxComponent = FlexiblePreviewBoxComponent;
    exports.FlexiblePreviewBoxModule = FlexiblePreviewBoxModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtcHJldmlldy1ib3gudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9mbGV4aWJsZS1wcmV2aWV3LWJveC9zcmMvYXBwL2ZsZXhpYmxlLXByZXZpZXctYm94L2NvbXBvbmVudHMvZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50LnRzIiwibmc6Ly9mbGV4aWJsZS1wcmV2aWV3LWJveC9zcmMvYXBwL2ZsZXhpYmxlLXByZXZpZXctYm94L2ZsZXhpYmxlLXByZXZpZXctYm94Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2ZsZXhpYmxlLXByZXZpZXctYm94JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVByZXZpZXdCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgXHJcbiAgYWJvdmVEYXRhID0gW107XHJcbiAgYmVsb3dEYXRhID0gW107XHJcbiAgXHJcbiAgQFZpZXdDaGlsZChcImxhcmdlSW1hZ2VcIilcclxuXHRwcml2YXRlIGxhcmdlSW1hZ2U6IEVsZW1lbnRSZWY7XHJcblxyXG4gIEBPdXRwdXQoXCJvbnNlbGVjdFwiKVxyXG4gIG9uc2VsZWN0PSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHJcbiAgQElucHV0KFwiaXRlbVwiKVxyXG4gIGl0ZW06IGFueTtcclxuXHJcbiAgQElucHV0KFwidmlld3BvcnRcIilcclxuICB2aWV3cG9ydDogYW55O1xyXG4gIFxyXG4gIEBJbnB1dChcIm1ldGFkYXRhXCIpXHJcbiAgbWV0YWRhdGE6IGFueVtdO1xyXG5cclxuICBASW5wdXQoXCJlZmZlY3RzXCIpXHJcbiAgZWZmZWN0czogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcdCAgXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLm1ldGFkYXRhKSB7XHJcbiAgICAgIHRoaXMubWV0YWRhdGEubWFwICggKGRhdGEpID0+IHtcclxuICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PT0gJ2Fib3ZlJykge1xyXG4gICAgICAgICAgdGhpcy5hYm92ZURhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB9ZWxzZSBpZiAoZGF0YS5wb3NpdGlvbiA9PT0gJ2JlbG93Jykge1xyXG4gICAgICAgICAgdGhpcy5iZWxvd0RhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpdGVtVmFsdWUoaXRlbSwgaHBhdGgpIHtcclxuXHRcdGxldCBzdWJpdGVtID0gaXRlbTtcclxuXHRcdGhwYXRoLm1hcCggKHN1YmtleSkgPT4ge1xyXG5cdFx0XHRpZiAoc3ViaXRlbSkge1xyXG5cdFx0XHRcdHN1Yml0ZW0gPSBzdWJpdGVtW3N1YmtleV07XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gc3ViaXRlbSA9PT0gdW5kZWZpbmVkIHx8IHN1Yml0ZW0gPT09IG51bGwgfHwgc3ViaXRlbSA9PT0gXCJudWxsXCIgPyBcIlwiIDogU3RyaW5nKHN1Yml0ZW0pO1xyXG5cdH1cclxuXHJcbiAgcm93Q29udGVudChyb3cpIHtcclxuICAgIGxldCBjb250ZW50ID0gdGhpcy5pdGVtVmFsdWUodGhpcy5pdGVtLCByb3cua2V5LnNwbGl0KFwiLlwiKSk7XHJcbiAgICByZXR1cm4gKGNvbnRlbnQgIT09IHVuZGVmaW5lZCAmJiBjb250ZW50ICE9IG51bGwpID8gY29udGVudCA6ICcnO1xyXG4gIH1cclxuXHJcbiAgaG92ZXJPdmVyKGV2ZW50KSB7XHJcblx0XHRpZiAodGhpcy5sYXJnZUltYWdlICYmIHRoaXMuZWZmZWN0cy56b29tT25Ib3ZlciAmJiBldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdJTUcnKSB7XHJcblxyXG4gICAgfVxyXG5cdH1cclxuXHRob3Zlck91dChldmVudCkge1xyXG5cdFx0aWYgKHRoaXMubGFyZ2VJbWFnZSkge1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gXCItMTAwMDBweFwiO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gXCItMTAwMDBweFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRob3ZlclZpZXdQb3J0KGV2ZW50KSB7XHJcblx0XHRpZiAodGhpcy5sYXJnZUltYWdlICYmIHRoaXMuZWZmZWN0cy56b29tT25Ib3Zlcikge1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gLWV2ZW50LmxheWVyWSArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IC1ldmVudC5sYXllclggKyBcInB4XCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICBrZXl1cChldmVudCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cclxuICAgIGlmIChjb2RlID09PSAxMykge1xyXG4gICAgICBldmVudC50YXJnZXQuY2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0SXRlbShldmVudCkge1xyXG4gICAgdGhpcy5vbnNlbGVjdC5lbWl0KHtcclxuICAgICAgaXRlbTogdGhpcy5pdGVtLFxyXG4gICAgICBzZWxlY3RlZDogdHJ1ZSxcclxuICAgICAgYWN0aW9uOiBcInJlZGlyZWN0XCJcclxuICAgIH0pO1xyXG4gIH1cclxuICB2aWRlb1BsYXllZCh0cmFja2luZ1RpbWUpIHsgXHJcbiAgfVxyXG4gIHZpZGVvUGF1c2VkKHRyYWNraW5nVGltZSkge1xyXG5cclxuICB9XHJcbiAgdmlkZW9FbmRlZCh0cmFja2luZ1RpbWUpIHtcclxuXHJcbiAgfVxyXG4gIG9uQ29tcG9uZW50Q2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uc2VsZWN0LmVtaXQoZXZlbnQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBJbnRvUGlwZU1vZHVsZSB9IGZyb20gJ2ludG8tcGlwZXMnO1xyXG5cclxuaW1wb3J0IHsgRmxleGlibGVQcmV2aWV3Qm94Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEludG9QaXBlTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZsZXhpYmxlUHJldmlld0JveENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRmxleGlibGVQcmV2aWV3Qm94Q29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlUHJldmlld0JveE1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiVmlld0NoaWxkIiwiT3V0cHV0IiwiSW5wdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkludG9QaXBlTW9kdWxlIiwiQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBO1FBdUNFOzZCQXJCWSxFQUFFOzZCQUNGLEVBQUU7NEJBTUosSUFBSUEsaUJBQVksRUFBRTtTQWUzQjs7OztRQUVELDhDQUFROzs7WUFBUjtnQkFBQSxpQkFVQztnQkFUQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFHLFVBQUMsSUFBSTt3QkFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTs0QkFDN0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzNCOzZCQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7NEJBQ25DLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUMzQjtxQkFDRixDQUFDLENBQUE7aUJBQ0g7YUFDRjs7Ozs7UUFFRCxpREFBVzs7OztZQUFYLFVBQVksT0FBTzthQUVsQjs7Ozs7O1FBRU8sK0NBQVM7Ozs7O3NCQUFDLElBQUksRUFBRSxLQUFLOztnQkFDN0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixLQUFLLENBQUMsR0FBRyxDQUFFLFVBQUMsTUFBTTtvQkFDakIsSUFBSSxPQUFPLEVBQUU7d0JBQ1osT0FBTyxHQUFHLE9BQU8sQ0FB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