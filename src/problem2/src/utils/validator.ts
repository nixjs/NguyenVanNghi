import { BaseMessage, Define, flattenSchemaValue } from '@nixjs23n6/ts-validator-schema'

namespace ValidatorConfig {
    export const BaseMessageErrorPrefix = 'msg_error'
    export type Key = 'fromAmount' | 'toAmount'
    export type Message = BaseMessage
    export const Schema: Define<Key, Message> = {
        fromAmount: {
            required: { message: 'default_required' },
        },
        toAmount: {
            required: { message: 'default_required' },
        },
    }
    export const FlattenSchema = flattenSchemaValue(Schema, BaseMessageErrorPrefix)
}

export default ValidatorConfig
