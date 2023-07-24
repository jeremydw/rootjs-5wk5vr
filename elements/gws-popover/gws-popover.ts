import { customElement, property, query, state } from 'lit/decorators.js';
import { html, LitElement, unsafeCSS } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './gws-popover.scss?inline';

/**
 * A simple element for showing content within a popover (like a tooltip or bubble).
 */
@customElement('gws-popover')
export class Popover extends LitElement {
  static styles = unsafeCSS(styles);

  /** Whether the popover is open. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** The accessibility label for the popover region. */
  @property()
  label?: string;

  /** The element that triggers the popover. */
  triggerElement?: HTMLElement;

  // TODO: Add ability to specify placement

  // NOTE: Looks like this isn't needed.
  // private originalParentElement?: HTMLElement;
  // relocateToBody() {
  //   this.originalParentElement = this.parentElement;
  //   document.body.appendChild(this);
  // }

  // relocateToOrigin() {
  //   this.originalParentElement.appendChild(this);
  // }

  attributeChangedCallback(name: string, _old: string, value: string): void {
    super.attributeChangedCallback(name, _old, value);
    if (name === 'open') {
      this.dispatchEvent(new CustomEvent('toggle'));
      // const isOpen = value;
      // isOpen ? this.relocateToBody() : this.relocateToOrigin();
    }
  }

  async show() {
    this.open = true;
  }

  /**
   * Tests whether the requesting mouse event is over the trigger or popover,
   * and hides only if not.
   */
  async requestHide(e: MouseEvent) {
    const shouldHide = ![this.triggerElement, this].includes(
      e.relatedTarget as HTMLElement
    );
    if (shouldHide) {
      return await this.hide();
    }
  }

  /** Hides the popover. */
  async hide() {
    this.open = false;
  }

  /** Toggles the popover's open state. */
  async toggle() {
    this.open ? this.hide() : this.show();
  }

  /** Attaches another element as the "trigger" for this popover. */
  attachTrigger(element: HTMLElement) {
    this.triggerElement = element;
  }

  render() {
    return html`<div
      role="region"
      aria-label=${ifDefined(this.label)}
      @mouseleave=${(e: MouseEvent) => this.requestHide(e)}
      class=${classMap({
        container: true,
        'container:open': this.open,
      })}><slot></slot>
    </div>`;
  }
}

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'gws-popover': preact.JSX.HTMLAttributes;
    }
  }
}
