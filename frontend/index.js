async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here

  // Task 1
  const hideWeather = document.querySelector("#weatherWidget")
  hideWeather.style.display = 'none'


  /*const selectElement = document.querySelector('#citySelect');
  const selectedCity = "You chose";
  selectElement.addEventListener('change', (click) => {
    const option = selectElement.querySelectorAll('option')
    const result = document.querySelector('#citySelect');
    console.log(`${result.value}`);
    console.log("Fetching weather data..")
  })*/
  document.querySelector('#citySelect').addEventListener('change', async evt => {
    console.log('selection changed')
    try {
      evt.target.setAttribute('disabled', 'disabled');
      hideWeather.style.display = 'none';
      document.querySelector('.info').textContent = 'Fetching weather data...';

      let city = evt.target.value;
      console.log(city);
      let url = ` http://localhost:3003/api/weather?city=${city}`
      console.log(url);

      const res = await axios.get(url);

      document.querySelector('.info').textContent = '';
      hideWeather.style.display = 'block';
      evt.target.removeAttribute('disabled')
      let { data } = res;

      document.querySelector('#apparentTemp div:nth-child(2)')
        .textContent = `${data.current.apparent_temperature}°`
      document.querySelector('#todayStats div:nth-child(1)')
        .textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`
      document.querySelector('#todayStats div:nth-child(2)')
        .textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`
      document.querySelector('#todayStats div:nth-child(3)')
        .textContent = `Humidity: ${data.current.humidity}%`
      document.querySelector('#todayStats div:nth-child(4)')
        .textContent = `Wind: ${data.current.wind_speed}m/s`
      document.querySelector('#todayDescription')
        .textContent = descriptions.find(d => d[0] === data.current.weather_description)[1] 


      data.forecast.daily.forEach((day, idx) => {
        let card = document.querySelectorAll('.next-day')[idx]

        let weekday = card.children[0];
        let apparent = card.children[1];
        let minMax = card.children[2];
        let precipit = card.children[3];

        weekday.textContent = getWeekDay(day.date)
        apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1];
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
        precipit.textContent = `Precipitation: ${day.precipitation_probability * 100}%`

      })

      document.querySelector('#location div:nth-child(1)')
      .textContent = `${city}`

      
      function getWeekDay(datestring) {
        const date = new Date(datestring);
        const days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return days[date.getDay()]
      }
    } catch (err) {
      console.log('😔 Promise rejected with an err.message -->', err.message);
    }
  })
  

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
