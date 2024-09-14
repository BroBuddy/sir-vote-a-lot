import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import React from 'react'
import { FormItem, FormControl, FormLabel } from './ui/form'

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
                            <FormItem className="flex relative items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem
                                        checked={field.value === option.id}
                                        className={`h-10 border-1 border-gray-900 ${
                                            field.value === option.id
                                                ? 'bg-gray-900'
                                                : 'bg-transparent'
                                        }`}
                                        value={option.id}
                                    />
                                </FormControl>

                                <FormLabel className="font-normal text-white">
                                    {option.text}
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
