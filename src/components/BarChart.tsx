import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Chart,
    ChartData,
    ChartOptions,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type TooltipData = {
    chart: Chart
    label: string
    dataIndex: number
    datasetIndex: number
    raw: number
    formattedValue: string
    parsed: { x: number; y: number }
    element: BarElement
}

const BarChart = (items: { options: Option[] }) => {
    const { options } = items

    const backgroundColors: string[] = [
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
    const borderWidth: number = 1
    const showLegend: boolean = false
    const axisColor: string = '#fff'

    /* eslint-disable-next-line */
    const chartData: ChartData | any = {
        labels: options.map((option: Option) => option.text),
        datasets: [
            {
                label: options.map((option: Option) => option.text),
                data: options.map((option: Option) => option.votes),
                backgroundColor: backgroundColors,
                borderWidth,
            },
        ],
    }

    /* eslint-disable-next-line */
    const chartConfig: ChartOptions | any = {
        plugins: {
            legend: {
                display: showLegend,
            },
            tooltip: {
                callbacks: {
                    label: (data: TooltipData) => {
                        return 'Votes:' + data.formattedValue
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    color: axisColor,
                },
            },
            x: {
                ticks: {
                    color: axisColor,
                },
            },
        },
    }

    return (
        /* eslint-disable */
        <Bar
            data={chartData as ChartData | any}
            options={chartConfig as ChartOptions | any}
        />
    )
}

export default BarChart
