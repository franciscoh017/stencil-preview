import { Component, Prop, Host, Element, Event, h } from '@stencil/core';

@Component({
  tag: 'aqua-button',
  styleUrl: 'aqua-button.scss',
  shadow: true
})
export class AquaButton {
  @Prop() icon: string;
  @Prop() iconSize = { width: 16, height: 16 };
  @Prop() type = 'default';
  @Prop() size: 'icon' | 'small' | 'medium' | 'large' = 'medium';
  @Prop() disabled = false;
  @Prop() outlined = false;

  @Element() el: HTMLElement;

  @Event() click: any;

  getButtonClass() {
    return `aqua-button aqua-button--${this.type} ${this.size} ${this.outlined ? 'outlined' : ''}`;
  }

  handleClick = () => {
    this.click.emit();
  }

  render() {
    const hasChildren = this.el.children.length > 0;

    return (
      <Host>
        <button class={this.getButtonClass()} disabled={this.disabled} onClick={this.handleClick}>
          { this.icon && (<aqua-icon icon={this.icon} width={this.iconSize.width} height={this.iconSize.height}></aqua-icon>) }
          { hasChildren && (<span><slot></slot></span>) }
        </button>
      </Host>
    );
  }
}
