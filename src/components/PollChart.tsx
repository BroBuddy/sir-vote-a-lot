import usePollStore from '@/store/pollStore'
import BarChart from './BarChart'

const PollChart = () => {
    const { question, options } = usePollStore((state) => ({
        question: state.question,
        options: state.options,
    }))

    const totalVotes: number = options.reduce(
        (accumulator: number, currentValue: Option) => {
            return accumulator + currentValue.votes
        },
        0
    )

    return (
        <div className="flex flex-col gap-5 h-full">
            <div className="font-bold mt-9 text-white">{question}</div>

            <div className="mx-5 flex-grow">
                {options && <BarChart options={options as Option[]} />}
            </div>

            <div className="flex ml-5 mb-5 text-white text-sm justify-start">
                Total votes: {totalVotes}
            </div>
        </div>
    )
}

export default PollChart
