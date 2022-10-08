import { SkyJasmineAsyncMatchers } from './to-be-accessible.async-matcher';

xdescribe('expectAsync.toBeAccessible', () => {
  function createPassingElement() {
    const wrapper = document.createElement('div');
    const elem1 = document.createElement('div');
    const elem2 = document.createElement('div');
    wrapper.appendChild(elem1);
    wrapper.appendChild(elem2);
    document.body.appendChild(wrapper);
    return wrapper;
  }

  function createFailingElement() {
    const element = createPassingElement();

    // Fail 'duplicate-id' rule.
    [].slice.call(element.querySelectorAll('div')).forEach((elem: any) => {
      elem.setAttribute('id', 'same-id');
    });

    // Fail 'color-contrast' rule.
    const button = document.createElement('button');
    button.innerText = 'Click me';
    button.style.backgroundColor = 'darkred';
    button.style.color = 'red';
    element.appendChild(button);

    // Fail 'label' rule.
    const input = document.createElement('input');
    element.appendChild(input);

    return element;
  }

  beforeAll(() => {
    jasmine.addAsyncMatchers(SkyJasmineAsyncMatchers);
  });

  it('should allow custom matchers', async () => {
    const el = createFailingElement();
    await expectAsync(el).toBeA11y();
  });
});
