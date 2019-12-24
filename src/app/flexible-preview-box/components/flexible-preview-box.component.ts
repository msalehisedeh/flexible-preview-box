
import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter
} from '@angular/core';

export interface ViewPort {
  type: string,
  poster?: string,
  src: {
	small?: string,
	large?: string,
    egg?: string,
    mp4?: string,
    webm?: string
  }
}

@Component({
  selector: 'flexible-preview-box',
  templateUrl: './flexible-preview-box.component.html',
  styleUrls: ['./flexible-preview-box.component.scss'],
})
export class FlexiblePreviewBoxComponent implements OnInit {
  
  aboveData = [];
  belowData = [];
  
  @ViewChild("largeImage", {static: false})
	private largeImage: ElementRef;

  @ViewChild("video", {static: false})
	private video: ElementRef;

  @Output() onselect= new EventEmitter()
  @Output() onaction= new EventEmitter()

  @Input() item: any;
  @Input() viewport: ViewPort;
  @Input() metadata: any[];
  @Input() effects: any;
  @Input() enableMobileMagnification = true;
  @Input() magnificationFactor = 2;

  ngOnInit() {
    if (this.metadata) {
      this.metadata.map ( (data) => {
        if (data.position === 'above') {
          this.aboveData.push(data);
        }else if (data.position === 'below') {
          this.belowData.push(data);
        }
      })
    }
    if (this.magnificationFactor < 2)  {
      this.magnificationFactor = 2;
    }
  }

  private itemValue(item: any, hpath: any[]) {
		let subitem = item;
		hpath.map( (subkey) => {
			if (subitem) {
				subitem = subitem[subkey];
			}
		})
		return subitem === undefined || subitem === null || subitem === "null" ? "" : String(subitem);
	}

  rowContent(row: any) {
    if (row.rawContent) {
      return row.rawContent(this.item);
    }
    let content = this.itemValue(this.item, row.key.split("."));
    return (content !== undefined && content != null) ? content : '';
  }

  touchstart(event: any) {
		if (this.enableMobileMagnification && this.largeImage && this.effects.zoomOnHover) {
      const img = event.target.children[0];
      if (img) {
        const rect = img.getBoundingClientRect();
        this.largeImage.nativeElement.style.width = (this.magnificationFactor * rect.width) + 'px';
        this.largeImage.nativeElement.style.height = (this.magnificationFactor * rect.height) + 'px';
        img.style.visibility = 'hidden';
      }
      this.onaction.emit({action: 'viewport', type: event.type, item: this.item});
    }
  }
  touchmove(event: any) {
		if (this.enableMobileMagnification && this.largeImage && this.effects.zoomOnHover) {
      event.preventDefault();
      event.stopPropagation();
      const img = event.target.children[0];
      const viewR = img.parentNode.getBoundingClientRect();
      const rect = img.getBoundingClientRect();
      const width =  event.touches[0].clientX - viewR.x;
      const height =  event.touches[0].clientY - viewR.y;
      const dx = (this.effects.width - rect.width)*(this.magnificationFactor/2);
      const dy = (this.effects.height - rect.height)*(this.magnificationFactor/2);
      const y = height * (this.magnificationFactor - 1);
      const x = width * (this.magnificationFactor - 1);
			this.largeImage.nativeElement.style.top = (-y + dy) + "px";
			this.largeImage.nativeElement.style.left = (-x + dx) + "px";
			this.largeImage.nativeElement.style.opacity = 1;
      this.onaction.emit({
        action: 'viewport',
        type: event.type,
        position: {Y: x, X: y},
        item: this.item
      });
		}
  }
  touchend(event: any) {
		if (this.enableMobileMagnification && this.largeImage) {
      const img = event.target.children[0];
      img.style.visibility = 'visible';
			this.largeImage.nativeElement.style.opacity = 0;
			this.largeImage.nativeElement.style.top = "-10000px";
      this.largeImage.nativeElement.style.left = "-10000px";
      this.onaction.emit({action: 'viewport',type: event.type, item: this.item});
		}
  }

  hoverOver(event: any) {
		if (this.largeImage && this.effects.zoomOnHover) {
      const img = event.target.children[0];
      if (img) {
        const rect = img.getBoundingClientRect();
        this.largeImage.nativeElement.style.width = (this.magnificationFactor * rect.width) + 'px';
        this.largeImage.nativeElement.style.height = (this.magnificationFactor * rect.height) + 'px';
        img.style.visibility = 'hidden';
      }
      this.onaction.emit({action: 'viewport', type: event.type, item: this.item});
    }
	}
	hoverOut(event: any) {
		if (this.largeImage) {
      const img = event.target.children[0];
      img.style.visibility = 'visible';
			this.largeImage.nativeElement.style.opacity = 0;
			this.largeImage.nativeElement.style.top = "-10000px";
      this.largeImage.nativeElement.style.left = "-10000px";
      this.onaction.emit({action: 'viewport',type: event.type, item: this.item});
		}
	}
	hoverViewPort(event: any) {
		if (this.largeImage && this.effects.zoomOnHover) {
      const img = event.target.children[0];
      const rect = img.getBoundingClientRect();
      const dx = (this.effects.width - rect.width)*(this.magnificationFactor/2);
      const dy = (this.effects.height - rect.height)*(this.magnificationFactor/2);
      const y = event.layerY * (this.magnificationFactor - 1);
      const x = event.layerX * (this.magnificationFactor - 1);
			this.largeImage.nativeElement.style.top = (-y + dy) + "px";
			this.largeImage.nativeElement.style.left = (-x + dx) + "px";
			this.largeImage.nativeElement.style.opacity = 1;
      this.onaction.emit({
        action: 'viewport',
        type: event.type,
        position: {Y: x, X: y},
        item: this.item
      });
		}
	}
  updateControls(event: any) {
    if (this.video) {
      this.video.nativeElement.play();
    }
  }
  resetControls(event: any) {
      if (this.video && this.isPlaying(this.video.nativeElement)) {
        this.video.nativeElement.pause();
      }
  }
  private isPlaying(video: any) {
      return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
  }
  keyup(event: any) {
    const code = event.which;
    if (code === 13) {
      event.target.click();
    }
  }
  selectItem(event: any) {
    this.onselect.emit({
      action: "redirect",
      type: 'select',
      item: this.item
    });
  }
  videoEvent(event: any) {
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
    } else {
      this.onaction.emit({action: event.name, type: event.item, item: this.item});
    }
  }
}
