import { Component, Prop, Host, Element, Event, h } from '@stencil/core';

@Component({
  tag: 'aqua-input',
  styleUrl: 'aqua-input.scss',
  shadow: true
})
export class AquaInput {
  @Prop() label: string;
  @Prop() value: string;
  @Prop() placeholder: string;
  @Prop() type: 'text' | 'number' = 'text';
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() iconLeft: string;
  @Prop() iconRight: string;
  @Prop() expanded = false;

  @Element() el: HTMLElement;

  @Event() onInput: any;

  handleChange = (e) => {
    this.onInput.emit(e.target.value);
  }

  hasIconLeft() {
    return this.iconLeft !== undefined;
  }

  hasIconRight() {
    return this.iconRight !== undefined;
  }

  get classes() {
    return {
      'aqua-input': true,
      'expanded': this.expanded,
      'has-icon-left': this.hasIconLeft(),
      'has-icon-right': this.hasIconRight()
    };
  }

  render() {
    return (
      <Host>
        <div class={this.classes}>
          { this.label && (<label class="aqua-input__label">{this.label}</label>) }
          <div class="aqua-input__wrapper">
            { this.iconLeft && (<aqua-icon icon={this.iconLeft} width={16} height={16} class="aqua-input__icon aqua-input__icon--left"></aqua-icon>) }
            <input
              class="aqua-input__input"
              type={this.type}
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              required={this.required}
              onInput={this.handleChange}
            />
            { this.iconRight && (<aqua-icon icon={this.iconRight} width={16} height={16} class="aqua-input__icon aqua-input__icon--right"></aqua-icon>) }
          </div>
        </div>
      </Host>
    );
  }
}