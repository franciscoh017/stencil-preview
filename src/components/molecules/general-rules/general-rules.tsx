import { Component, Element, State, h } from "@stencil/core";

const columns = [
  { text: "#", style: { width: "0.5rem" }, name: "order" },
  { text: "Rule", style: { width: "auto", textAlign: "left" }, name: "rule" },
];

const TYPES = {
  UNDERGOAL: "underGoal",
  OVERGOAL: "overGoal",
};

const data = [
  {
    order: null,
    type: "underGoal",
    rule: {
      name: "isIncreasePortion",
      label: "Increase Portion Size",
      selected: false,
    },
  },
  {
    order: null,
    type: "underGoal",
    rule: {
      name: "isIncreaseNumberOfServings",
      label: "Increase number of Servings",
      selected: false,
    },
  },
  {
    order: null,
    type: "underGoal",
    rule: {
      name: "isAddFoodsInSpecifiedDietCourses",
      label: "Add foods in specified diet courses",
      selected: false,
    },
  },
  {
    order: null,
    type: "overGoal",
    rule: {
      name: "isDecreasePortionSize",
      label: "Decrease portion size",
      selected: false,
    },
  },
  {
    order: null,
    type: "overGoal",
    rule: {
      name: "isDecreaseNumberOfServings",
      label: "Decrease number of servings",
      selected: false,
    },
  },
  {
    order: null,
    type: "overGoal",
    rule: {
      name: "isRemoveFoodsInSpecifiedDietCourses",
      label: "Remove foods in specified diet courses",
      selected: false,
    },
  },
  {
    order: null,
    type: "overGoal",
    rule: {
      name: "isRemoveFoodsFromDietCourseWithMoreThanOne",
      label: "Remove foods from diet course with > 1 item",
      selected: false,
    },
  },
];

@Component({
  tag: "general-rules",
  styleUrl: "general-rules.scss",
  shadow: true,
})
export class GeneralRules {
  @Element() el: HTMLElement;
  @State() data: any[] = [];

  componentWillLoad() {
    this.initData();
  }

  initData() {
    this.data = data;
  }

  get getUnderGoalData() {
    return this.formatData(
      this.data.filter(({ type }) => type === TYPES.UNDERGOAL)
    );
  }

  get getOverGoalData() {
    return this.formatData(
      this.data.filter(({ type }) => type === TYPES.OVERGOAL)
    );
  }

  formatData(data) {
    return data.map((row) => {
      const { name, label, selected } = row.rule;
      return {
        ...row,
        rule: () => {
          return (
            <check-box
              key={name}
              name={name}
              label={label}
              selected={selected}
              onCheckedChange={(event) => this.handleCheckBoxChange(row, event)}
            />
          );
        },
      };
    });
  }

  handleCheckBoxChange(checkedRow, event) {
    const { detail } = event;

    if (detail) {
      const highestOrder = this.data.reduce((max, item) => {
        // Check if the order is a number and greater than the current max
        if (typeof item.order === "number" && item.order > max) {
          return item.order;
        }
        return max;
      }, 0); // Initialize with 0

      checkedRow.order = highestOrder + 1;
    } else {
      checkedRow.order = null;
    }

    checkedRow.rule.selected = detail;
    const updatedData = this.data
      .map((row) => (row.rule.name === checkedRow.rule.name ? checkedRow : row))
      .sort((a, b) => {
        if (a.order === null && b.order === null) {
          return a.rule.label.localeCompare(b.rule.label); // Alphabetical sort by label if both are null
        }
        if (a.order === null) return 1; // `a` should come after `b`
        if (b.order === null) return -1; // `b` should come after `a`

        return a.order - b.order; // Numeric sort
      });

    updatedData
      .filter((row) => row.type === checkedRow.type)
      .forEach((row, index) => {
        row.order = row.order === null ? null : index + 1;
      });

    this.data = updatedData;
  }

  render() {
    return (
      <rule-container
        heading="General Rules"
        subtitle="Configure general correction rules and priority"
      >
        <rule-section icon="gauge_low" heading="When Under Goal">
          <rules-table
            id="UnderGoalTable"
            columns={columns}
            data={this.getUnderGoalData}
          />
        </rule-section>
        <rule-section icon="gauge_high" heading="When Over Goal">
          <rules-table
            id="OverGoalTable"
            columns={columns}
            data={this.getOverGoalData}
          />
        </rule-section>
      </rule-container>
    );
  }
}
