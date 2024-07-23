document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa centrado en las coordenadas de la primera diapositiva
    var map = L.map('map').setView([4.660602, -74.085411], 12);

    // Agregar capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    // Integrar servicios WMS de GeoServer
    var wmsLayer = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms', {
        layers: 'Espacios_culturales_Cultured_Maps:Auditorios',
        format: 'image/png',
        transparent: true
    }).addTo(map);

    // Función para cambiar la vista del mapa
    function changeMapView(lat, lng, zoom) {
        map.setView([lat, lng], zoom);
    }

    // Manejar las diapositivas
    var slides = document.querySelectorAll('.slide');
    slides.forEach(function(slide) {
        slide.addEventListener('click', function() {
            var lat = parseFloat(slide.getAttribute('data-lat'));
            var lng = parseFloat(slide.getAttribute('data-lng'));
            var zoom = parseInt(slide.getAttribute('data-zoom'));
            changeMapView(lat, lng, zoom);
        });
    });

    // Manejar el scroll para cambiar la vista del mapa
    var content = document.getElementById('content');
    content.addEventListener('scroll', function() {
        slides.forEach(function(slide) {
            var slideRect = slide.getBoundingClientRect();
            if (slideRect.top >= 0 && slideRect.bottom <= window.innerHeight) {
                var lat = parseFloat(slide.getAttribute('data-lat'));
                var lng = parseFloat(slide.getAttribute('data-lng'));
                var zoom = parseInt(slide.getAttribute('data-zoom'));
                changeMapView(lat, lng, zoom);
            }
        });
    });
});
