import { customElement, property, query, state } from 'lit/decorators.js';
import { html, LitElement, unsafeCSS } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import styles from './gws-popover.scss?inline';

@customElement('gws-popover')
export class Popover extends LitElement {
  static styles = unsafeCSS(styles);

  /** Whether the popover is open. */
  @property()
  open = false;

  triggerElement?: HTMLElement;

  private originalParentElement?: HTMLElement;

  relocateToBody() {
    this.originalParentElement = this.parentElement;
    document.body.appendChild(this);
  }

  relocateToOrigin() {
    this.originalParentElement.appendChild(this);
  }

  attributeChangedCallback(name: string, _old: string, value: string): void {
    super.attributeChangedCallback(name, _old, value);
    // NOTE: This may not be neede
    if (name === 'open') {
      const isOpen = value;
      isOpen ? this.relocateToBody() : this.relocateToOrigin();
    }
  }

  async show() {
    this.open = true;
  }

  async requestHide(e: MouseEvent) {
    const shouldHide = ![this.triggerElement, this].includes(
      e.relatedTarget as HTMLElement
    );
    if (shouldHide) {
      return await this.hide();
    }
  }

  async hide() {
    this.open = false;
  }

  async toggle() {
    this.open ? this.hide() : this.show();
  }

  attachTrigger(element: HTMLElement) {
    this.triggerElement = element;
  }

  render() {
    return html`<div
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
