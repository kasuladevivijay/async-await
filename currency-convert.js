// currency coverter 
// 

const axios = require('axios');
const _ = require('lodash');

const getExchange = (from, to) => {
    return axios.get(`http://api.fixer.io/latest?base=${from}`)
         .then((response) => {
             return response.data.rates[to];
         });
};

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
                .then((response) => {
                    return _.map(response.data, (country)=>{
                        return country.name;
                    });
                });
};

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchange(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;
        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
    });
};

const convertCurrencyAsync = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchange(from, to);
    const exchangedAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries:=> ${countries.join(', ')}`;
}

// getExchange('INR', 'USD').then((res) => {
//     console.log(res);
// });

// getCountries('INR').then((countries) => {
//     console.log(countries);
// });

convertCurrencyAsync('USD', 'INR', 5000)
    .then((response) => {
        console.log(response);
    });