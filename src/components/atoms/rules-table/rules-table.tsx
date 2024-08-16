import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'rules-table',
  styleUrl: 'rules-table.scss',
  shadow: true
})
export class RulesTable {

  @Prop() columns: any[] = [];
  @Prop() data: any[] = [];

  render() {
    return (
      <table class="table-container">
        <thead class="table-row table-header">
          <tr>
          { this.columns.map(({text, style}) =>
              <th
                class="table-cell table-cell-bordered"
                style={style}
              >
                <div>{text}</div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
        { this.data.map((row) =>
              <tr class="table-row">
                { this.columns.map((column) =>
                  <td
                    class="table-cell table-cell-bordered"
                  >
                    {typeof row[column.name] === 'function'
                    ? row[column.name]() // Call the function to render custom component
                    : row[column.name]}
                  </td>
                )}
              </tr>
            )}
        </tbody>
      </table>
    );
  }
}
