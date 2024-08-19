import { Component, Host, State, h } from '@stencil/core';

const columns = [
  { text: "#", style: { width: "0.5rem" }, name: "order" },
  { text: "Diet Course", style: { width: "8rem", textAlign: "left" }, name: "dietCourse" },
  { text: "Max", style: { width: "auto", textAlign: "left" }, name: "max" },
];

const under = [
  { order: 1, dietCourse: 'Bread', max: 2 },
  { order: 2, dietCourse: 'Hot ENTREE', max: 1 },
  { order: 3, dietCourse: 'Juice', max: 10 },
  { order: 4, dietCourse: 'Fruit', max: 1 },
  { order: 5, dietCourse: 'Milk', max: 1 },
  { order: 6, dietCourse: 'Yogurt', max: 1 },
];

const over = [
  { order: 1, dietCourse: 'Bread', max: 2 },
  { order: 2, dietCourse: 'Hot ENTREE', max: 1 },
  { order: 3, dietCourse: 'Juice', max: 10 },
  { order: 4, dietCourse: 'Fruit', max: 1 },
  { order: 5, dietCourse: 'Milk', max: 1 },
  { order: 6, dietCourse: 'Yogurt', max: 1 },
];

@Component({
  tag: 'diet-course-rules',
  styleUrl: 'diet-course-rules.scss',
  shadow: true
})
export class DietCourseRules {
  @State() underGoalData = [];
  @State() overGoalData = [];

  componentWillLoad() {
    this.underGoalData = [...under];
    this.overGoalData = [...over];
  }

  get underGoalRows() {
    return this.formatUndergoalData(this.underGoalData);
  }

  get overGoalRows() {
    return this.formatOvergoalData(this.overGoalData);
  }

  formatUndergoalData(rows) {
    return rows.map((row, index) => {
      const rowStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      };

      const buttonsStyles = {
        display: 'flex',
        gap: '0.25rem',
      };
      const isDisabledUp = () => index === 0;
      const isDisabledDown = () => index === rows.length - 1;
      const onDelete = (index) => {
        this.underGoalData = this.underGoalData.filter((_, i) => i !== index);
      }
      const onSort = (row, direction: 'up' | 'down') => {

        const updatedData = this.underGoalData.map((item) => {
          if (item.order === row.order) {
            const index = rows.indexOf(item);
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            const itemToSwap = this.underGoalData[newIndex];
            const newOrder = itemToSwap.order;
            itemToSwap.order = item.order;
            item.order = newOrder;
            return item;
          }
          return item;
        });

        this.underGoalData = updatedData
        .sort((a, b) => {
          if (a.order === null) return 1; // `a` should come after `b`
          if (b.order === null) return -1; // `b` should come after `a`
  
          return a.order - b.order; // Numeric sort
        })
        .map((row, index) => {
          return {
            ...row,
            order: index + 1
          };
        });
      };

      return {
        ...row,
        max: () => {
          return (
            <div key={`under-goal-${index}`} style={rowStyles}>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <span>{row.max}</span>
              </div>
              <div style={buttonsStyles}>
                <aqua-button icon="arrow_up" size="icon" disabled={isDisabledUp()} outlined onClick={() => onSort(row, 'up')}></aqua-button>
                <aqua-button icon="arrow_down" size="icon" disabled={isDisabledDown()} outlined onClick={() => onSort(row, 'down')}></aqua-button>
                <aqua-button icon="trash_can" type="danger" size="icon" outlined onClick={() => onDelete(index)}></aqua-button>
              </div>
            </div>
          );
        }
      };
    });
  }

  formatOvergoalData(rows) {
    return rows.map((row, index) => {
      const rowStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      };

      const buttonsStyles = {
        display: 'flex',
        gap: '0.25rem',
      };
      const isDisabledUp = () => index === 0;
      const isDisabledDown = () => index === rows.length - 1;
      const onDelete = (index) => {
        this.overGoalData = this.overGoalData.filter((_, i) => i !== index);
      }
      const onSort = (row, direction: 'up' | 'down') => {

        const updatedData = this.overGoalData.map((item) => {
          if (item.order === row.order) {
            const index = rows.indexOf(item);
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            const itemToSwap = this.overGoalData[newIndex];
            const newOrder = itemToSwap.order;
            itemToSwap.order = item.order;
            item.order = newOrder;
            return item;
          }
          return item;
        });

        this.overGoalData = updatedData.sort((a, b) => {
          if (a.order === null) return 1; // `a` should come after `b`
          if (b.order === null) return -1; // `b` should come after `a`
  
          return a.order - b.order; // Numeric sort
        })
        .map((row, index) => {
          return {
            ...row,
            order: index + 1
          };
        });
      };

      return {
        ...row,
        max: () => {
          return (
            <div key={`over-goal-${index}`} style={rowStyles}>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <span>{row.max}</span>
              </div>
              <div style={buttonsStyles}>
                <aqua-button icon="arrow_up" size="icon" disabled={isDisabledUp()} outlined onClick={() => onSort(row, 'up')}></aqua-button>
                <aqua-button icon="arrow_down" size="icon" disabled={isDisabledDown()} outlined onClick={() => onSort(row, 'down')}></aqua-button>
                <aqua-button icon="trash_can" type="danger" size="icon" outlined onClick={() => onDelete(index)}></aqua-button>
              </div>
            </div>
          );
        }
      };
    });
  }

  render() {
    return (
      <Host>
        <div style={{display: 'flex', background: 'white', flexWrap: 'wrap', borderBottom: '1px solid #dee2e6'}}>
          <rule-container
            style={{width: '50%', minWidth: '20rem', flexGrow: '1'}}
          >
            <div
              slot="heading"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start'
              }}
            >
              <div>
                <div style={{display: 'flex', gap: '0.75rem'}}>
                  <aqua-icon icon="gauge_low"></aqua-icon>
                  <h4 style={{margin: '0'}}>When Under Goal</h4>
                </div>
                <small> <b>Add</b> foods from diet courses </small>
              </div>
              <aqua-button icon="plus"><b>Add</b></aqua-button>
            </div>
            <rules-table slot="body" columns={columns} data={this.underGoalRows}/>
          </rule-container>
          <rule-container style={{width: '50%', minWidth: '20rem'}}>
            <div
              slot="heading"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start'
              }}
            >
              <div>
                <div style={{display: 'flex', gap: '0.75rem'}}>
                  <aqua-icon icon="gauge_high"></aqua-icon>
                  <h4 style={{margin: '0'}}>When Over Goal</h4>
                </div>
                <small> <b>Remove</b> foods from diet courses </small>
              </div>
              <aqua-button icon="plus"><b>Add</b></aqua-button>
            </div>
            <rules-table slot="body" columns={columns} data={this.overGoalRows}/>
          </rule-container>
        </div>
      </Host>
    );
  }
}