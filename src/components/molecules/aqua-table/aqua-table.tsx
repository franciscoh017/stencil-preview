import { h, Component, Prop, State } from '@stencil/core';
import get from 'lodash.get';

const TYPES = {
  type1: 'type-1',
  type2: 'type-2',
};

@Component({
  tag: 'aqua-table',
  styleUrl: 'aqua-table.scss',
  shadow: true
})
export class AquaTable {
  @Prop() type: string = 'type1';
  @Prop() caption: string = '';
  @Prop() columns: Array<any> = [];
  @Prop() defaultSort: any = { field: 'id', direction: 'asc' };
  @Prop() rows: Array<any> = [];
  @Prop() tdClass: string = '';
  @Prop() actions: Array<any> = [];

  @State() localRows: Array<any> = [];

  componentWillLoad() {
    this.localRows = [...this.rows];
  }

  private columnsData(column: any, data: any, index: number): string {
    if (column.name === 'index') {
      return (index + 1).toString();
    }

    if (!column.callback) {
      return get(data, column.name, '');
    }

    if (typeof column.callback === 'function') {
      return column.callback(data);
    }

    if (typeof column.callback === 'string') {
      return this[column.callback](get(data, column.name), data);
    }

    const value = get(data, column.name, '');
    return value ? String(value).trim() : '';
  }

  private computeAttributes(action: any, row: any) {
    if (typeof action.attrs === 'function') {
      return action.attrs(row);
    }

    return { ...action.attrs };
  }

  private computeEvents(action: any, row: any) {
    if (typeof action.events === 'function') {
      return action.events(row);
    }
    return { ...action.events };
  }

  private onSort(sort: any) {
    if (!sort) return;
    //const event = new CustomEvent('sort-table-order');
    //this.el.dispatchEvent(event);
  }

  private get el() {
    return this;
  }

  render() {
    return (
      <div class={TYPES[this.type]} style={{ width: '100%' }}>
        <table style={{ width: '100%', tableLayout: 'auto' }}>
          {this.caption && (
            <caption style={{ margin: '1rem 0 0.75rem 0', textAlign: 'left' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '500', color: '#333' }}>
                {this.caption}
              </span>
            </caption>
          )}

          <thead style={{ borderBottom: '1px solid #dcdcdc' }}>
            <tr>
              {this.columns.map((column, index) => (
                <th
                  key={`table_head_${index}_${column.title}`}
                  scope="col"
                  style={{
                    padding: '0.75rem 1rem',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    color: '#1a1a1a',
                    textTransform: 'capitalize',
                    cursor: column.icon ? 'pointer' : 'auto',
                    display: column.icon ? 'flex' : 'block',
                    alignItems: column.icon ? 'center' : 'unset',
                  }}
                  onClick={() => this.onSort(column.sort)}
                >
                  {column.title}
                  {column.icon && (
                    <aqua-icon
                      style={{marginLeft: '0.5rem' }}
                      width={16}
                      height={16}
                      icon="arrow-down"
                    />
                  )}
                </th>
              ))}
              {this.actions.length > 0 && (
                <th scope="col" style={{ width: '2.5rem', padding: '0.75rem 0' }} />
              )}
            </tr>
          </thead>

          <tbody style={{ backgroundColor: '#ffffff', borderTop: '1px solid #dcdcdc' }}>
            {this.localRows.map((row, index) => (
              <tr key={`table_detail_${index}_${row.id}`} style={{ borderBottom: '1px solid #e5e5e5' }}>
                {this.columns.map((column, columnIndex) => (
                  <td
                    key={`table_field_${index}_${column.title}`}
                    data-label={this.columns[columnIndex].title}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      textAlign: columnIndex === 0 ? 'left' : 'right',
                      color: '#000',
                      ...this.tdClass ? { className: this.tdClass } : {},
                    }}
                  >
                    {column.component ? (
                      <component
                        is={column.component}
                        {...this.computeAttributes(column, row)}
                        {...this.computeEvents(column, row)}
                      >
                        {this.columnsData(column, row, columnIndex)}
                      </component>
                    ) : (
                      <div style={{ textAlign: 'right', color: '#000' }}>
                        {this.columnsData(column, row, columnIndex)}
                      </div>
                    )}
                  </td>
                ))}
                {this.actions.length > 0 && (
                  <td
                    style={{
                      padding: '0.5rem',
                      textAlign: 'left',
                      color: '#707070',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                    data-label="actions"
                  >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      {this.actions.map((action, actionIndex) => (
                        <component
                          key={`action_${actionIndex}_${Math.random()}`}
                          is={action.component}
                          {...this.computeAttributes(action, row)}
                          {...this.computeEvents(action, row)}
                        />
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
