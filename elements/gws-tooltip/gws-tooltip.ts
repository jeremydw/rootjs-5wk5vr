import { customElement, property, state } from 'lit/decorators.js';
import { html, LitElement, unsafeCSS } from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import styles from './gws-tooltip.scss?inline';

type Variant = 'premium';

@customElement('gws-tooltip')
export class Tooltip extends LitElement {
  static styles = unsafeCSS(styles);

  @property()
  variant?: Variant;

  @property({type: Boolean, attribute: 'always-above'})
  alwaysAbove: boolean;

  @state()
  tooltipBelow: boolean;

  constructor() {
    super();
    this.alwaysAbove = false;
    this.tooltipBelow = true;
  }

  private renderInfoIcon() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="none"
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

  // Need to ensure the tooltips do not flow outside of the viewport.
  private calculateTooltipPosition(): void {
    if (this.alwaysAbove) {
      this.tooltipBelow = false;
      return;
    }

    this.tooltipBelow = true;
    window.requestAnimationFrame(() => {
      const tooltip = this.renderRoot.querySelector('.tooltip') as HTMLElement;
      const {height: tooltipHeight, y: tooltipY} =
        tooltip.getBoundingClientRect();
      const hasEnoughRoomBelow = tooltipY + tooltipHeight < window.innerHeight;
      this.tooltipBelow = hasEnoughRoomBelow;
    });
  }

  render() {
    const classes = {
      premium: this.variant === 'premium',
      'tooltip-below': this.tooltipBelow,
    };
    return html`
      <aside class="container ${classMap(classes)}">
        <div class="hover-area">
          <div
            class="content"
            tabindex="0"
            @mouseenter=${this.calculateTooltipPosition}
          >
            <slot name="content"></slot>
          </div>
          <div class="tooltip">
            <slot name="tooltip"></slot>
          </div>
          <span class="info-icon"> ${this.renderInfoIcon()} </span>
        </div>
      </aside>
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
