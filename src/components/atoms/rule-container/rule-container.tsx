import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "rule-container",
  styleUrl: "rule-container.scss",
  shadow: true
})
export class RuleContainer {

  @Prop() heading: string = '';
  @Prop() subtitle: string = '';


  render() {
    return (
      <section class="rule-container">
        <div class="rule-container__head">
            <h1>{this.heading}</h1>
            <small>{this.subtitle}</small>
        </div>
        <slot></slot>
      </section>
    );
  }
}
