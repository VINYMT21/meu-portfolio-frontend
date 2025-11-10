document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const billInput = document.getElementById('bill');
    const serviceSelect = document.getElementById('service-quality');
    const peopleInput = document.getElementById('people');
    const calculateBtn = document.getElementById('calculate-btn');
    const tipAmountSpan = document.getElementById('tip-amount');
    const totalPerPersonSpan = document.getElementById('total-per-person');
    const resultContainer = document.getElementById('result-container');
    const errorMessage = document.getElementById('error-message');

    // Função para validar as entradas
    function validateInputs(bill, service, people) {
        let valid = true;
        errorMessage.textContent = '';
        errorMessage.style.opacity = '0';

        if (isNaN(bill) || bill <= 0) {
            errorMessage.textContent = 'O valor da conta deve ser um número positivo.';
            valid = false;
        } else if (service === '0') {
            errorMessage.textContent = 'Por favor, selecione a qualidade do serviço.';
            valid = false;
        } else if (isNaN(people) || people <= 0 || !Number.isInteger(people)) {
            errorMessage.textContent = 'O número de pessoas deve ser um inteiro positivo.';
            valid = false;
        }

        if (!valid) {
             errorMessage.style.opacity = '1';
        }
        return valid;
    }

    // Função principal de cálculo
    function calculateTip() {
        // Converte os valores para números
        const bill = parseFloat(billInput.value);
        const serviceRate = parseFloat(serviceSelect.value);
        const people = parseInt(peopleInput.value);

        // 1. Validação
        if (!validateInputs(bill, serviceRate, people)) {
            resultContainer.classList.remove('show');
            return;
        }

        // 2. Cálculo
        const totalTip = bill * serviceRate;
        const totalBill = bill + totalTip;
        const perPersonTotal = totalBill / people;

        // 3. Exibição
        // Formata os valores para moeda brasileira (R$)
        const formatCurrency = (value) => {
            return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        };

        tipAmountSpan.textContent = formatCurrency(totalTip);
        totalPerPersonSpan.textContent = formatCurrency(perPersonTotal);

        // Mostra o container de resultados com uma transição suave
        resultContainer.classList.add('show');
    }

    // Adiciona o evento de clique ao botão
    calculateBtn.addEventListener('click', calculateTip);

    // Opcional: Oculta o container de resultados ao mudar qualquer input
    const inputs = [billInput, serviceSelect, peopleInput];
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            if (resultContainer.classList.contains('show')) {
                resultContainer.classList.remove('show');
            }
        });
    });
});