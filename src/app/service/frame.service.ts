import {EventEmitter, Injectable, Output, Renderer2} from '@angular/core';
import {BrowserService} from './browser.service';
import {isNullOrUndefined} from "util";

@Injectable()
export class FrameService {
    @Output() showLoader = new EventEmitter<boolean>();
    parentFrame: Window = <any>window.parent;
    renderer: Renderer2;
    subscribers: Function[] = [];
    overlayElement: HTMLElement;
    _overlay: boolean;
    isHostedWithinIFrame = false;

    constructor(private browser: BrowserService) {
        console.log(browser.which);
        /*if (!this.parentFrame) {*/
        if(!this.parentFrame) {
            this.parentFrame = <any>window;
        }
        if (this.isInsidePortal()) {
            this.getElementFromParent('div#bd.clearfix').setAttribute('style', 'background:#ffffff;');
            const overlay = this.parentFrame.document.createElement('div');
            overlay.setAttribute('id', 'overlay');
            // overlay.addEventListener("click",()=>{
            //   this.events.publish("overlay:clicked");
            // })
            const iframe: any = this.parentFrame.document.getElementById('iframe');
            // iframe.contentWindow.onbeforeunload = function () {
            //   // storage.clear('mfa');
            // };
            this.parentFrame.document.querySelector('body').appendChild(overlay);

            const loadingModal = this.parentFrame.document.createElement('div');
            loadingModal.classList.add('loadingModal');

            const spinnerWrapper = this.parentFrame.document.createElement('div');
            spinnerWrapper.classList.add('spinner-wrapper');

            const preloader = this.parentFrame.document.createElement('img');
            preloader.src = window.location.href.split('?')[0] + 'assets/images/preloader.png';
            preloader.classList.add('spinner--preloader');
            spinnerWrapper.appendChild(preloader);
            const spinnerText = this.parentFrame.document.createElement('p');
            spinnerText.textContent = 'Please wait while we are loading your information.';
            spinnerText.classList.add('spinner--text');
            spinnerWrapper.appendChild(spinnerText);

            loadingModal.appendChild(spinnerWrapper);
            this.parentFrame.document.querySelector('body').appendChild(loadingModal);


            const style = this.parentFrame.document.createElement('style');
            const text = this.parentFrame.document.createTextNode(`
                #iframe {
                  z-index: 30 !important;
                  position: relative;
                }
                #overlay {
                    background: rgba(0,0,0,0.6);
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    z-index: 99;
                    display: none;
                  }
                .loadingModal {
                    z-index: 1050;
                    background-color: rgba(255, 255, 255, 0.8);
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    overflow: hidden;
                    outline: none;
                    text-align: center;
                    display: none;
                }
                  .spinner-wrapper {
                    position: absolute;
                    top: 50vh;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    -webkit-transform: translate(-50%, -50%);
                    -moz-transform: translate(-50%, -50%);
                    -ms-transform: translate(-50%, -50%);
                  }
                  .spinner--preloader {
                    margin: 0px auto 20px;
                    -webkit-animation: spin 1.5s linear infinite;
                    -moz-animation: spin 1.5s linear infinite;
                    animation: spin 1.5s linear infinite;
                  }            
                  .spinner--text {
                    font-size: 14px;
                    color: #646464;
                  }
                  @-moz-keyframes spin {
                    100% {
                      -moz-transform: rotate(360deg);
                    }
                  }
                  @-webkit-keyframes spin {
                    100% {
                      -webkit-transform: rotate(360deg);
                    }
                  }
                  @keyframes spin {
                    100% {
                      -webkit-transform: rotate(360deg);
                      transform: rotate(360deg);
                    }
                  }`
            );
            style.appendChild(text);
            this.parentFrame.document.querySelector('head').appendChild(style);
        }
    }

    public listenToResizeEvents(callback) {
        this.subscribers.push(callback);
    }

    public scrollRelativeToParentFrame(y, duration, done) {
        const y0 = this.cumulativeOffset(this.parentFrame.document.getElementById('iframe')).top;
        this.scrollTo(y0 + y, duration, done);
    }

    private cumulativeOffset(element: any) {
        let top = 0, left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);

        return {
            top: top,
            left: left
        };
    }

    private overlay(val: boolean) {
        this._overlay = val;
        if (isNullOrUndefined(this.getElementFromParent('.loadingModal'))) {
            return;
        }
        if (val) {
            this.getElementFromParent('.loadingModal').setAttribute('style', 'display:block;');
        } else {
            this.getElementFromParent('.loadingModal').setAttribute('style', 'display:none');
        }
    }

    set loader(val: boolean) {
        this.overlay(val);
        this.showLoader.emit(val);
    }

    // get overlay() {
    //   return this._overlay;
    // }


    public getWindowDimensions() {
        return {
            height: this.parentFrame.innerHeight,
            width: this.parentFrame.innerWidth
        };
    }

    public getScreenCenter() {
        const frameStart = this.cumulativeOffset(this.parentFrame.document.getElementById('iframe')).top;
        const center = (this.browser.msie ? this.parentFrame.pageYOffset :
            this.parentFrame.scrollY) + (this.parentFrame.innerHeight / 2.0) - (frameStart - 8);
        const minimum = (this.parentFrame.innerHeight / 2.0);
        if (center > minimum) {
            return center;
        } else {
            return minimum;
        }
    }

    public getHorizontalCenter() {
        const frameStart = this.parentFrame.document.getElementById('iframe').offsetLeft;
        return this.parentFrame.scrollX + (this.parentFrame.innerWidth / 2.0) + frameStart;
    }

    private getElementFromParent(selector: string) {
      console.log('Selectoer => ' +selector);
        return this.parentFrame.document.querySelector(selector);
    }

    scrollTo(Y, duration, done) {
        const startingY = this.parentFrame.pageYOffset;
        const diff = Y - startingY;
        let start;
        const that = this;
        // Bootstrap our animation - it will get called right before next frame shall be rendered.
        this.parentFrame.requestAnimationFrame(function step(timestamp) {
            if (!start) {
                start = timestamp;
            }
            // Elapsed miliseconds since start of scrolling.
            const time = timestamp - start;
            // Get percent of completion in range [0, 1].
            const percent = Math.min(time / duration, 1);

            that.parentFrame.scrollTo(0, startingY + diff * percent);

            // Proceed with animation as long as we wanted it to.
            if (time < duration) {
                that.parentFrame.requestAnimationFrame(step);
            } else {
                done();
            }
        });
    }

    isInsidePortal() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

}
