import { Directive, Input, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

/**
 * (Requires minimum Angular Version: 15 due to standalone: true)
 * A wrapper for MatTooltip / [matTooltip]
 * Will only display provided tooltips if static attribute DevTooltipDirective.enabled
 * is set to true.
 * EX: <div [devTooltip]="Contextual ID: 1234">/div>
 * In my implementation, (using NGXS) I have a subscriber in app.component.ts
 * @Select( MyState.userHasRole('developer') ) isDeveloper$: Observable<boolean>;
 * constructor(...) {
 *   this.isDeveloper$.pipe(
 *       takeUntilDestroyed(),
 *     ).subscribe( isDeveloper => {
 *       DevTooltipDirective.enabled = isDeveloper;
 *     });
 * }
 */
@Directive({
    selector: '[devTooltip]',
    standalone: true,
})
export class DevTooltipDirective extends MatTooltip implements OnInit {
    static enabled: boolean = false;
    @Input('devTooltip') tooltipText: string;

    ngOnInit(): void {
        this.message = this.tooltipText;
        this.disabled = !DevTooltipDirective.enabled;
    }
}
