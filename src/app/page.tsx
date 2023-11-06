
import { ConnectButton } from '../components/ConnectButton'
import { Connected } from '../components/Connected'
import { DisplayPools } from '../components/DisplayPools'
import { WatchContractEvents } from '../components/WatchContractEvents'
import { WriteContract } from '../components/WriteContract'

export function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        DAO Simulation
      </h1>

      <ConnectButton />

      <Connected>
        <DisplayPools />
        <br />
        <hr />
        <h2>Watch Contract Events</h2>
        <WatchContractEvents />
        <br />
        <hr />
        <h2>Write Contract</h2>
        <WriteContract />
      </Connected>
    </>
  )
}

export default Page
