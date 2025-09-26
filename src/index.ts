let currentInput = '0';
let operator = '';
let previousInput = '';

function updateDisplay(): void {
    const display = document.getElementById('display') as HTMLInputElement;
    display.value = currentInput;
}

function appendToDisplay(value: string): void {
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '' && !['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
            previousInput = currentInput;
            currentInput += value;
            operator = value;
        }
    } else {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }

    updateDisplay();
}

function clearDisplay(): void {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function deleteLast(): void {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}

function calculate(): void {
    try {
        const result = eval(currentInput);
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay();
    } catch {
        alert("Expresión inválida");
    }
}

function setupEventListeners(): void {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const value = button.getAttribute('data-value');

            if (action === 'clear') {
                clearDisplay();
            } else if (action === 'delete') {
                deleteLast();
            } else if (action === 'calculate') {
                calculate();
            } else if (value) {
                appendToDisplay(value);
            }
        });
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if (!isNaN(parseInt(key)) || ['+', '-', '*', '/', '.'].includes(key)) {
            appendToDisplay(key);
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            deleteLast();
        } else if (key.toLowerCase() === 'c') {
            clearDisplay();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    setupEventListeners();
});
