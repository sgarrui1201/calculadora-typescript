let currentInput: string = '0';
let previousInput: string = '';
let operator: string = '';

function updateDisplay(): void {
  const display = document.getElementById('display') as HTMLInputElement;
  display.value = currentInput;
}

function appendToDisplay(value: string): void {
  if (['+', '-', '*', '/'].includes(value)) {
    if (operator === '' && currentInput !== '') {
      previousInput = currentInput;
      operator = value;
      currentInput = '';
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
  if (currentInput === '') {
    currentInput = '0';
  }
  updateDisplay();
}

function calculate(): void {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result: number;

  if (isNaN(num1) || isNaN(num2)) {
    return;
  }

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        alert("No se puede dividir por cero");
        return;
      }
      result = num1 / num2;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = '';
  previousInput = '';
  updateDisplay();
}

function setupEventListeners(): void {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const value = btn.getAttribute('data-value');

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

  // Soporte para teclado
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(Number(key)) || ['+', '-', '*', '/', '.'].includes(key)) {
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
