export interface IElevator {
  // props
  readonly id: number
  readonly moveTimePerFloor: number
  readonly relaxTime: number

  // state
  readonly moveDirection: string | null
  readonly goalFloor: number | null
  readonly callStack: number[]
  readonly currentStatus: string
  readonly currentFloor: number

  //methods
  addFloorToCallStack: (floor: number) => void
  initFromCache: () => void
}

export type TElevatorInitProps = {

  // props
  id?: number
  relaxTime?: number
  moveTimePerFloor?: number

  // state
  currentFloor?: number
  currentStatus?: string
  callStack?: number[]
  moveDirection?: string
}
