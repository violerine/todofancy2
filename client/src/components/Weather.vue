<template>
<div>
    <div v-if="title !== ''">
        <VueWeatherWidget 
            api-key="d65b49158f0e6864f46b079df1e811b8"
            :title="title"
            :latitude="JSON.stringify(latitude)"
            :longitude="JSON.stringify(longitude)"
            language="en"
            units="uk">
        </VueWeatherWidget>

    </div>
    

</div>
</template>

<script>
import Vue from 'vue'
import VueWeatherWidget from 'vue-weather-widget';
import 'vue-weather-widget/dist/css/vue-weather-widget.css';
import VueGeolocation from 'vue-browser-geolocation';

Vue.use(VueGeolocation);
// require('dotenv').config()

export default {
  name:'weather',
  data:function(){
      return{
          latitude:'',
          longitude:'',
          title:''
      }
  },
  created:function(){
      this.gettingLocation()
  },
  components: {
      VueWeatherWidget
  },
  methods:{
      gettingLocation(){
          var options = {
            enableHighAccuracy: true, 
            maximumAge        : 30000, 
            timeout           : 27000
            };
          this.$getLocation(options)
                .then(coordinates => {
                    console.log("Coordinates",coordinates);
                    this.latitude=coordinates.lat
                    this.longitude=coordinates.lng
                    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=AIzaSyC5wzal_QkTBdNk2cbdapK50ASJ9m98hVU`)
                    .then(({data})=>{
                        console.log("LOC ",data)
                        this.title=data.results[0].address_components[1].short_name+","+data.results[0].address_components[4].long_name
                            console.log("GETTING PRECISE LOCATION",data.results[0].address_components[1].short_name)
                            console.log('get',data.results[0].address_components[4].long_name)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    console.log(this.latitude)
                })
                .catch(err=>{
                    console.log(err)
                })
      }
  }
}
</script>
