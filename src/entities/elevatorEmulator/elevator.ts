import { elevatorStatuses, moveDirections } from './emuns'
import { IElevator, TElevatorInitProps } from './elevator.interfaces'

export class Elevator implements IElevator {

  private _currentFloor: number
  private _currentStatus: string
  private _lastDifference: number | null = null

  private _moveDirection: string | null = null
  private _goalFloor: number | null = null
  public readonly _callStack: number[]

  public readonly id: number
  public readonly moveTimePerFloor: number
  public readonly relaxTime: number

  get moveDirection (): string | null {
    return this._moveDirection
  }

  get goalFloor (): number | null {
    return this._goalFloor
  }

  get callStack (): number[] {
    return this._callStack
  }

  get lastDifference (): number | null {
    return this._lastDifference
  }

  get currentStatus (): string {
    return this._currentStatus
  }

  get difference (): number {
    if (this._goalFloor === null) return 0
    return this._goalFloor - this._currentFloor
  }

  get currentFloor (): number {
    return this._currentFloor
  }

  constructor (props: TElevatorInitProps) {
    const { moveTimePerFloor, relaxTime, currentStatus, currentFloor, callStack, id, moveDirection } = props
    // props
    this.id = id || Date.now()
    this.relaxTime = relaxTime || 3000
    this.moveTimePerFloor = moveTimePerFloor || 1000
    // state
    this._currentFloor = currentFloor || 1
    this._currentStatus = currentStatus || elevatorStatuses.FREE
    this._callStack = callStack || []
    this._moveDirection = moveDirection || null
  }

  public addFloorToCallStack (floor: number) {
    if (floor === this._currentFloor && this._currentStatus === elevatorStatuses.FREE) return
    const index = this._callStack.indexOf(floor)
    if (index >= 0) return
    this._callStack.push(floor)
    if (this._currentStatus === elevatorStatuses.FREE) {
      this.setNextGoalFloor(floor)
    }
  }

  public initFromCache () {

    if (this._currentStatus === elevatorStatuses.RELAX) {
      setTimeout(() => {
        this._currentStatus = elevatorStatuses.FREE
        this.setNextGoalFloor()
      }, this.relaxTime)
    } else {
      this.setNextGoalFloor()
    }
  }

  private setNextGoalFloor (floor?: number | null): void {
    if (this._callStack.length === 0) return
    if (typeof floor === 'number') {
      this._goalFloor = floor
    } else {
      this._goalFloor = this._callStack[0]
    }
    this.moveToGoalFloor().finally()
  }

  private async moveToGoalFloor () {
    this.startMoving()
    while (this.difference !== 0) {
      await this.move()
    }
    await this.endMoving()
  }

  private startMoving () {
    if (this._callStack.length === 0) return
    this._currentStatus = elevatorStatuses.MOVING
    this._lastDifference = Math.abs(this.difference)
  }

  private async move () {
    if (this.difference > 0) {
      await this.moveUp()
    } else {
      await this.moveDown()
    }
  }

  private async moveUp () {
    this._moveDirection = moveDirections.UP
    return new Promise((resolve) => {
      setTimeout(() => {
        this._currentFloor++
        resolve('')
      }, this.moveTimePerFloor)
    })
  }

  private async moveDown () {
    this._moveDirection = moveDirections.DOWN
    return new Promise((resolve) => {
      setTimeout(() => {
        this._currentFloor--
        resolve('')
      }, this.moveTimePerFloor)
    })
  }

  private async endMoving () {
    this._currentStatus = elevatorStatuses.RELAX
    this._moveDirection = null
    this._goalFloor = null
    this._callStack.splice(0, 1)
    await this.endRelaxing()
  }

  private async endRelaxing () {
    return await new Promise((resolve) => {
      setTimeout(() => {
        if (this._callStack.length > 0) {
          this.setNextGoalFloor()
        } else {
          this._currentStatus = elevatorStatuses.FREE
        }
        resolve('')
      }, this.relaxTime)
    })
  }

}