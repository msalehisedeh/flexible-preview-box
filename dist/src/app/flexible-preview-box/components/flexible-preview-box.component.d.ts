import { OnInit, EventEmitter } from '@angular/core';
export interface ViewPort {
    type: string;
    poster?: string;
    src: {
        small?: string;
        large?: string;
        egg?: string;
        mp4?: string;
        webm?: string;
    };
}
export declare class FlexiblePreviewBoxComponent implements OnInit {
    aboveData: any[];
    belowData: any[];
    private largeImage;
    private video;
    onselect: EventEmitter<any>;
    onaction: EventEmitter<any>;
    item: any;
    viewport: ViewPort;
    metadata: any[];
    effects: any;
    enableMobileMagnification: boolean;
    magnificationFactor: number;
    ngOnInit(): void;
    private itemValue;
    rowContent(row: any): any;
    touchstart(event: any): void;
    touchmove(event: any): void;
    touchend(event: any): void;
    hoverOver(event: any): void;
    hoverOut(event: any): void;
    hoverViewPort(event: any): void;
    updateControls(event: any): void;
    resetControls(event: any): void;
    private isPlaying;
    keyup(event: any): void;
    selectItem(event: any): void;
    videoEvent(event: any): void;
    onComponentChange(event: any): void;
    defaultAction(): void;
}
