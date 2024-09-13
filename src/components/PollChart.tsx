import usePollStore from '@/store/pollStore'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const backgroundColors = [
    '#A7C7E7',
    '#6082B6',
    '#ADD8E6',
    '#B6D0E2',
    '#87CEEB',
    '#89CFF0',
    '#5F9EA0',
    '#7393B3',
    '#6F8FAF',
    '#6495ED',
]

const PollChart = () => {
    const { question, options } = usePollStore((state) => ({
        question: state.question,
        options: state.options,
        setQuestion: state.setQuestion,
        setOptions: state.setOptions,
    }))

    const totalVotes = options.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.votes
    }, 0)

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (data: any) => {
                        return 'Votes:' + data.formattedValue
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    color: '#fff',
                },
            },
            x: {
                ticks: {
                    color: '#fff',
                },
            },
        },
    }

    const data: any = {
        labels: options.map((item) => item.text),
        datasets: [
            {
                label: options.map((item) => item.text),
                data: options.map((item) => item.votes),
                backgroundColor: backgroundColors,
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="flex flex-col gap-5 h-full">
            <div className="font-bold mt-5 text-white">{question}</div>

            <div className="mx-5 flex-grow">
                <Bar data={data} options={chartOptions} />
            </div>

            <div className="flex ml-5 mb-5 text-white text-sm justify-start">
                Total votes: {totalVotes}
            </div>
        </div>
    )
}

export default PollChart
