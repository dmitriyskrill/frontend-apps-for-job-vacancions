<template>
  <div class="d-flex align-center justify-center" v-if="!elevator">Идет загрузка</div>
  <div v-else class="emulator-container">
    <elevator-emulation-simplified-emulator-header
        :call-stack="callStack"
        :current-floor="currentFloor"
        :move-time-per-floor="moveTimePerFloor"
        :relax-time="relaxTime"
    />
    <v-row
        no-gutters
        class="emulator-container main"
    >
      <div style="width: 80%; height: 100%">
        <elevator-emulation-lift-shaft
            :current-status="currentStatus"
            :goal-floor="goalFloor"
            :floors-count="floorsCount"
            :move-direction="moveDirection"
            :id="'Single'"
        />
      </div>

      <elevator-emulation-button-block
          :floors="floors"
          :floors-count="floorsCount"
          :call-stack="callStack"
          @setFloor="addFloorToCallStack($event)"
      />
    </v-row>
  </div>
</template>

<script>
import { Elevator } from '@/entities/elevatorEmulator/elevator'
import ElevatorEmulationButtonBlock from '@/components/ElevatorEmulation/ButtonBlock.vue'
import ElevatorEmulationLiftShaft from '@/components/ElevatorEmulation/LiftShaft.vue'
import ElevatorEmulationSimplifiedEmulatorHeader from '@/components/ElevatorEmulation/SimplifiedEmulatorHeader.vue'
import { mapActions, mapState } from 'pinia'
import { useSimplifiedElevatorEmulatorStore } from '@/stores/simplifiedElevatorEmulator'

export default {
  name: 'ElevatorSimplifiedEmulator',
  components: { ElevatorEmulationSimplifiedEmulatorHeader, ElevatorEmulationLiftShaft, ElevatorEmulationButtonBlock },
  data: () => ({
    elevator: null,
  }),
  computed: {
    ...mapState(useSimplifiedElevatorEmulatorStore, ['floorsCount']),
    relaxTime () {
      return this.elevator.relaxTime
    },
    moveDirection () {
      return this.elevator.moveDirection
    },
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
    ...mapActions(useSimplifiedElevatorEmulatorStore, ['setFloorsCount']),
    async setInitialBottomToElevatorNode () {
      const elevatorNode = document.getElementById('elevatorSingle')
      if (!elevatorNode) return
      const elevatorNodeHeight = elevatorNode.offsetHeight
      elevatorNode.style.transitionDuration = 0 + 'ms'
      elevatorNode.style.bottom = (this.currentFloor - 1) * elevatorNodeHeight + 'px'
    },
    async setBottomToElevatorNode (value) {
      if (value === null) return
      const elevatorNode = document.getElementById('elevatorSingle')
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
      localStorage.setItem('singleElevatorFloorsCount', this.floorsCount)
    },
    getElevatorDataFromCache () {
      const cacheData = localStorage.getItem('singleElevator')
      if (!cacheData || typeof cacheData !== 'string') return null
      return JSON.parse(cacheData)
    },
    setFloorsCountFromCache () {
      const cacheData = localStorage.getItem('singleElevatorFloorsCount')
      if (cacheData && typeof cacheData === 'string') {
        this.setFloorsCount(Number.parseInt(cacheData))
      }
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
    this.setFloorsCountFromCache()
    const elevatorData = this.getElevatorDataFromCache()
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

<style lang="scss">
.elevator {
  transition-property: bottom;
  transition-timing-function: linear;

}

.emulator-container {
  height: calc(100vh - 48px);
  width: 100%;

  & .main {
    width: 100%;
    height: 90%;
    background: #b3b7ec
  }
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
