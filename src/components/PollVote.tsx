import usePollStore from '@/store/pollStore'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem } from './ui/form'
import Button from './ui/button'
import VoteGroup from './VoteGroup'
import { EMPTY_VOTE_MESSAGE } from '@/constants'

const pollVoteSchema = z.object({
    option: z.string(),
})

const PollVote = () => {
    const { question, options, voteOption } = usePollStore((state) => ({
        question: state.question,
        options: state.options,
        voteOption: state.voteOption,
    }))

    const pollVote = useForm<z.infer<typeof pollVoteSchema>>({
        resolver: zodResolver(pollVoteSchema),
    })

    const isValidVote = pollVote.formState.isValid

    const onSubmit = (values: z.infer<typeof pollVoteSchema>) => {
        try {
            voteOption(values.option)
        } catch (error) {
            if (error instanceof Error) console.log('Error', error)
        }
    }

    return (
        <>
            <Form {...pollVote}>
                <form
                    className="flex flex-col gap-5 h-full"
                    onSubmit={pollVote.handleSubmit(onSubmit)}
                >
                    <div className="mt-9 mx-10 font-bold text-white">
                        {question || EMPTY_VOTE_MESSAGE}
                    </div>

                    {options.length >= 1 && (
                        <>
                            <div className="mx-5 flex-grow">
                                <FormField
                                    control={pollVote.control}
                                    name="option"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <VoteGroup
                                                options={options as Option[]}
                                                field={field}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-5 mx-5 flex justify-end">
                                <Button type="submit" disabled={!isValidVote}>
                                    Vote
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </Form>
        </>
    )
}

export default PollVote
