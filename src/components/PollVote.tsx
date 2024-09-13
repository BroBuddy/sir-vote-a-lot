import usePollStore from '@/store/pollStore'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import { Button } from './ui/button'
import React from 'react'

const pollVoteSchema = z.object({
    option: z.string(),
})

const PollVote = () => {
    const { question, options, voteOption } = usePollStore((state) => ({
        question: state.question,
        options: state.options,
        setQuestion: state.setQuestion,
        setOptions: state.setOptions,
        voteOption: state.voteOption,
    }))

    const pollVote = useForm<z.infer<typeof pollVoteSchema>>({
        resolver: zodResolver(pollVoteSchema),
    })

    function onSubmit(values: z.infer<typeof pollVoteSchema>) {
        voteOption(values.option)
    }

    return (
        <>
            <Form {...pollVote}>
                <form
                    className="flex flex-col gap-5 h-full"
                    onSubmit={pollVote.handleSubmit(onSubmit)}
                >
                    <div className="mt-9 mx-10 font-bold text-white">
                        {question ||
                            'Please submit a new question with minimal two options available.'}
                    </div>

                    {options.length >= 1 && (
                        <>
                            <div className="mx-5 flex-grow">
                                <FormField
                                    control={pollVote.control}
                                    name="option"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    {options.map(
                                                        (
                                                            option: Option,
                                                            index: number
                                                        ) => {
                                                            return (
                                                                <React.Fragment
                                                                    key={index}
                                                                >
                                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                                        <FormControl>
                                                                            <RadioGroupItem
                                                                                checked={
                                                                                    field.value ===
                                                                                    option.id
                                                                                }
                                                                                className={`h-10 ${
                                                                                    field.value ===
                                                                                    option.id
                                                                                        ? 'bg-gray-900'
                                                                                        : 'bg-transparent'
                                                                                }`}
                                                                                value={
                                                                                    option.id
                                                                                }
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal text-white">
                                                                            {
                                                                                option.text
                                                                            }
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                </React.Fragment>
                                                            )
                                                        }
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-5 mx-5 flex justify-end">
                                <Button type="submit">Vote</Button>
                            </div>
                        </>
                    )}
                </form>
            </Form>
        </>
    )
}

export default PollVote
