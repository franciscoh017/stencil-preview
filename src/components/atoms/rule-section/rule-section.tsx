import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "rule-section",
  styleUrl: "rule-section.scss",
  shadow: true,
})
export class RuleSection {
  @Prop() heading: string = "";
  @Prop() icon: string = "";

  render() {
    return (
      <div class="rule-section">
        <div class="section-title-row">
          <div class="section-title-icon">
            <aqua-icon icon={this.icon}></aqua-icon>
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
