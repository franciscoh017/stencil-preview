import {
  Component,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  h,
} from "@stencil/core";

@Component({
  tag: "check-box",
  styleUrl: "check-box.scss",
  shadow: true,
})
export class CheckBox {
  @Prop({ reflect: true }) name: string = "";
  @Prop() label: string = "";
  @Prop({ reflect: true }) selected: boolean = false;

  @Element() el: HTMLElement;

  @State() style = {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    gap: "0.25rem",
  };

  @Event({
    eventName: "checkedChange",
    composed: true,
    bubbles: false,
  })
  checkedChange: EventEmitter<boolean>;

  handleChange(event) {
    this.selected = event.target.checked;
    this.checkedChange.emit(this.selected);
  }

  render() {
    return (
      <div style={this.style}>
        <input
          id={this.name}
          type="checkbox"
          checked={this.selected}
          value="true"
          onChange={(event) => this.handleChange(event)}
        />
        <label htmlFor={this.name}>
          <small>{this.label}</small>
        </label>
      </div>
    );
  }
}
