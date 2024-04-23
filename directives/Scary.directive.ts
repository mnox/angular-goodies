import {
    Directive,
    ElementRef,
    HostListener,
    Renderer2
} from '@angular/core';

interface NewStyle {
    alias: string;
    value: string | number;
}

/**
 * Makes an element run away from the mouse cursor,
 * resets/reverts after a timeout (default 3 seconds)
 * EX: <div scary></div>
 */
@Directive({
    selector: '[scary]',
    standalone: true,
})
export class ScaryDirective {

    static timeoutDuration = 3000;
    timeout: any;

    constructor(
        private _el: ElementRef,
        private renderer: Renderer2,
    ) {}

    @HostListener('mouseenter', ['$event'])
    private onMouseEnter(): void {
        const newX = Math.round(Math.random() * window.innerWidth),
            newY = Math.round(Math.random() * window.innerHeight);

        const newStyles: NewStyle[] = this.getNewStyles('fixed', 9999, newX, newY);

        this.setNewStyles(newStyles);

        this.updateTimeout();
    }

    /**
     * Gets an array of NewStyle objects to be mapped over,
     * defaults to revert values to be used for the reset logic
     * @param position String
     * @param zIndex Number
     * @param left Number
     * @param top Number
     * @private
     */
    private getNewStyles(
        position: string = 'unset',
        zIndex: number = 1,
        left: number = 0,
        top: number = 0,
    ): NewStyle[] {
        return [
            {
                alias: 'position',
                value: position,
            },
            {
                alias: 'z-index',
                value: zIndex,
            },
            {
                alias: 'left',
                value: `${left}px`,
            },
            {
                alias: 'top',
                value: `${top}px`,
            }
        ];
    }

    /**
     * Resets any overridden styles
     * @private
     */
    private reset(): void {
        const newStyles = this.getNewStyles();
        this.setNewStyles(newStyles);
    }

    /**
     * Maps over NewStyle objects to set each property on the nativeElement of our _el
     * @param newStyles
     * @private
     */
    private setNewStyles(newStyles: NewStyle[]): void {
        newStyles.map( ( { alias, value }) => {
            this.renderer.setStyle(this._el.nativeElement, alias, value);
        });
    }

    /**
     * Tracks a timeout that is used to revert our style changes after
     * a set time.
     * @private
     */
    private updateTimeout(): void {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.reset();
        }, ScaryDirective.timeoutDuration);
    }
}
