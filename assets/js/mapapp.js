var myMap = L.map('map', {zoomControl: false}).setView([39.4697495, -0.37739], 10);
		var zoomHome = L.Control.zoomHome();
		zoomHome.addTo(myMap);
		L.control.locate().addTo(myMap);
	    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(myMap);

		
		
		var mark = L.layerGroup();
		function onLocationFound(e) {
			
			var pin = L.marker(e.latlng).bindPopup('Estas ubicado aquí');
			var zona = L.circle(e.latlng, {
			  color: '#f03',
			  weight: 0.1,
			  fillColor: '#f03',
			  fillOpacity: 0.4,
			  radius: 1000
			});
			
			mark.addLayer(pin);
			mark.addLayer(zona);
			myMap.addLayer(mark);
			
					
			var elem = document.querySelector('input[type="range"]');
			var rangeValue = function(){
			  var newValue = elem.value;
			  var target = document.querySelector('.value');
			  target.innerHTML = newValue;
			}
					
			var slider = document.getElementById("myRange");
			var output = document.getElementById("demo");
			
			output.innerHTML = (slider.value);

			$('#myRange').on('input', function(event) {
			  output.innerHTML = event.target.value;
			  zona.setRadius((event.target.value)*1000);
			});

		}

		function onLocationError(e) {
			alert(e.message);
		}

		
		myMap.on('locationfound', onLocationFound);
		myMap.on('locationerror', onLocationError);
			
		myMap.locate({setView: true, maxZoom: 13 });
		
		

        myMap.on('click', function(e){
            if (myMap.hasLayer(mark)){
                myMap.removeLayer(mark);
                mark.clearLayers();
            }
            addMarker(e);
        });

        function addMarker(e){
            var cords = String(e.latlng);
            cords = cords.match(/\(([^)]+)\)/)[1];
            lat = cords.substring(0, cords.search(","));
            lng = cords.substring(cords.search(",")+1);
			var newPoint = new L.Marker([lat, lng]);
			var newCircle = new L.circle([lat, lng], {
				color: '#f03',
			  weight: 0.1,
			  fillColor: '#f03',
			  fillOpacity: 0.4,
			  radius: 1000});
			mark.addLayer(newPoint);
            mark.addLayer(newCircle);
            myMap.addLayer(mark);
			
			
			var elem = document.querySelector('input[type="range"]');
			var rangeValue = function(){
			  var newValue = elem.value;
			  var target = document.querySelector('.value');
			  target.innerHTML = newValue;
			}
					
			var slider = document.getElementById("myRange");
			var output = document.getElementById("demo");
			
			output.innerHTML = (slider.value);

			$('#myRange').on('input', function(event) {
			  output.innerHTML = event.target.value;
			  newCircle.setRadius((event.target.value)*1000);
			});
			
        }