<template>
  <div>
    
    <div>
      <h2>Relocate the map onto your position</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Go</button> <br>
        <h2>Show the missions</h2>
        <button @click="addMissions">Show Markers</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        
        @click="center=m.position"

      ></gmap-marker>
<!-- 
      <gmapMarker
        :key="index"
        v-for="(m, index) in missions"
        :position="google && new google.maps.LatLng(m.lat, m.lng)"
        
        @click="center=m.position"
      > {{m.lat}} </gmapMarker> -->

    </gmap-map>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 50.6325578, lng: 5.579666 },
      markers: [],
      places: [],
      currentPlace: null,
      missions: [],
    };
  },
  apollo: {
      missions: gql`
        query missions{
          missions{
            title
            description
            street
            lat
            lng
          }
        }`
      },
  props:{
    // missions
  },
  mounted() {
    this.geolocate();
    this.addMissions();
    
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
      
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        console.log(this.currentPlace.geometry.location.lat())
        // this.markers.push({ position: marker });
       
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
     addMissions: function() {
       this.missions.forEach(mission => {
         const marker = {
           lat:mission.lat,
           lng:mission.lng,
           infos: "test",
         }
         console.log(marker);
         this.markers.push({ position: marker });
        //  this.center = marker;
        this.currentPlace = null;
         
       });
      //  const marker = {
      //     lat: this.currentPlace.geometry.location.lat(),
      //     lng: this.currentPlace.geometry.location.lng()
      //   };
      //   this.missions[0].lat;
      //   console.log(marker)
     },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
      console.log(this.center);
    }
  }
};
</script>