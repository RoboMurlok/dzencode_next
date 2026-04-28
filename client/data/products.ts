import { Product } from "../types/product";

export const products: Product[] = [
    {
        id: 1,
        serialNumber: 1234,
        isNew: true,
        photo: "/products/monitor.png",
        title: "EIZO FlexScan EV2781 Black (EV2781-BK)",
        type: "монитор",
        specification: "новый",
        guarantee: {
            start: "2017-06-29 12:09:33",
            end: "2017-06-29 12:09:33",
        },
        prices: [
            { value: 100, symbol: "USD", isDefault: false },
            { value: 2600, symbol: "UAH", isDefault: true },
        ],
        incoming: "приход 1",
        group: "группа 1",
        person: "персона 1",
        order: 1,
        date: "2017-06-29 12:09:33",
    }, {
        id: 2,
        serialNumber: 1234,
        isNew: true,
        photo: "/products/monitor.png",
        title: "EIZO FlexScan EV2781 Black (EV2781-BK)",
        type: "монитор",
        specification: "новый",
        guarantee: {
            start: "2017-06-29 12:09:33",
            end: "2017-06-29 12:09:33",
        },
        prices: [
            { value: 150, symbol: "USD", isDefault: false },
            { value: 2800, symbol: "UAH", isDefault: true },
        ],
        incoming: "приход 1",
        group: "группа 1",
        person: "персона 1",
        order: 1,
        date: "2017-06-29 12:09:33",
    }, {
        id: 3,
        serialNumber: 1234,
        isNew: true,
        photo: "/products/monitor.png",
        title: "EIZO FlexScan EV2781 Black (EV2781-BK)",
        type: "телевизор",
        specification: "новый",
        guarantee: {
            start: "2017-06-29 12:09:33",
            end: "2017-06-29 12:09:33",
        },
        prices: [
            { value: 300, symbol: "USD", isDefault: false },
            { value: 2100, symbol: "UAH", isDefault: true },
        ],
        incoming: "приход 1",
        group: "группа 2",
        person: "",
        order: 2,
        date: "2017-06-29 12:09:33",
    }, {
        id: 4,
        serialNumber: 1234,
        isNew: false,
        photo: "/products/monitor.png",
        title: "EIZO FlexScan EV2781 Black (EV2781-BK)",
        type: "монитор",
        specification: "новый",
        guarantee: {
            start: "2017-06-29 12:09:33",
            end: "2017-06-29 12:09:33",
        },
        prices: [
            { value: 200, symbol: "USD", isDefault: false },
            { value: 3400, symbol: "UAH", isDefault: true },
        ],
        incoming: "приход 1",
        group: "группа 1",
        person: "",
        order: 1,
        date: "2017-06-29 12:09:33",
    }, {
        id: 5,
        serialNumber: 1234,
        isNew: true,
        photo: "/products/monitor.png",
        title: "EIZO FlexScan EV2781 Black (EV2781-BK)",
        type: "телевизор",
        specification: "б/у",
        guarantee: {
            start: "2017-06-29 12:09:33",
            end: "2017-06-29 12:09:33",
        },
        prices: [
            { value: 100, symbol: "USD", isDefault: false },
            { value: 2900, symbol: "UAH", isDefault: true },
        ],
        incoming: "приход 3",
        group: "группа 1",
        person: "персона 1",
        order: 3,
        date: "2017-06-29 12:09:33",
    },]

// {
//     serial_number:123,
//      is_new:1,
//       photo:"/products/monitor.png"
//        title:"EIZO FlexScan EV2781 Black (EV2781-BK)",
//         type:"телевизор",
//          specification:"б/у",
//           guarantee_start:"2017-06-29 12:09:33"
//            guarantee_end:"2017-06-29 12:09:33",
//             price_usd:"100 USD",
//              price_uah:"2900 UAH",
//               incoming:"приход 3",
//                product_group:"группа 1",
//                 person:  "персона 1",
//                 order_id: 3,
//                 created_at:	"2017-06-29 12:09:33",

//     }