import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import React from 'react'
import { FormItem, FormControl, FormLabel } from './ui/form'
import { POLL_TEXT_LENGTH } from '@/constants'

type VoteField = {
    name: string
    value: string
    onBlur: () => void
    onChange: (value: string) => void
}

const VoteGroup = (items: { options: Option[]; field: VoteField }) => {
    const { options, field } = items

    return (
        <FormControl>
            <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col gap-3"
            >
                {options.map((option: Option, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <FormItem
                                data-testid="vote-list-items"
                                className="flex relative items-center space-x-3 space-y-0"
                            >
                                <FormControl>
                                    <RadioGroupItem
                                        checked={field.value === option.id}
                                        className={`h-10 border-1 border-white ${
                                            field.value === option.id
                                                ? 'bg-white/70'
                                                : 'bg-transparent'
                                        }`}
                                        value={option.id}
                                    />
                                </FormControl>

                                <FormLabel className="font-normal text-white cursor-pointer">
                                    {option.text.length <= POLL_TEXT_LENGTH
                                        ? option.text
                                        : `${option.text.substring(0, POLL_TEXT_LENGTH)}...`}
                                </FormLabel>
                            </FormItem>
                        </React.Fragment>
                    )
                })}
            </RadioGroup>
        </FormControl>
    )
}

export default VoteGroup
