"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type CurrencyRates = {
  [key: string]: number;
};

export default function Converter() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<number>(1);
  const [conversionResult, setConversionResult] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("https://open.er-api.com/v6/latest/USD")
      .then((response) => {
        setCurrencies(Object.keys(response.data.rates));
      })
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const handleConvert = () => {
    if (fromCurrency === toCurrency) {
      setConversionResult(amount);
      return;
    }

    axios
      .get(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then((response) => {
        const rates: CurrencyRates = response.data.rates;
        const rate = rates[toCurrency];
        setConversionResult(amount * rate);
      })
      .catch((error) =>
        console.error("Error fetching conversion rate:", error)
      );
    console.log(currencies);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
      <div className="flex flex-col gap-3 bg-white p-6 rounded shadow-md w-80">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Enter amount"
        />
        <div className="flex gap-2">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border p-2 rounded w-1/2"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span className="text-lg">→</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border p-2 rounded w-1/2"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white py-2 rounded"
        >
          Convert
        </button>
        {conversionResult !== null && (
          <h2 className="text-lg font-semibold">
            {amount} {fromCurrency} = {conversionResult.toFixed(2)} {toCurrency}
          </h2>
        )}
      </div>
    </div>
  );
}
