import { h, Component, Prop, State, Host } from "@stencil/core";

const nutrientExchanges = [
  { oId: 1, description: "Carbohydrate Group - Other", isConfigured: false },
  { oId: 2, description: "Fluid", isConfigured: true },
  { oId: 3, description: "Protein", isConfigured: true },
  { oId: 4, description: "Sodium", isConfigured: true },
];

const contentStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const notConfiguredStyles = {
  color: "#916430",
};

@Component({
  tag: "nutrient-exchanges-list",
  styleUrl: "nutrient-exchange-list.scss",
  shadow: true,
})
export class NutrientExchangesList {
  @Prop() nutrientExchanges: any[];
  @State() selectedNutrientExchange: any = nutrientExchanges[1];

  constructor() {
    this.nutrientExchanges = nutrientExchanges;
  }

  isSelected(nutrientExchange) {
    return (
      this.selectedNutrientExchange &&
      this.selectedNutrientExchange.oId === nutrientExchange.oId
    );
  }

  setNutrientExchange(nutrientExchange) {
    this.selectedNutrientExchange = nutrientExchange;
  }

  render() {
    return (
      <Host>
        <aqua-list>
          {this.nutrientExchanges.map((nutrientExchange) => (
            <aqua-list-item
              key={nutrientExchange.oId}
              value={nutrientExchange}
              selected={this.isSelected(nutrientExchange)}
              onOnItemSelected={(event) =>
                this.setNutrientExchange(event.detail)
              }
            >
              <div slot="content" style={contentStyles}>
                <span slot="content">{nutrientExchange.description}</span>
                {!nutrientExchange.isConfigured && (
                  <span style={notConfiguredStyles}>
                    <aqua-tooltip text="Not configured">
                      <aqua-icon
                        icon="warning"
                        width={16}
                        height={16}
                      ></aqua-icon>
                    </aqua-tooltip>
                  </span>
                )}
              </div>
              <aqua-icon
                slot="end"
                icon="chevron_right"
                width={16}
                height={16}
              ></aqua-icon>
            </aqua-list-item>
          ))}
        </aqua-list>
      </Host>
    );
  }
}
