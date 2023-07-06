Vue.component("openmap", { 
	data: function () {
	    return {
			rentACarObject: {
				location: {
					longitude: 0,
					latitude: 0
				}
			}
	    }
	},
	    template: `
<div>
	<div id='openmap' style="height: 100vh; width: 100vw"></div>
</div>
		`,
    mounted () {
        axios.get("rest/rentACarObjects/" + this.$route.params.id).then(response => {
			this.rentACarObject = response.data;
			let longitude = this.rentACarObject.location.longitude;
			let latitude= this.rentACarObject.location.latitude;	
			this.initializeMap(longitude, latitude);
		});
		
		
    },
    methods: {
		initializeMap: function(longitude, latitude) {
			console.log(longitude + "   " + latitude);
			let coordinate = ol.proj.fromLonLat([longitude, latitude]);
			console.log(coordinate);
			const map = new ol.Map({
	        view: new ol.View({
	            center: coordinate,
	            zoom: 5
	        }),
	        layers: [
	            new ol.layer.Tile({
	                source: new ol.source.OSM()
	            })
	        ],
	        target: 'openmap'
	    });
	
	    const openStreetMapStandard = new ol.layer.Tile({
	        source: new ol.source.OSM(),
	        visible: true,
	        title: 'OSMStandard'
	    });
	
	    const baseLayerGroup = new ol.layer.Group({
	        layers: [
	            openStreetMapStandard
	        ]
	    });
	
	    let marker = new ol.layer.Vector({
	        source: new ol.source.Vector({
	            features: [
	                new ol.Feature({
	                    geometry: new ol.geom.Point(
	                        coordinate
	                    )
	                })
	            ],
	        }),
	        visible: true,
	        style: new ol.style.Style({
	            image: new ol.style.Icon({
	                anchor: [0.5, 1],
	                src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png'
	            })
	        })
	    })
	
	    map.addLayer(baseLayerGroup);
	    map.addLayer(marker);
		}
    }
});
