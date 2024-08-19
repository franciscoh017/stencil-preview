import { Component, h } from "@stencil/core";

@Component({
  tag: "rule-container",
  styleUrl: "rule-container.scss",
  shadow: true,
})
export class RuleContainer {
  render() {
    return (
      <section class="rule-container">
        <div class="rule-container__head">
          <slot name="heading"></slot>
        </div>
        <div class="rule-container__body">
          <slot name="body"></slot>
        </div>
      </section>
    );
  }
}
