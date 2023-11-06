'use client'

import { type Address, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'

import { DAOSimulationContract } from './contracts'

export function DisplayPools() {
  return (
    <div>
      <Pools />
    </div>
  )
}


function Pools() {

  const { data: lengthOfPoll, isFetched: lenngthIsFetched, error: pollsLengthError } = useContractRead({
    ...DAOSimulationContract,
    functionName: 'getSizeOfPools',
  });



  const { data: firstPollData, isFetched, error: gettingPollError } = useContractRead({
    ...DAOSimulationContract,
    functionName: 'getPoll',
    args: [BigInt(1)],
  });



  const { write, data, error: votingError, isLoading, isError } = useContractWrite({
    ...DAOSimulationContract,
    functionName: 'voteOnPoll',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  const handleVote = (choice) => {
    write({
      args: [BigInt(1), BigInt(choice)],
    })

  };

  if (firstPollData) {
    const [index, startTimestamp, finalTimestamp, description, choices, answers, voters] = firstPollData;
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="border border-black p-4 m-4 rounded-lg bg-sand text-center">
          <h2 className="text-blue-600">{description}</h2>
          <p>Poll Index: {String(index)}</p>
          <p>Starting Timestamp: {new Date(Number(startTimestamp) * 1000).toLocaleString()}</p>
          <p>Final Timestamp: {new Date(Number(finalTimestamp) * 1000).toLocaleString()}</p>
          <div className="mt-4">
            <h3 className="text-blue-600">Choices:</h3>
            <div className="space-y-2">
              {choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleVote(i)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {choice}
                  <span className="ml-2 text-sm">({Number(answers[i])})</span>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4">Voters: {voters.join(', ')}</p>
        </div>
      </div>


    );
  }
  else return (
    <div>
      No FirstPollData
    </div>
  )








}
