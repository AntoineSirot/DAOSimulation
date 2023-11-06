'use client'

import { useState } from 'react'
import type { Log } from 'viem'
import { useContractEvent } from 'wagmi'

import { DAOSimulationContract } from './contracts'
import { stringify } from '../utils/stringify'

export function WatchContractEvents() {

  const [wagmiLogs, setWagmiLogs] = useState<Log[]>([])
  useContractEvent({
    ...DAOSimulationContract,
    eventName: 'Transfer',
    listener: (logs) => setWagmiLogs((x) => [...x, ...logs]),
  })

  return (
    <div>
      <details>
        <summary>{wagmiLogs.length} wagmi `Transfer`s logged</summary>
        {wagmiLogs
          .reverse()
          .map((log) => stringify(log))
          .join('\n\n\n\n')}
      </details>
    </div>
  )
}
