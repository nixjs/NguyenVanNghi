import * as z from 'zod'
import ValidatorConfig from './validator'

export const zRequiredValidator = (message?: string) => z.string().nonempty(message)

export const FormSchema = z.object({
    from: zRequiredValidator(ValidatorConfig.Schema.fromAmount.required?.message),
    to: zRequiredValidator(ValidatorConfig.Schema.toAmount.required?.message),
    fixed: z.boolean().default(false),
})
