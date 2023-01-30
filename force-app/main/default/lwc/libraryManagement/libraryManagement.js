import {
    LightningElement
} from 'lwc';


const columns = [{
        label: "Book Number",
        fieldName: "bookNumber"
    },
    {
        label: "Bar Code",
        fieldName: "barCode"
    },
    {
        label: "Book Title",
        fieldName: "bookTitle"
    },
    {
        label: "Quantity",
        fieldName: "quantity"
    },
    {
        label: "Author Name",
        fieldName: "authorName"
    },
]


const actions = [{
    label: 'Book Return',
    name: 'return',
    iconName: "utility:redo",
    alternativeText: "return",
    title: "return",
}];


const columns11 = [{
        label: "User",
        fieldName: "userName"
    }, {
        label: "Book Title",
        fieldName: "bookTitle"
    },
    {
        label: "Issue Date",
        fieldName: "issueDate"
    },
    {
        label: "Due Date",
        fieldName: "dueDate"
    },
    {
        label: "Return Date",
        fieldName: "returnDate"
    },
    {
        label: "No of Days Taken",
        fieldName: "daysTaken"
    },
    {
        label: "Status",
        fieldName: "status"
    },
    {
        label: "Late Fee",
        fieldName: "lateFee"
    },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions
        }
    },
]


const actions22 = [{
    label: "edit",
    name: "edit",
    iconName: "utility:edit",
    alternativeText: "edit",
    title: "edit"
},
{
    label: "Delete",
    name: "delete",
    iconName: "utility:delete",
    alternativeText: "Delete",
    title: "Delete"
}];


const columns22 = [{
        label: "Book Number",
        fieldName: "bookNumber"
    }, {
        label: "Book Title",
        fieldName: "bookTitle"
    },
    {
        label: "Author",
        fieldName: "authorName"
    },
    {
        label: "Tags",
        fieldName: "tags"
    },
    {
        label: "Entry Date",
        fieldName: "entryDate"
    },
    {
        label: "Status",
        fieldName: "status"
    },
    {
        label: "Quantity",
        fieldName: "quantity"
    },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions22
        }
    },
]

export default class LibraryManagement extends LightningElement {
    columns = columns;
    columns11 = columns11;
    columns22 = columns22;

    dataList = [{
            bookNumber: "FIC0019",
            quantity: "01",
            barCode: "sku-fic0019",
            bookTitle: "Five point Someone",
            authorName: "Chetan Bhagat"
        },
        {
            bookNumber: "FIC00109",
            quantity: "02",
            barCode: "sku-fic00109",
            bookTitle: "Noddy: The Treasurer",
            authorName: "Enid Blyton"
        }, {
            bookNumber: "BIO00358",
            quantity: "01",
            barCode: "sku-bio00358",
            bookTitle: "BOSE: An Indian Samurai",
            authorName: "Maj Gen GD Bakshi"
        }
    ];


    dataList11 = [{
        userName: "Divya",
        bookTitle: "Noddy",
        issueDate: "20-Jan-2023",
        dueDate: "01-Feb-2023",
        returnDate: "28-Jan-2023",
        daysTaken: "08",
        status: "To Return",
        lateFee: "0",
    }];

    dataList22 = [{
            bookNumber: "BIO00358",
            bookTitle: "BOSE: An Indian Samurai",
            authorName: "Maj Gen GD Bakshi",
            tags: "Biography",
            entryDate: "23-Jan-2018",
            status: "Available",
            quantity: "5",

        },
        {
            bookNumber: "FIC0019",
            bookTitle: "Five point Someone",
            authorName: "Chetan Bhagat",
            tags: "Fiction",
            entryDate: "23-Oct-2012",
            status: "Available",
            quantity: "5",

        }, {
            bookNumber: "FIC00109",
            bookTitle: "Noddy: The Treasurer",
            authorName: "Enid Blyton",
            tags: "Fiction",
            entryDate: "19-June-2008",
            status: "Available",
            quantity: "5",

        },
    ]

}