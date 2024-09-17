import { useFieldArray, useForm, UseFormProps } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import usePollStore from '@/store/pollStore'
import { useEffect } from 'react'
import Button from './ui/button'
import {
    POLL_MAX_OPTIONS,
    POLL_MIN_OPTIONS,
    POLL_MAX_LENGTH,
} from '@/constants'

const pollFormSchema = z.object({
    question: z.string(),
    options: z.array(
        z.object({
            id: z.string(),
            text: z.string().min(1).max(80),
            votes: z.number(),
        })
    ),
    newOption: z.string(),
})

type Option = z.infer<typeof pollFormSchema>['options'][number]

function useZodForm<TSchema extends z.ZodType>(
    props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
        schema: TSchema
    }
) {
    const form = useForm<TSchema['_input']>({
        ...props,
        resolver: zodResolver(props.schema, undefined),
    })

    return form
}

const PollForm = () => {
    const {
        question,
        options,
        setQuestion,
        setOptions,
        addOption,
        removeOption,
        resetPoll,
    } = usePollStore((state) => ({
        question: state.question,
        options: state.options,
        setQuestion: state.setQuestion,
        setOptions: state.setOptions,
        addOption: state.addOption,
        removeOption: state.removeOption,
        resetPoll: state.resetPoll,
    }))

    const pollForm = useForm<z.infer<typeof pollFormSchema>>({
        resolver: zodResolver(pollFormSchema),
    })

    const { handleSubmit, register, control, reset, watch, getValues } =
        useZodForm({
            schema: pollFormSchema,
            defaultValues: { options },
        })

    const { fields, remove } = useFieldArray({
        name: 'options',
        control,
    })

    const watchNewOption = watch('newOption')
    const isOptionAddable = fields.length >= POLL_MAX_OPTIONS || !watchNewOption
    const isOptionRemoveable = fields.length <= POLL_MIN_OPTIONS

    const onReset = () => {
        reset({ question: '', options: [] })
        resetPoll()
        onSubmit(getValues())
    }

    const onSubmit = (values: z.infer<typeof pollFormSchema>) => {
        setQuestion(values.question)
        setOptions(values.options)
    }

    const onAddOption = () => {
        const values = getValues()

        try {
            addOption(values.newOption)
        } catch (error) {
            if (error instanceof Error) console.log('Error', error)
        } finally {
            reset({ newOption: '' })
        }
    }

    const onRemoveOption = (option: Option, optionIndex: number) => {
        removeOption(option.text)
        remove(optionIndex)
    }

    useEffect(() => {
        reset({ question, options })
    }, [options, question, reset])

    return (
        <Form {...pollForm}>
            <form
                className="flex flex-col gap-5 p-5 items-center h-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex w-full">
                    <FormField
                        control={control}
                        name="question"
                        defaultValue={question}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        {...field}
                                        data-testid="poll-question"
                                        onKeyUp={handleSubmit(onSubmit)}
                                        maxLength={POLL_MAX_LENGTH}
                                        className="flex flex-grow w-full border-none bg-white/70"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col w-full gap-3">
                    {options &&
                        fields.map((option: Option, index: number) => {
                            return (
                                <div
                                    className="flex flex-row justify-between gap-2"
                                    data-testid="poll-list-items"
                                    key={index}
                                >
                                    <FormItem className="w-full">
                                        <Input
                                            {...register(
                                                `options.${index}.text` as const
                                            )}
                                            onKeyUp={handleSubmit(onSubmit)}
                                            placeholder="Type an answer..."
                                            defaultValue={option.text}
                                            className="border-none bg-white/70"
                                            maxLength={POLL_MAX_LENGTH}
                                        />
                                    </FormItem>

                                    <Button
                                        type="button"
                                        disabled={isOptionRemoveable}
                                        className="flex-none bg-transparent rounded-md p-4"
                                        onClick={() =>
                                            onRemoveOption(option, index)
                                        }
                                    >
                                        X
                                    </Button>
                                </div>
                            )
                        })}

                    {fields.length < POLL_MAX_OPTIONS && (
                        <div className="flex flex-row gap-2">
                            <FormItem className="w-full">
                                <Input
                                    {...register('newOption')}
                                    data-testid="poll-add-input"
                                    placeholder="Type an answer..."
                                    className="border-none bg-white/70"
                                />
                            </FormItem>

                            <Button
                                type="button"
                                disabled={isOptionAddable}
                                className="p-2"
                                onClick={onAddOption}
                            >
                                Add
                            </Button>
                        </div>
                    )}

                    <div className="flex flex-row gap-5"></div>
                </div>

                <div className="flex flex-row gap-5 w-full items-end justify-between">
                    <div className="text-white text-sm">
                        {fields.length}/{POLL_MAX_OPTIONS} possible answers
                    </div>

                    <div className="flex flex-row gap-4">
                        <Button
                            type="button"
                            className="bg-transparent"
                            onClick={onReset}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default PollForm
