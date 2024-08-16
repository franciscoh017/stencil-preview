import { newE2EPage } from '@stencil/core/testing';

describe('rule-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<rule-container></rule-container>');
    const element = await page.find('rule-container');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<rule-container></rule-container>');
    const component = await page.find('rule-container');
    const element = await page.find('rule-container >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
