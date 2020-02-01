<template>
  <v-row>
    <v-col sm="12" lg="3" class="mb-4 controls">
      <v-menu
        v-if="hasEnd"
        ref="endMenu"
        v-model="endMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="end"
        transition="scale-transition"
        min-width="290px"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="end"
            class="mt-3"
            label="End Date"
            prepend-icon="event"
            dense
            readonly
            outlined
            hide-details
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="end" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="endMenu = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="$refs.endMenu.save(end)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
        ref="nowMenu"
        v-model="nowMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="now"
        transition="scale-transition"
        min-width="290px"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="now"
            class="mt-3"
            label="Today"
            prepend-icon="event"
            dense
            readonly
            outlined
            hide-details
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="now" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="nowMenu = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="$refs.nowMenu.save(now)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col sm="12" lg="9" class="pl-4"> </v-col>
  </v-row>
</template>

<script>
const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6];



export default {
  data: () => ({
    startMenu: false,
    start: "2019-01-12",
    endMenu: false,
    end: "2019-01-27",
    nowMenu: false,
    now: null,
   
    
    
    type: "month",
    
    mode: "stack",
    modeOptions: [
      { text: "Stack", value: "stack" },
      { text: "Column", value: "column" }
    ],
    weekdays: weekdaysDefault,
    
    
    maxDays: 7,
    
    styleInterval: "default",
    
    color: "primary",
    
    // shortIntervals: true,
    shortMonths: false,
    shortWeekdays: false
  }),
  computed: {
    // intervalStyle () {
    //   return stylings[this.styleInterval].bind(this)
    // },
    // hasIntervals () {
    //   return this.type in {
    //     week: 1, day: 1, '4day': 1, 'custom-daily': 1,
    //   }
    // },
    hasEnd() {
      return (
        this.type in
        {
          "custom-weekly": 1,
          "custom-daily": 1
        }
      );
    }
  },
  methods: {
    viewDay({ date }) {
      this.start = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    // showIntervalLabel (interval) {
    //   return interval.minute === 0
    // },
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  }
};
</script>

<style scoped>
.controls {
  position: relative;
}
</style>
