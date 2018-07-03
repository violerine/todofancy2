<template>
    <div class="calendar">
        <Navbar/>
        
         <div class="weathjer">
            <Weather/>
        </div>
        <div class="container">
	        <full-calendar 
            @event-selected="eventSelected" 
            @event-created="eventCreated" 
            :config="config" 
            :events="events" />
    <!-- data-toggle="modal" -->
        </div>

       
        

    </div>
    <!-- :events="events" -->
</template>

<script>
import moment from 'moment'
import { FullCalendar } from 'vue-full-calendar'
import Navbar from '@/components/Navbar.vue'
import Weather from '@/components/Weather.vue'


export default {
  name: 'hello',
  created:function(){
      this.checkLocalStorage()
  },    
  components: {
    FullCalendar,
    Navbar,
    Weather

  },
  data () {
    return {
			events: [
				// {
				// 	title: 'test',
				// 	allDay: true,
				// 	start: moment(),
				// 	end: moment().add(1, 'd'),
				// },
				// {
				// 	title: 'another test',
				// 	start: moment().add(2,'d'),
				// 	end: moment().add(2, 'd').add(2, 'h'),
				// },
			],
			config: {
                defaultView: 'month',
				eventRender: function(event, element) {
        	    console.log("EVENT CONFIG",event)
            },
            status:'',
            currentUser:localStorage.getItem('token')
      },
    }
  },
    methods: {
    refreshEvents() {
      this.$refs.calendar.$emit('refetch-events');
    },

    removeEvent() {
      this.$refs.calendar.$emit('remove-event', this.selected);
      this.selected = {};
    },

    eventSelected(event) {
      this.selected = event;
      console.log("EVENT SELECTED",event)
    },

    eventCreated(...day) {
    var userid=localStorage.getItem('userid')
    console.log("DAY",day[0].start._d)
    var datestr = String(day[0].start._d)
    this.$router.push({name : 'todo', params:{date : datestr}})
    },
    checkLocalStorage(){
     if(this.currentUser===null){
         this.$router.push('/')
     }
    }
  },
}

</script>

<style>

@import '~fullcalendar/dist/fullcalendar.css';
#calendar {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button.fc-agendaDay-button.fc-button.fc-state-default.fc-corner-right {
    display: none;
}
button.fc-agendaWeek-button.fc-button.fc-state-default{
    display:none;
}

button.fc-month-button fc-button fc-state-default fc-corner-left fc-state-active{
    display:none;
}
.fc-view.fc-agendaWeek-view.fc-agenda-view{
    display:none;
}

.fc-month-button.fc-button.fc-state-default.fc-corner-left.fc-state-active{
    display:none;
}

.fc-today-button.fc-button.fc-state-default.fc-corner-left.fc-corner-right.fc-state-disabled{
    display:none;
}

.fc-view.fc-month-view.fc-basic-view{
    padding-bottom: 40px;
}

.fc-day-header.fc-widget-header{
    background-color:rgb(171, 235, 235)
}
.fc-content{
    background-color: rgb(233, 254, 255);
    border-style: none;
}

.fc-unthemed th, .fc-unthemed td, .fc-unthemed thead, .fc-unthemed tbody, .fc-unthemed .fc-divider, .fc-unthemed .fc-row, .fc-unthemed .fc-content, .fc-unthemed .fc-popover, .fc-unthemed .fc-list-view, .fc-unthemed .fc-list-heading td {
    border-color:black
}

.fc-event, .fc-event-dot {
    background-color:white
}


</style>
