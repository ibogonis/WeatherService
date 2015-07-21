$(function () {
    var locale = 'en',
		weatherDiv = $('#weather'),
		scroller = $('#scroller'),
        informByDays = $('#weather-by-days'),
		location = $('p.location');

    var currentCity, currentCountry;

    getWeatherData(locale, dataReceived, showError);

    function dataReceived(data) {
        // Get the offset from UTC (turn the offset minutes into ms)
        var offset = (new Date()).getTimezoneOffset() * 60 * 1000;
        var city = data.city.name;
        var country = data.city.country;
        currentCity = city;
        currentCountry = country;

        $.each(data.list, function () {
            // "this" holds a forecast object
            // Get the local time of this forecast (the api returns it in utc)
            var localTime = new Date(this.dt * 1000 - offset);


            addWeather(
				this.weather[0].icon,
				moment(localTime).calendar(),	// We are using the moment.js library to format the date
				this.weather[0].description,
                Math.round(this.temp.day),
                this.speed,
                this.deg,
                this.pressure,
                this.humidity,
                this.weather[0].main,
                this.temp.night,
                this.temp.day,
                this.temp.eve,
                this.temp.morn,
                moment(localTime).format('ddd'),
                moment(localTime).format('MMM DD')
			);

            //Call Mill drawing with current wind speed
            
            if (moment(localTime).calendar() == 'Today at 4:00 PM') { drawDirection(this.deg); drawBody(this.speed); }
        });
        // Add the location to the page
        location.html(city + ', <b>' + country + '</b>');
        weatherDiv.addClass('loaded');
        // Set the slider to the first slide
        showSlide(0);
    }

    function addWeather(icon, day, condition, temperature, speed, deg, pressure, humidity, main,
                        nightTemp, dayTemp, eveTemp, mornTemp, weekDay, date) {
        
        if (day == 'Today at 4:00 PM') { //check for canvas
            var markup = '<li>' +
                //prepare panel with weather information
                '<div class="weather-information">' +
                    '<div class="left-panel">' +
                    '<div class="region-information">' + currentCity + '</div>' +
                    '<div class="country-information">' + currentCountry + '</div>' +
                    '<div class="day-information">' + day + '</div>' +
                    '<div class="short-weather-information">' +
                            '<div class="weather-big-logo">' +
                                '<img src="images/' + icon + '.svg" />' +
                            '</div>' +
                        temperature + '<sup><small>°C</small></sup>' +
                    '</div>' +
                    '<div class="condition">' + condition + '</div>' +
                 '</div>' +
                '<div class="detail-weather-information">' +
                    '<div class="current-weather-row">' +
                        '<span class="gray-lable">Humidity: </span>' + humidity + '%' +
                    '</div>' +
                    '<div class="current-weather-row">' +
                    '<span class="gray-lable">Pressure: </span>' + pressure + 'mm Hg' +
                    '</div>' +
                    '<div class="current-weather-row" onclick="drawBody();">' +
                        '<span class="gray-lable">Wind: </span><span class="wind-speed">' + speed + 'm/s </span>' + deg +
                    '</div>' +
                '</div>' +

                //Draw canvas for mill and wind direction
                    '<div id="canvasesdiv" style="position:relative; width:150px; height:150px">' +
                        '<canvas id="bodyMill" width="75" height="75" style="position:absolute; left:230px;top:130px;z-index:1;">' + '</canvas>' +
                        '<canvas id="blades" width="75" height="75" style="position:absolute; left:230px;top:130px;z-index:0;">' + '</canvas>' +
                    '</div>' +
                    '<canvas id="wind-direction" height="60" width="60" style="position:absolute; left:310px;top:140px;z-index:1;"></canvas>' +

             '</div>' +
            '</li>' +
         '</ul>';
        } else {
            var markup = '<li>' +
    '<div class="weather-information">' +
        '<div class="left-panel">' +
        '<div class="region-information">' + currentCity + '</div>' +
        '<div class="country-information">' + currentCountry + '</div>' +
        '<div class="day-information">' + day + '</div>' +
        '<div class="short-weather-information">' +
               //<!--<canvas id="weather-logo" width="150" height="100">Your browser doesn't support canvas tag!</canvas>-->
                '<div class="weather-big-logo">' +
                    '<img src="images/' + icon + '.svg" />' +
                '</div>' +
            temperature + '<sup><small>°C</small></sup>' +
        '</div>' +
        '<div class="condition">' + condition + '</div>' +
     '</div>' +
    '<div class="detail-weather-information">' +
        '<div class="current-weather-row">' +
            '<span class="gray-lable">Humidity: </span>' + humidity + '%' +
        '</div>' +
        '<div class="current-weather-row">' +
        '<span class="gray-lable">Pressure: </span>' + pressure + 'мм рт. ст.' +
        '</div>' +
        '<div class="current-weather-row" onclick="drawBody();">' +
            '<span class="gray-lable">Wind: </span><span class="wind-speed">' + speed + 'м/с </span>' + deg +
        '</div>' +
    '</div>' +
 '</div>' +
'</li>' +
'</ul>';
        }

        scroller.append(markup);

        //prepare right pannel whith short wheather information
        var markupLeft =
                '<div class="info-day">' +
                '<div class="week-day">' + weekDay + '</div>' +
                '<div class="month-day">' + date + '</div>' +
                '<div class="day-logo">' +
                '<img width="25px" height="25px" src="images/' + icon + '.svg" /></div>' +
                '<div class="temperature">' + temperature + '<sup><small>°C</small></sup></div>';

        informByDays.append(markupLeft);
    }

    /* Handling the previous / next arrows */
    var currentSlide = 0;
    weatherDiv.find('a.previous').click(function (e) {
        e.preventDefault();
        showSlide(currentSlide - 1);
    });

    weatherDiv.find('a.next').click(function (e) {
        e.preventDefault();
        showSlide(currentSlide + 1);
    });

    // listen for arrow keys
    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 37:
                weatherDiv.find('a.previous').click();
                break;
            case 39:
                weatherDiv.find('a.next').click();
                break;
        }
    });

    function showSlide(i) {
        var items = scroller.find('li');

        if (i >= items.length || i < 0 || scroller.is(':animated')) {
            return false;
        }

        weatherDiv.removeClass('first last');

        if (i == 0) {
            weatherDiv.addClass('first');
        }
        else if (i == items.length - 1) {
            weatherDiv.addClass('last');
        }

        scroller.animate({ left: (-i * 100) + '%' }, function () {
            currentSlide = i;
        });
    }

    /* Error handling functions */
    function showError(msg) {
        weatherDiv.addClass('error').html(msg);
    }
});
