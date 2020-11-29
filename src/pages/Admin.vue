<template>
<div><h1>test2</h1>
    <ul>
      <li v-for="mission in missions" v-bind:key="mission.id">
        <hr>
        <h2>{{ mission.title }}</h2>
        <p>{{ mission.description }}</p>
        <p>{{ mission.street }}</p>
        <p>{{ mission.lat }}</p>
        <p>{{ mission.lng }}</p>
        <hr>
        </li>
        <div>
      <h2>Add a mission</h2>
      <h3>address</h3>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Go</button> 
      </label>
      <br/>

    </div>
        
    </ul>
</div>
</template>

<script>
import gql from "graphql-tag";
  export default {
    components: {
    },
    data() {
    return {
      missions: [],
      places: [],
      currentPlace: null,
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
      methods: {
        setPlace(place) {
      this.currentPlace = place;
      // console.log(currentPlace);
    },
    addMarker() {
      if (this.currentPlace) {
        
        this.places.push(this.currentPlace);
         console.log("test");
        console.log(this.currentPlace.geometry.location.lat());
        console.log(this.currentPlace.geometry.location.lng());
        console.log(this.currentPlace.formatted_address);
        
      }
    },
      }
  }
</script>