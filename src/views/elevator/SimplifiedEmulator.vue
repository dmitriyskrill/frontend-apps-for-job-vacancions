<template>
  <div v-if="!elevator">Идет загрузка</div>
  <div v-else style="height:calc(100vh - 48px); width: 100%">
    <v-row
        class="align-center px-2"
        no-gutters
        style="width: 100%; height: 10%; background: #234908"
    >
      <v-col>
        Текущий этаж: {{ elevator.currentFloor }}
      </v-col>
      <v-col>
        Скорость: 1 этаж за {{ elevator.moveTimePerFloor / 1000 }} секунд
      </v-col>
      <v-col>
        Время отдыха: 1 этаж за {{ elevator.relaxTime / 1000 }} секунд(ы)
      </v-col>
      <v-col>
        Очередь вызовов: {{ elevator.callStack }}
      </v-col>
    </v-row>
    <v-row
        no-gutters
        style="width: 100%; height: 90%; background: #b3b7ec"
    >
      <div style="width: 80%; position: relative">
        <div
            class="d-flex"
            id="elevator"
            ref="elevator"
            :style="`width:100%; height:${100/floorsCount}%; background: #535bf2; position: absolute; bottom: 0`"
            :class="currentStatus === 'relax' ? 'animated-elevator' : ''"
        >
          <v-chip class="ma-auto">
            <template v-if="elevator.currentStatus === 'moving'">
              {{ elevator.goalFloor }}
              <v-icon size="small">mdi-arrow-{{ elevator.moveDirection }}</v-icon>
            </template>
            <template v-else-if="elevator.currentStatus === 'relax'">
              <v-icon> mdi-sleep</v-icon>
            </template>
            <template v-else>
              <v-icon> mdi-check</v-icon>
            </template>
          </v-chip>
        </div>
      </div>
      <div style="width: 20%; background: #213547; ">
        <div
            v-for="floor in floors"
            :key="floor"
            class="d-flex"
            :style="`height: ${100/floorsCount}%`"
        >
          <v-btn
              :color="callStack.includes(floor) ? 'success' : ''"
              class="ma-auto"
              @click="addFloorToCallStack(floor)"
          >{{ floor }}
          </v-btn>
        </div>

      </div>
    </v-row>
  </div>
</template>

<script>
import { Elevator } from '@/entities/elevatorEmulator/elevator'

export default {
  name: 'ElevatorSimplifiedEmulator',
  data: () => ({
    floorsCount: 5,
    elevator: null,
  }),
  computed: {
    moveTimePerFloor () {
      return this.elevator.moveTimePerFloor
    },
    currentFloor () {
      return this.elevator.currentFloor
    },
    currentStatus () {
      return this.elevator.currentStatus
    },
    lastDifference () {
      return this.elevator.lastDifference
    },
    callStack () {
      if (!this.elevator) return []
      return this.elevator.callStack
    },
    goalFloor () {
      if (!this.elevator) return null
      return this.elevator.goalFloor
    },
    floors () {
      const array = []
      for (let i = this.floorsCount; i > 0; i--) {
        array.push(i)
      }
      return array
    },
  },
  watch: {
    goalFloor (value) {
      this.setBottomToElevatorNode(value)
    },
  },
  methods: {
    async setInitialBottomToElevatorNode () {
      const elevatorNode = document.getElementById('elevator')
      if (!elevatorNode) return
      const elevatorNodeHeight = elevatorNode.offsetHeight
      elevatorNode.style.transitionDuration = 0 + 'ms'
      elevatorNode.style.bottom = (this.currentFloor - 1) * elevatorNodeHeight + 'px'
    },
    async setBottomToElevatorNode (value) {
      if (value === null) return
      const elevatorNode = document.getElementById('elevator')
      if (!elevatorNode) return
      const elevatorNodeHeight = elevatorNode.offsetHeight
      elevatorNode.style.transitionDuration = (this.lastDifference * this.moveTimePerFloor) + 'ms'
      elevatorNode.style.bottom = (value - 1) * elevatorNodeHeight + 'px'
    },
    addFloorToCallStack (floor) {
      this.elevator.addFloorToCallStack(floor)
    },
    setToCache () {
      const cacheData = {
        id: this.elevator.id,
        moveTimePerFloor: this.elevator.moveTimePerFloor,
        relaxTime: this.elevator.relaxTime,
        moveDirection: this.elevator.moveDirection,
        callStack: this.elevator.callStack,
        currentStatus: this.elevator.currentStatus,
        currentFloor: this.elevator.currentFloor,
      }
      localStorage.setItem('singleElevator', JSON.stringify(cacheData))
    },
    getFromCache () {
      const cacheData = localStorage.getItem('singleElevator')
      if (!cacheData || typeof cacheData !== 'string') return null
      return JSON.parse(cacheData)
    },
    setCacheInterval () {
      this.interval = setInterval(this.setToCache, 1000)
    },
    clearCacheInterval () {
      if (!this.interval) return
      clearInterval(this.interval)
    },
  },
  created () {
    const elevatorData = this.getFromCache()
    if (elevatorData) {
      this.elevator = new Elevator(elevatorData)
      this.elevator.initFromCache()
    } else {
      this.elevator = new Elevator({})
    }
  },
  mounted () {
    this.setInitialBottomToElevatorNode()
    this.setBottomToElevatorNode(this.elevator.goalFloor)
    this.setCacheInterval()
  },
  beforeRouteLeave () {
    this.clearCacheInterval()
  },
  beforeRouteUpdate () {
    this.clearCacheInterval()
  },
}
</script>

<style>
#elevator {
  transition-property: bottom;
  transition-timing-function: linear;

}

.animated-elevator {
  animation-name: elevator-flashing;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes elevator-flashing {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>
