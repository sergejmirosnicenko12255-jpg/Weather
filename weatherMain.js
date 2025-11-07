const apiKey = '1c013ab1f57227981baeb717eaf5b534';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const searchBox = document.querySelector('.cardInput');
const searchBtn = document.getElementById('searchBtn');

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Город не найден');
        }

        const data = await response.json();
        console.log(data);

        if (data && data.main && data.name) {
            document.querySelector(".cardTitle--city").innerHTML = data.name;
            document.querySelector(".cardTitle--temp").innerHTML = Math.round(data.main.temp) + '°C';
        } else {
            throw new Error('Данные не получены');
        }
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Город не найден.');
    }
}

searchBtn.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
        searchBox.value = '';
    } else {
        alert('Введите название города');
    }
});

searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
            searchBox.value = '';
        }
    }
});