import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import type { Size, Variant } from "@gozion-ui/core";

@Component({ selector:"ui-button", standalone:true, template:"<button class=\"ui-component ui-focusable ui-button\" [attr.data-variant]=\"variant\" [attr.data-size]=\"size\" [disabled]=\"disabled\" [attr.type]=\"type\"><ng-content /></button>", encapsulation:ViewEncapsulation.None, changeDetection:ChangeDetectionStrategy.OnPush })
export class ButtonComponent { @Input() variant: Variant = "default"; @Input() size: Size = "md"; @Input() disabled = false; @Input() type = "button"; }

@Component({ selector:"ui-card", standalone:true, template:"<section class=\"ui-component ui-card\" [attr.data-variant]=\"variant\" [attr.data-disabled]=\"disabled || null\" [attr.aria-disabled]=\"disabled || null\" [attr.inert]=\"disabled ? '' : null\"><header class=\"ui-card-header\"><div class=\"ui-card-title\"><ng-content select=\"[card-title]\" /></div><ng-content select=\"[card-actions]\" /></header><ng-content /></section>", encapsulation:ViewEncapsulation.None, changeDetection:ChangeDetectionStrategy.OnPush })
export class CardComponent { @Input() variant: Variant = "default"; @Input() disabled = false; }

@Component({ selector:"ui-card-menu", standalone:true, template:"<div class=\"ui-card-menu\"><button type=\"button\" class=\"ui-component ui-focusable ui-button ui-icon-button\" [attr.aria-label]=\"label\" [attr.aria-expanded]=\"open\" aria-haspopup=\"menu\" (click)=\"open = !open\">•••</button><div class=\"ui-card-menu-content\" role=\"menu\" [hidden]=\"!open\" (click)=\"open = false\"><ng-content /></div></div>", encapsulation:ViewEncapsulation.None, changeDetection:ChangeDetectionStrategy.OnPush })
export class CardMenuComponent { @Input() label = "Card actions"; open = false; }

@Component({ selector:"ui-table", standalone:true, template:"<div class=\"ui-table-scroll\"><table class=\"ui-table\"><ng-content /></table></div>", encapsulation:ViewEncapsulation.None, changeDetection:ChangeDetectionStrategy.OnPush })
export class TableComponent {}

@Component({ selector:"ui-kbd", standalone:true, template:"<kbd class=\"ui-kbd\"><ng-content /></kbd>", encapsulation:ViewEncapsulation.None, changeDetection:ChangeDetectionStrategy.OnPush })
export class KbdComponent {}

@Component({ selector:"ui-alert", standalone:true, template:"<section role=\"status\" class=\"ui-component ui-alert\" [attr.data-variant]=\"variant\"><ng-content /></section>", encapsulation:ViewEncapsulation.None, changeDetection:ChangeDetectionStrategy.OnPush })
export class AlertComponent { @Input() variant: Variant = "default"; }

@Component({ selector:"ui-stack", standalone:true, template:"<div class=\"ui-component ui-stack\" [style.gap]=\"gap\"><ng-content /></div>", encapsulation:ViewEncapsulation.None, changeDetection:ChangeDetectionStrategy.OnPush })
export class StackComponent { @Input() gap = "var(--ui-space-3)"; }

@Component({ selector:"ui-hoverable", standalone:true, template:"<div class=\"ui-component ui-hoverable\"><ng-content /></div>", encapsulation:ViewEncapsulation.None, changeDetection:ChangeDetectionStrategy.OnPush })
export class HoverableComponent { @HostBinding("style.--ui-hover-scale") @Input() scale = 1; @HostBinding("style.--ui-hover-x") @Input() translateX = "0"; @HostBinding("style.--ui-hover-y") @Input() translateY = "0"; @HostBinding("style.--ui-hover-rotate") @Input() rotate = "0"; @HostBinding("style.--ui-hover-duration") @Input() duration = "var(--ui-transition-duration)"; }
