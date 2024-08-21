import { Component, Prop, Host, Element, h } from '@stencil/core';

@Component({
  tag: 'aqua-button',
  styleUrl: 'aqua-button.scss',
  shadow: true
})
export class AquaButton {
  @Prop() text: string;
  @Prop() icon: string;
  @Prop() iconSize = 16;
  @Prop() iconPosition: 'left' | 'right' = 'left';
  @Prop() iconOnly = false;
  @Prop() outlined = false;
  @Prop() justified = false;
  @Prop() fullWidth = false;
  @Prop() type: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger' = 'default';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() disabled = false;
  @Prop() loading = false;

  @Element() el: HTMLElement;

  getButtonClass() {
    return {
      'aqua-button': true,
      'is-small': this.size === 'small',
      'is-medium': this.size === 'medium',
      'is-large': this.size === 'large',
      'is-default': this.type === 'default',
      'is-primary': this.type === 'primary',
      'is-info': this.type === 'info',
      'is-success': this.type === 'success',
      'is-warning': this.type === 'warning',
      'is-danger': this.type === 'danger',
      'is-outlined': this.outlined,
      'is-justified': this.justified,
      'is-fullwidth': this.fullWidth,
      'is-loading': this.loading,
      'is-icon-only': this.iconOnly,
      'has-icon-left': this.icon && this.iconPosition === 'left',
      'has-icon-right': this.icon && this.iconPosition === 'right',
    };
  }

  render() {

    return (
      <Host style={{width: this.fullWidth ? '100%' : 'auto'}}>
        <button class={this.getButtonClass()} disabled={this.disabled}>
          { this.icon && (<aqua-icon icon={this.icon} width={this.iconSize} height={this.iconSize}></aqua-icon>) }
          { this.text && <span>{this.text}</span> }
        </button>
      </Host>
    );
  }
}
