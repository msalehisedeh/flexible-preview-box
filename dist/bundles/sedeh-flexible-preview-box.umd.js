(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@sedeh/into-pipes')) :
    typeof define === 'function' && define.amd ? define('@sedeh/flexible-preview-box', ['exports', '@angular/core', '@angular/common', '@sedeh/into-pipes'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['flexible-preview-box'] = {}), global.ng.core, global.ng.common, global['into-pipes']));
}(this, (function (exports, core, common, intoPipes) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var FlexiblePreviewBoxComponent = /** @class */ (function () {
        function FlexiblePreviewBoxComponent() {
            this.aboveData = [];
            this.belowData = [];
            this.onselect = new core.EventEmitter();
            this.onaction = new core.EventEmitter();
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
        __decorate([
            core.ViewChild("largeImage", { static: false })
        ], FlexiblePreviewBoxComponent.prototype, "largeImage", void 0);
        __decorate([
            core.ViewChild("video", { static: false })
        ], FlexiblePreviewBoxComponent.prototype, "video", void 0);
        __decorate([
            core.Output()
        ], FlexiblePreviewBoxComponent.prototype, "onselect", void 0);
        __decorate([
            core.Output()
        ], FlexiblePreviewBoxComponent.prototype, "onaction", void 0);
        __decorate([
            core.Input()
        ], FlexiblePreviewBoxComponent.prototype, "item", void 0);
        __decorate([
            core.Input()
        ], FlexiblePreviewBoxComponent.prototype, "viewport", void 0);
        __decorate([
            core.Input()
        ], FlexiblePreviewBoxComponent.prototype, "metadata", void 0);
        __decorate([
            core.Input()
        ], FlexiblePreviewBoxComponent.prototype, "effects", void 0);
        __decorate([
            core.Input()
        ], FlexiblePreviewBoxComponent.prototype, "enableMobileMagnification", void 0);
        __decorate([
            core.Input()
        ], FlexiblePreviewBoxComponent.prototype, "magnificationFactor", void 0);
        FlexiblePreviewBoxComponent = __decorate([
            core.Component({
                selector: 'flexible-preview-box',
                template: "<div class=\"above-viewport\" \r\n    [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of aboveData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.link]=\"row.rawContent !== undefined\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\"\r\n        [attr.role]=\"row.rawContent ? 'link' : ''\"\r\n        [tabIndex]=\"row.rawContent ? 0 : -1\"\r\n        (click)=\"row.rawContent ? row.rawContent(row) : defaultAction()\">\r\n        <span class=\"label\" \r\n            [class.off-screen]=\"row.hidelabel\" \r\n            [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" \r\n            [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [tabIndex]=\"row.rawContent ? 0 : -1\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>\r\n<div \r\n    class=\"viewport\" \r\n    tabindex=\"0\"\r\n    [title]=\"item.name\"\r\n    [style.width]=\"effects.width ? (effects.width + 'px') : null\" \r\n    [style.height]=\"effects.height ? (effects.height + 'px') : null\" \r\n    (focus)=\"updateControls($event)\"\r\n    (blur)=\"resetControls($event)\"\r\n    (keyup)=\"keyup($event)\"\r\n    (click)=\"selectItem($event)\"\r\n    (touchstart)=\"touchstart($event)\"\r\n    (touchmove)=\"touchmove($event)\"\r\n    (touchend)=\"touchend($event)\"\r\n    (mouseout)=\"hoverOut($event)\"\r\n    (mouseover)=\"hoverOver($event)\"\r\n    (mousemove)=\"hoverViewPort($event)\">\r\n    <img  class=\"content\" \r\n            [src]=\"viewport.src.small\" \r\n            *ngIf=\"viewport.type === 'image'\" />\r\n    <img  class=\"hover\" #largeImage aria-hidden=\"true\"\r\n            [src]=\"viewport.src.large\" \r\n            *ngIf=\"effects.zoomOnHover\" />\r\n    <video  \r\n        class=\"content\" #video\r\n        [style.width]=\"effects.width ? (effects.width + 'px') : null\" \r\n        [style.height]=\"effects.height ? (effects.height + 'px') : null\" \r\n        [attr.poster]=\"viewport.poster ? viewport.poster : null\"\r\n        (mouseenter)=\"updateControls($event)\"\r\n        (mouseleave)=\"resetControls($event)\"\r\n        (play)=\"videoEvent($event)\"\r\n        (pause)=\"videoEvent($event)\"\r\n        (ended)=\"videoEvent($event)\"\r\n        (seeked)=\"videoEvent($event)\"\r\n        (error)=\"videoEvent($event)\"\r\n        (fullscreenchange)=\"videoEvent($event)\"\r\n        *ngIf=\"viewport.type === 'video'\">\r\n        <source [src]=\"viewport.src.mp4\" type=\"video/mp4\">\r\n        <source [src]=\"viewport.src.webm\" type=\"video/webm\">\r\n        <source [src]=\"viewport.src.egg\" type=\"video/ogg\">\r\n    </video>\r\n</div>\r\n<div class=\"below-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of belowData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.link]=\"row.rawContent !== undefined\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\"\r\n        [attr.role]=\"row.rawContent ? 'link' : ''\"\r\n        [tabIndex]=\"row.rawContent ? 0 : -1\"\r\n        (click)=\"row.rawContent ? row.rawContent(row) : defaultAction()\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" \r\n            [intoName]=\"row.value\"\r\n            [class.full-width]=\"row.hidelabel\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>",
                styles: [":host{background-color:#fff;border:1px solid #ced4da;box-sizing:border-box;display:table;min-height:50px;padding:0;border-radius:5px;margin:5px}:host:focus{border-color:#0ba}:host:hover{border-color:purple;box-shadow:1px 1px 11px purple}:host ::ng-deep .rating{color:red}:host ::ng-deep share-component .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .box-row .label{float:left;font-weight:700;margin-right:5px}:host .box-row .value{float:left}:host .box-row .value.full-width{display:block;width:100%}:host .box-row.link{cursor:pointer}:host .box-row.left{text-align:left}:host .box-row.right .label{font-weight:700;flex:1;text-align:right}:host .box-row.center{width:inherit;display:table;margin:auto}:host .box-row.emphasize{font-weight:700;font-size:1.8rem}:host .box-row.side-by-side{max-width:250px;display:table;float:right;margin:0 5px}:host .above-viewport{padding:5px;box-sizing:border-box}:host .viewport{border-color:purple;box-sizing:border-box;border-top:1px solid #bcd;border-bottom:1px solid #bcd;min-height:100px;overflow:hidden;position:relative;margin:0 auto;box-sizing:border-box;cursor:pointer}:host .viewport img.content{margin:auto;display:table;pointer-events:none}:host .viewport video.content{margin:auto;display:table}:host .viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}:host .viewport:hover{border-color:purple}:host .below-viewport{padding:5px;box-sizing:border-box}@media screen and (max-width:600px){:host{width:100%}:host .above-viewport,:host .below-viewport,:host .viewport{width:100%!important;max-width:100%!important}}.clearblock{clear:both;display:block;width:100%;height:0;padding:0;margin:0}"]
            })
        ], FlexiblePreviewBoxComponent);
        return FlexiblePreviewBoxComponent;
    }());

    var FlexiblePreviewBoxModule = /** @class */ (function () {
        function FlexiblePreviewBoxModule() {
        }
        FlexiblePreviewBoxModule = __decorate([
            core.NgModule({
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
            })
        ], FlexiblePreviewBoxModule);
        return FlexiblePreviewBoxModule;
    }());

    exports.FlexiblePreviewBoxComponent = FlexiblePreviewBoxComponent;
    exports.FlexiblePreviewBoxModule = FlexiblePreviewBoxModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-flexible-preview-box.umd.js.map
