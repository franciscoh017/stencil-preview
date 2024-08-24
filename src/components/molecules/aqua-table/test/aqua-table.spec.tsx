import { newSpecPage } from '@stencil/core/testing';
import { AquaTable } from '../aqua-table';

describe('aqua-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AquaTable],
      html: `<aqua-table></aqua-table>`,
    });
    expect(page.root).toEqualHtml(`
      <aqua-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </aqua-table>
    `);
  });
});
