import {elevatorStatuses, moveDirections} from './emuns'

export interface IElevatorInitProps {
  relaxTime?: number | undefined,
  travelTimePerFloor?: number | undefined
  floor?: number | undefined
  status?: string | undefined
}

export class Elevator {

  id: number
  currentFloor: number
  currentStatus: string
  moveTimePerFloor: number
  relaxTime: number
  moveDirection: string | null = null
  goalFloor: number | null = null
  callStack: number[] = []

  constructor (props: IElevatorInitProps) {
    const { travelTimePerFloor, relaxTime, status, floor } = props
    this.moveTimePerFloor = travelTimePerFloor || 1000
    this.relaxTime = relaxTime || 3000
    this.currentStatus = status || elevatorStatuses.FREE
    this.currentFloor = floor || 1
    this.id = Date.now()
  }

  get difference () {
    if (this.goalFloor === null) return 0
    return this.goalFloor - this.currentFloor
  }

  addFloorToCallStack (floor: number) {
    if (floor === this.currentFloor && this.currentStatus === elevatorStatuses.FREE) return
    const index = this.callStack.indexOf(floor)
    if (index >= 0) return
    this.callStack.push(floor)
    if (this.currentStatus === elevatorStatuses.FREE) {
      this.setGoalFloor(this.callStack[0])
    }
  }

  setGoalFloor (floor: number) {
    console.log('setGoalFloor', floor)
    this.goalFloor = floor
    this.moveToGoalFloor().finally()
  }

  async moveToGoalFloor () {
    this.startMoving()
    while (this.difference !== 0) {
      await this.move()
    }
    await this.endMoving()
  }

  startMoving () {
    console.log('startMoving')
    if (this.callStack.length === 0) return
    this.currentStatus = elevatorStatuses.MOVING
  }

  async move () {
    console.log('move', this.difference, this.currentFloor, this.goalFloor, this.moveDirection, this.currentStatus)
    if (this.difference > 0) {
      await this.moveUp()
    } else {
      await this.moveDown()
    }

  }

  async moveUp () {
    this.moveDirection = moveDirections.UP
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentFloor++
        resolve('')
      }, this.moveTimePerFloor)
    })
  }

  async moveDown () {
    this.moveDirection = moveDirections.DOWN
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentFloor--
        resolve('')
      }, this.moveTimePerFloor)
    })
  }

  async endMoving () {
    this.currentStatus = elevatorStatuses.RELAX
    this.moveDirection = null
    this.goalFloor = null
    this.callStack.splice(0, 1)
    await this.endRelaxing()
  }

  async endRelaxing () {
    return await new Promise((resolve) => {
      setTimeout(() => {
        if (this.callStack.length > 0) {
          this.setGoalFloor(this.callStack[0])
        } else {
          this.currentStatus = elevatorStatuses.FREE

        }
        resolve('')
      }, this.relaxTime)
    })
  }
}