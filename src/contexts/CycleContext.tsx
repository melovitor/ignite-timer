import { ReactNode, createContext, useState, useReducer } from 'react'
import { Cycle, CyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptedCurrentCucleAction,
  markCurrentCycleAction,
} from '../reducers/cycles/actions'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number

  markCurrentCycleAsFinished: () => void
  interruptCurrentCycle: () => void
  crateNewCicle: (data: CreateCycleData) => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispath] = useReducer(CyclesReducer, {
    cycles: [
      /* Colocar o valor inicial do localStorage aqui */
    ],
    activeCycleId: null,
  })

  const { activeCycleId, cycles } = cyclesState
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispath(markCurrentCycleAction())
    setAmountSecondsPassed(0)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function crateNewCicle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispath(addNewCycleAction(newCycle))
  }

  function interruptCurrentCycle() {
    document.title = `Timer`
    dispath(interruptedCurrentCucleAction())
    setAmountSecondsPassed(0)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        crateNewCicle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
