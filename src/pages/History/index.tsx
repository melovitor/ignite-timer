import { useContext } from 'react'
import {
  ClearButton,
  HistoryContainer,
  HistoryList,
  Status,
  ClearContainer,
} from './styles'
import { CyclesContext } from '../../contexts/CycleContext'
import ptBR from 'date-fns/locale/pt-BR'
import { formatDistanceToNow } from 'date-fns'
import { TrashSimple } from 'phosphor-react'

export function History() {
  const { cycles } = useContext(CyclesContext)

  function handleClearStorage() {
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', '')
  }

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} Minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluido</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">Em amdamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
      <ClearContainer>
        <a href="/">
          <ClearButton
            disabled={cycles.length < 1}
            onClick={handleClearStorage}
          >
            <TrashSimple size={20} />
            Limpar histórico
          </ClearButton>
        </a>
      </ClearContainer>
    </HistoryContainer>
  )
}
