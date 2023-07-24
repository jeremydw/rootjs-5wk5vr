import { customElement, property, query, state } from 'lit/decorators.js';
import { html, LitElement, unsafeCSS } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import styles from './gws-tooltip.scss?inline';
import '../gws-popover/gws-popover';
import { Popover } from '../gws-popover/gws-popover';

/**
 * An element that attaches a target to a popover and triggers the popover's open state.
 */
@customElement('gws-tooltip')
export class Tooltip extends LitElement {
  static styles = unsafeCSS(styles);

  /** Distance the popover is positioned from the trigger element. */
  @property({ type: Number })
  offset?: number;

  @query('.trigger')
  triggerElement: HTMLDivElement;

  private popoverElement: Popover;

  /** Sets the popover element to the first slotted popover. */
  private handlePopoverSlotChange(e: Event) {
    this.popoverElement = (
      e.target as HTMLSlotElement
    )?.assignedElements()?.[0] as Popover;
    this.popoverElement?.attachTrigger(this.triggerElement);
  }

  private renderInfoIcon() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="none"
        role="presentation"
      >
        <path
          fill="#1967D2"
          d="M5.5 8.5h1v-3h-1v3ZM6 1C3.24 1 1 3.24 1 6s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm0 9c-2.205 0-4-1.795-4-4s1.795-4 4-4 4 1.795 4 4-1.795 4-4 4Zm-.5-5.5h1v-1h-1v1Z"
        />
        <path fill="#1967D2" d="M5.5 3.5h1v1h-1v-1Zm0 2h1v3h-1v-3Z" />
        <path
          fill="#1967D2"
          d="M6 1C3.24 1 1 3.24 1 6s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm0 9c-2.205 0-4-1.795-4-4s1.795-4 4-4 4 1.795 4 4-1.795 4-4 4Z"
        />
      </svg>
    `;
  }

  override render() {
    return html`
      <aside class=${classMap({
        container: true,
      })}>
        <button
          class="trigger"
          @click=${() => this.popoverElement?.toggle()}
          @mouseenter=${() => this.popoverElement?.show()}
          @mouseleave=${(e: MouseEvent) => this.popoverElement?.requestHide(e)}
        >
          <slot></slot>
          <span class="info-icon">${this.renderInfoIcon()}</span>
        </button>
      </aside>
      <slot name="popover" class="popover"
      style=${styleMap({
        '--gws-popover-offset-y': `${this.offset ?? 5}px`,
      })}
        @slotchange=${this.handlePopoverSlotChange}></slot>
    `;
  }
}

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'gws-tooltip': preact.JSX.HTMLAttributes;
    }
  }
}
