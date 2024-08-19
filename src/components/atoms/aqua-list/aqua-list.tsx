import { h, Component, Host } from '@stencil/core';

@Component({
  tag: 'aqua-list',
  styleUrl: 'aqua-list.scss',
  shadow: true
})
export class AquaList {

  render() {
    return (
      <Host>
        <ul>
          <slot></slot>
        </ul>
      </Host>
    );
  }
}