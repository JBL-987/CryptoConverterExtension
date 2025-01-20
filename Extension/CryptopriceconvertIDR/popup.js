const CMC_PRO_API_KEY = '<your-api-key>';
    const BASE_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';

    document.addEventListener('DOMContentLoaded', () => {
      const cryptoSelect = document.getElementById('cryptoSelect');
      const cryptoAmount = document.getElementById('cryptoAmount');
      const checkPriceButton = document.getElementById('checkPrice');
      const priceDisplay = document.getElementById('price');
      const totalPriceDisplay = document.getElementById('totalPrice');

      async function fetchPrice(symbol) {
        try {
          priceDisplay.textContent = 'Loading...';
          totalPriceDisplay.textContent = '';

          const response = await fetch(`${BASE_URL}?symbol=${symbol}&convert=IDR`, {
            headers: {
              'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY,
              'Accept': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          if (data.data && data.data[symbol]) {
            const price = data.data[symbol].quote.IDR.price;
            const amount = parseFloat(cryptoAmount.value) || 1;
            const total = price * amount;

            priceDisplay.textContent = `${symbol} Price: Rp ${price.toLocaleString('id-ID', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;

            if (amount !== 1) {
              totalPriceDisplay.textContent = `Total (${amount} ${symbol}): Rp ${total.toLocaleString('id-ID', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`;
            }
          } else {
            throw new Error('Invalid response format');
          }
        } catch (error) {
          priceDisplay.textContent = 'Error fetching price';
          totalPriceDisplay.textContent = '';
          console.error('Error:', error);
        }
      }

      checkPriceButton.addEventListener('click', () => {
        if (cryptoSelect.value) {
          fetchPrice(cryptoSelect.value);
        }
      });

      // Optional: Fetch initial price
      if (cryptoSelect.value) {
        fetchPrice(cryptoSelect.value);
      }
    });