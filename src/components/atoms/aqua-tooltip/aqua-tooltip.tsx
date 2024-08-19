import { h, Component, Prop, State } from "@stencil/core";

@Component({
  tag: "aqua-tooltip",
  styleUrl: "aqua-tooltip.scss",
  shadow: true,
})
export class AquaTooltip {
  @Prop() text: string; // Text to display inside the tooltip
  @Prop() position: "top" | "bottom" | "left" | "right" = "bottom";
  @State() showTooltip: boolean = false; // State to toggle tooltip visibility

  private hideTimeout: any; // Reference to the timeout for hiding tooltip

  // Show the tooltip immediately
  private showTooltipHandler = () => {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    this.showTooltip = true;
  };

  // Hide the tooltip after a delay
  private hideTooltipHandler = () => {
    this.hideTimeout = setTimeout(() => {
      this.showTooltip = false;
    }, 500); // Adjust the delay as needed
  };

  render() {
    return (
      <div
        class="tooltip-wrapper"
        onMouseEnter={this.showTooltipHandler}
        onMouseLeave={this.hideTooltipHandler}
      >
        <slot></slot>
        {this.showTooltip && (
          <div class={`tooltip ${this.position}`}>{this.text}</div>
        )}
      </div>
    );
  }
}
