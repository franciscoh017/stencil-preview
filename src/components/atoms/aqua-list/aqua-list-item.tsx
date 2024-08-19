import { h, Component, Prop, Host, Event } from '@stencil/core';

@Component({
  tag: 'aqua-list-item',
  styleUrl: 'aqua-list-item.scss',
  shadow: true
})
export class AquaList {
  @Prop() value: any;
  @Prop() selected: boolean;

  @Event() onItemSelected: any


  get classes() {
    return {
      'selected': this.selected
    }
  }

  handleClick = () => {
    this.onItemSelected.emit(this.value);
  }

  render() {
    return (
      <Host>
        <li class={this.classes} onClick={this.handleClick}>
          <slot name="start"></slot>
          <slot name="content"></slot>
          <slot name="end"></slot>
        </li>
      </Host>
    );
  }
}