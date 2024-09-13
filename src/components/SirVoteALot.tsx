import PollChart from './PollChart'
import PollForm from './PollForm'
import PollVote from './PollVote'

const SirVoteALot = () => {
    return (
        <div className="flex flex-col w-screen">
            <div className="flex">
                <h1 className="text-3xl mx-5 mb-5">Sir Vote-a-lot</h1>
            </div>

            <div className="flex flex-row gap-5 mx-5">
                <div className="w-1/3 card rounded-xl">
                    <PollForm />
                </div>

                <div className="w-1/3 card rounded-xl">
                    <PollVote />
                </div>

                <div className="w-1/3 card rounded-xl">
                    <PollChart />
                </div>
            </div>
        </div>
    )
}

export default SirVoteALot
