document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Create Calculator UI
    const calculator = document.createElement('div');
    calculator.id = 'calculator';

    const screen = document.createElement('input');
    screen.id = 'result';
    screen.className = 'screen';
    screen.type = 'text';
    screen.readOnly = true;
    screen.value = ''; // Start with an empty value
    screen.placeholder = '0';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons';

    const buttons = [
        { id: 'clear', label: 'C' },
        { id: 'backward', label: '⌫' },
        { id: 'dot', label: '.' },
        { id: 'multiply', label: '×' },
        { id: '7', label: '7' },
        { id: '8', label: '8' },
        { id: '9', label: '9' },
        { id: 'divide', label: '/' },
        { id: '4', label: '4' },
        { id: '5', label: '5' },
        { id: '6', label: '6' },
        { id: 'subtract', label: '-' },
        { id: '1', label: '1' },
        { id: '2', label: '2' },
        { id: '3', label: '3' },
        { id: 'add', label: '+' },
        { id: '0', label: '0' },
        { id: '00', label: '00' },
        { id: 'modulo', label: '%' },
        { id: 'equal', label: '=' }
    ];

    let expression = ''; // Track the full expression

    buttons.forEach(({ id, label }) => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.id = id;
        button.textContent = label;

        // Attach button functionality
        button.addEventListener('click', () => handleButtonPress(label));
        buttonsContainer.appendChild(button);
    });

    calculator.appendChild(screen);
    calculator.appendChild(buttonsContainer);
    app.appendChild(calculator);

    // Handle button press
    function handleButtonPress(label) {
        if (label === 'C') {
            screen.value = '';
            screen.placeholder = '0';
            expression = '';
        } else if (label === '=') {
            try {
                screen.value = eval(expression);
                expression = screen.value; // Allow continued calculations
            } catch {
                screen.value = 'Error';
                expression = '';
            }
        } else if (label === '⌫') {
            expression = expression.slice(0, -1); // Remove the last character
            screen.value = expression || '0'; // Update the screen
        } else {
            if(label == '×') label = "*";
            expression += label;
            screen.value = expression; // Update the screen to show the full expression
        }
    }

    // Keyboard Event Listener
    document.addEventListener('keydown', (e) => {
        const validKeys = '0123456789.+-*/%='.split('');
        if (validKeys.includes(e.key)) {
            if (e.key === '=') {
                handleButtonPress('=');
            } else {
                handleButtonPress(e.key);
            }
        } else if (e.key === 'Backspace') {
            handleButtonPress('⌫');
        } else {
            e.preventDefault();
        }
    });
});
