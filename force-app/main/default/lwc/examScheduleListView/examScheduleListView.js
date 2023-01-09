import {
    LightningElement,
    track
} from 'lwc';
const actions = [{
        label: 'Edit',
        name: 'Edit'
    },
    {
        label: 'Delete',
        name: 'delete'
    }
];


const columns = [{
        label: 'Exam Name',
        fieldName: 'ExamName',
        type: 'button',
        typeAttributes: {
            label: {
                fieldName: 'ExamName'
            },
            variant: 'base'
        },
        wrapText: true
    },
    {
        label: 'Start Date',
        fieldName: 'StartDate',
        type: 'date'
    },
    {
        label: 'End Date',
        fieldName: 'EndDate',
        type: 'date'
    },
    {
        label: 'Class',
        fieldName: 'Class',
        type: 'text'
    },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions
        },
    }
];


export default class ExamScheduleListView extends LightningElement {
    @track listCalendarHomePage = true;
    @track calendarView = true;
    @track viewExamSchedulePage = false;
    @track editExamSchedulePage = false;
    @track deleteWindow = false;
    @track createRecord = false;


    data = [{
            ExamName: "Exam1",
            StartDate: "12/12/12",
            EndDate: "12/12/12",
            Class: "LKG"
        },
        {
            ExamName: "Exam2",
            StartDate: "11/11/11",
            EndDate: "11/11/11",
            Class: "UKG"
        }
    ];
    data1 = [{
            ExamName: "Exam1",
            StartDate: "12/12/12",
            EndDate: "12/12/12",
            Class: "LKG"
        },
        {
            ExamName: "Exam2",
            StartDate: "11/11/11",
            EndDate: "11/11/11",
            Class: "UKG"
        }
    ];
    columns = columns;


    openCreateRecords() {
        this.createRecord = true;
        this.listCalendarHomePage = false;

    }
    closeCreateRecords() {
        this.createRecord = false;
        this.listCalendarHomePage = true;
    }

    handleView() {
        this.calendarView = !this.calendarView;
    }



    get buttonLabel() {
        return this.calendarView ? "List" : "Calendar";
    }

    closeViewExamSchedule() {
        this.viewExamSchedulePage = false;
        this.listCalendarHomePage = true;
        this.calendarView = false;
    }

    closeEditExamSchedule() {
        this.editExamSchedulePage = false;
        this.listCalendarHomePage = true;
        this.calendarView = false;
    }

    closeDeleteWindow() {
        this.deleteWindow = false;
        this.listCalendarHomePage = true;
        this.calendarView = false;
    }

    handleRowAction(event) {
        const rowDel = [];

        if (event.detail.action.name === "Edit") {
            this.editExamSchedulePage = true;
            this.listCalendarHomePage = false;


        } else if (event.detail.action.name === "delete") {
            this.deleteWindow = true;
            this.listCalendarHomePage = false;

        } else {
            this.viewExamSchedulePage = true;
            this.listCalendarHomePage = false;
            this.editExamSchedulePage = false;
        }
    }

}