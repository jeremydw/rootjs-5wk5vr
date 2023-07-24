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
    if (name === 'open') {
      const isOpen = value;
      isOpen ? this.relocateToBody() : this.relocateToOrigin();
    }
  }

  async show() {
    this.open = true;
  }

  async hide() {
    this.open = false;
  }

  render() {
    return html`<div class=${classMap({
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
