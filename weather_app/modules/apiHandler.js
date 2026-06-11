const API_KEY = "0f5d1e8891704332937180101251904";
//this function will take the parameters and return ht html to be displayed in the modal
export const apiCall = async (location) => {
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
    
        const data = await response.json();
    
        const city = data.location.name;
        const state = data.location.region;
        const country = data.location.country;
    
        const temp_c = data.current.temp_c;
        const temp_f = data.current.temp_f;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;
        const wind_kph = data.current.wind_kph;
        const direction = data.current.wind_dir;
        const humidity = data.current.humidity;
        const feelslike_c = data.current.feelslike_c;
        const feelslike_f = data.current.feelslike_f;
    
        return `
           <div class="weather-card">
               <h2>${city}, ${state}, ${country}</h2>
    
               <div class="weather-main">
                   <img src="https:${icon}" alt="${condition}">
                   <h3>${condition}</h3>
               </div>
    
               <p><strong>Temperature:</strong> ${temp_c}°C / ${temp_f}°F</p>
    
               <p><strong>Feels Like:</strong> ${feelslike_c}°C / ${feelslike_f}°F</p>
    
               <p><strong>Humidity:</strong> ${humidity}%</p>
    
               <p><strong>Wind:</strong> ${wind_kph} kph ${direction}</p>
           </div>
       `;

    }catch(error){
         console.log(error);
         return `<p class="error">some error occured</p>`
    }

}