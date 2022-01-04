let lat;
let lon;
let httpRequest = new XMLHttpRequest();

let select = document.querySelector('.select')

let main = document.querySelector('.main')

let submit = document.querySelector('.btn-submit');
let form = document.querySelector('.form-flex');
let textarea = document.querySelector('.form-control');

let remove = document.querySelector('.delete')
let x=1;
let cities = ['Zaporizhzhia'];
// let act = document.querySelector('.activated');
let allop = document.querySelectorAll('option');



getWeather();
select.addEventListener('change', event => {
    getWeather();
})

select.addEventListener('', event => {
    getWeather();
})




function getWeather(){
    main.innerHTML = '';
    httpRequest.onload = function() { 

        result = JSON.parse(httpRequest.responseText);

        
        console.log(select.value);
        
        
        
        
        
        
    
        form.addEventListener('submit', (e) =>{
            
            e.preventDefault();
            
        
            let content = String(textarea.value);
        
        
            
        
        
            let opt = document.createElement('option');
            function findCities(){
                for(let i = 0; i < cities.length; i++){
                    if(cities[i] == content){
                        
                        return

                    } 
                    if(cities[i] == ''){

                        return

                    }
                }
                opt.innerText = content;
                opt.value = content;
                
                select.appendChild(opt);
                
                cities.push(opt.innerText);
                console.log(cities);
                
            }
        
            findCities();
        
        
        
        
        
        
        
        
        })
        
        remove.addEventListener('click', (e) => {
        
        
            e.preventDefault();
            let del = select.value;
            console.log(del);
            let option = document.querySelector('option[value="'+del+'"]');
            // console.log(option.text);
            let indexCity = cities.indexOf(option.text);
            if (option) {
                option.remove();
            }
            // console.log(option.text)
            let idcity = cities.indexOf(option.text);
            if(idcity) {
                cities.splice(idcity, 1);
                getWeather();
            } else {
                alert('qwerty')
            }
            
            
        
            
        
        
             
        
        
        })
        
        function createDailyWeather(obj){
        
            for(let i = 0; i < obj.list.length; i = i+8){
                let data = obj.list[i].dt_txt.slice(0,10);
                let time = obj.list[i].dt_txt.slice(10,-3);
                let icon = `http://openweathermap.org/img/wn/${obj.list[i].weather[0].icon}@2x.png`;
                let deg = `${Math.round(obj.list[i].main.temp)}°C`;
        
                ///
        
        
        
        
        
                let divObj = document.createElement('div');
                divObj.classList.add('object-weather')
                let div = document.createElement('div');
                let p = document.createElement('p');
                let p1 = document.createElement('p')
                let span = document.createElement('span');
                let main = document.querySelector('.main')
                let iconImg = document.createElement('img');
                iconImg.src = icon;
        
                ///
                main.prepend(divObj);
                p1.innerText = data;
                span.innerText = time;
                div.appendChild(p1); 
                div.appendChild(span);
                divObj.appendChild(div);
                divObj.appendChild(iconImg);
                p.innerText = deg;
        
                divObj.appendChild(p);
        
        
            }

            
        
        }
        
        
        document.querySelector('.userTime').innerText = new Date().toLocaleTimeString().slice(0,-3);
        
        let actualWeather = result.list[0];
        document.querySelector('.actualDegree').innerText = `${Math.round(actualWeather.main.temp)}°C`
        document.querySelector('.status').innerText = actualWeather.weather[0].main;
        document.querySelector('.actual-windy-speed').innerText = actualWeather.wind.speed + ' m/s';
        let icon = actualWeather.weather[0].icon;
        console.log(icon);
        document.querySelector('.actual-img').src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        document.querySelector('.cityNow').innerText = result.city.name;
        
        
        createDailyWeather(result);
        console.log(actualWeather);
        
        
        
        
        
        
        
        };
        
        
        
        
        
        
        httpRequest.open('GET', `https://api.openweathermap.org/data/2.5/forecast?q=${select.value}&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`);
        httpRequest.send();
        
        
}





