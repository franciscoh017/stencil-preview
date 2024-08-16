import { Component,Prop, State, h } from '@stencil/core';
import { gauge_high, gauge_low } from '../icons/icons';

@Component({
  tag: 'rule-section',
  styleUrl: 'rule-section.scss',
  shadow: true
})
export class RuleSection {

  @Prop() heading: string = '';
  @Prop() icon: string = '';
  @State() icons = {
    gauge_high,
    gauge_low
  }

  render() {
    return (
      <div class="rule-section">
        <div class="section-title-row">
          <div class="section-title-icon">
            {this.icons[this.icon]}
          </div>
          <div class="section-title-text">
            <h2>{this.heading}</h2>
          </div>
        </div>
        <div class="section-content">
          <slot></slot>
        </div>
      </div>
    );
  }

}
