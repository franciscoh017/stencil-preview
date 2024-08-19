import { h, Component, Prop, Host } from '@stencil/core';
import { icons } from './icons/index';

const types = {
  default: {
    color: 'inherit'
  },
  primary: {
    color: '#0878c8'
  },
};

@Component({
  tag: 'aqua-icon',
  styleUrl: 'aqua-icon.scss',
  shadow: true
})
export class AquaIcon {
  @Prop() icon: string = 'gauge_high';
  @Prop() width: number = 20;
  @Prop() height: number = 20;
  @Prop() type: string = 'default';

  render() {
    return (
      <Host style={{...types[this.type]}}>
        {icons[this.icon](this.width, this.height)}
      </Host>
    );
  }
}
