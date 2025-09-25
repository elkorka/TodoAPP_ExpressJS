import { sculpt } from "@sonatel-os/json-sculpt"

export const mapUserData = (user) => {
    return sculpt.data({
        data: user,
        to: TEMPLATE
    })
}

const TEMPLATE = {
    address: '@link.address',
    infos: {
        name: '@link.name',
        email: '@link.email',
    },
    phone: {
        $map: '@link.phoneNumbers',
        $transform: {
            number: '@link.number::number',
            balance: {
                $op: 'formatCurrency',
                $from: '@link.balance',
                $args: {
                    locale: 'fr-FR',
                    currency: 'XOF'
                }
            }
        }
    }
}