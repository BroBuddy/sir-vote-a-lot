import { create, StoreApi, UseBoundStore } from 'zustand'
import zustymiddlewarets from 'zustymiddlewarets'

declare global {
    interface Window {
        store: UseBoundStore<StoreApi<State & Actions>>
    }
}

type State = {
    question: string
    options: Option[]
}

type Actions = {
    setQuestion: (question: string) => void
    setOptions: (options: Option[]) => void
    addOption: (optionText: string) => void
    removeOption: (optionText: string) => void
    voteOption: (optionID: string) => void
    resetPoll: () => void
}

const getCurrentTimestamp = (): string => {
    return String(new Date().getTime())
}

const usePollStore = create<State & Actions>(
    zustymiddlewarets((set, get) => ({
        question: 'What is the value of π?',
        options: [
            { id: '1726240953842', text: '3.14', votes: 4 },
            { id: '1726240953843', text: '3.1416', votes: 3 },
            { id: '1726240953844', text: '3.14159264', votes: 4 },
        ],
        setQuestion: (question: string) => {
            set(() => ({
                question,
            }))
        },
        setOptions: (options: Option[]) => {
            set(() => ({
                options,
            }))
        },
        addOption: (optionText: string) => {
            const options = get().options as Option[]

            const newOption = {
                id: getCurrentTimestamp(),
                text: optionText,
                votes: 0,
            }

            set(() => ({
                options: [...options, newOption],
            }))
        },
        removeOption: (optionText: string) => {
            const newOptions = get().options as Option[]
            const optionIndex = newOptions.findIndex(
                (option) => option.text === optionText
            )

            newOptions.splice(optionIndex, 1)

            set(() => ({
                options: [...newOptions],
            }))
        },
        voteOption: (optionId: string) => {
            const newOptions = get().options as Option[]
            const optionIndex = newOptions.findIndex(
                (option) => option.id === optionId
            )

            newOptions[optionIndex] = {
                id: newOptions[optionIndex].id,
                text: newOptions[optionIndex].text,
                votes: newOptions[optionIndex].votes + 1,
            }

            set(() => ({
                options: [...newOptions],
            }))
        },
        resetPoll: () => {
            set(() => ({
                question: '',
                options: [],
            }))
        },
    }))
)

window.store = usePollStore
export default usePollStore
