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
import {
    CHART_AXIS_COLOR,
    CHART_BG_COLORS,
    CHART_BORDER_WIDTH,
    CHART_SHOW_LEGEND,
} from '@/constants'

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

    /* eslint-disable-next-line */
    const chartData: ChartData | any = {
        labels: options.map((option: Option) => option.text),
        datasets: [
            {
                label: options.map((option: Option) => option.text),
                data: options.map((option: Option) => option.votes),
                backgroundColor: CHART_BG_COLORS,
                borderwidth: CHART_BORDER_WIDTH,
            },
        ],
    }

    /* eslint-disable-next-line */
    const chartConfig: ChartOptions | any = {
        plugins: {
            legend: {
                display: CHART_SHOW_LEGEND,
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
                    color: CHART_AXIS_COLOR,
                },
            },
            x: {
                ticks: {
                    color: CHART_AXIS_COLOR,
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
