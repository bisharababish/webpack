import { handleSubmit } from '../client/js/formHandler';
import { checkForName } from '../client/js/Client';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ polarity: 'positive', subjectivity: 'objective', text: 'This is a test.' }),
    })
);

beforeAll(() => {
    document.body.innerHTML = `
    <form id="form">
      <input type="text" id="name" value="https://example.com" />
      <button type="submit">Submit</button>
    </form>
    <div id="results"></div>
  `;

    global.alert = jest.fn();
});

describe('Form Handler Tests', () => {
    test('checkForName should validate URLs correctly', () => {
        expect(checkForName('https://example.com')).toBe(true);
        expect(checkForName('example.com')).toBe(false);
    });

    test('handleSubmit should prevent default form submission', () => {
        const event = { preventDefault: jest.fn() };
        handleSubmit(event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    test('handleSubmit should update the DOM with results', async () => {
        await handleSubmit({ preventDefault: jest.fn() });

        expect(document.getElementById('results').innerHTML).toContain('Polarity: positive');
        expect(document.getElementById('results').innerHTML).toContain('Subjectivity: objective');
        expect(document.getElementById('results').innerHTML).toContain('Text: This is a test.');
    });

    test('handleSubmit should handle invalid URLs', () => {
        document.getElementById('name').value = 'invalid-url';
        handleSubmit({ preventDefault: jest.fn() });
        expect(global.alert).toHaveBeenCalledWith('Please enter a valid URL');
    });
});