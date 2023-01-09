import {
    LightningElement,
    api,
    track
} from 'lwc';

export default class AddAssignmentWireframe extends LightningElement {
    value = "in Progress";
    @api fields;
    @api headTitle = 'Add Assignment';
    @api objectName;

    @track allFields;
    @track isLoading = false;
    @track isModalOpen = false;
    @track openStudentsRadio = false;
    @track openClassRadio = false;
    @track openClassRoomsRadio = false;
    get btnLabel() {
        return this.headTitle;
    }

    handleModalChange() {
        this.dispatchEvent(new CustomEvent("close", {
            detail: false
        }));
    }

    get options1() {
        return [{
                label: '--None--',
                value: 'none'
            }, {
                label: 'Homework',
                value: 'homework'
            },
            {
                label: 'Quiz',
                value: 'quiz'
            },
            {
                label: 'Test',
                value: 'test'
            },
            {
                label: 'Online Class',
                value: 'onlineClass'
            },
            {
                label: 'Offline Class',
                value: 'offlineClass'
            },
            {
                label: 'Remedial',
                value: 'remedial'
            },
            {
                label: 'Worksheet',
                value: 'worksheet'
            },
            {
                label: 'Holiday Homework',
                value: 'holidayhomework'
            },

        ];
    }

    get options2() {
        return [{
                label: '--None--',
                value: 'none'
            }, {
                label: 'Science',
                value: 'science'
            },
            {
                label: 'Social Science',
                value: 'social'
            },
            {
                label: 'Maths',
                value: 'maths'
            },
            {
                label: 'Tamil',
                value: 'tamil'
            },
            {
                label: 'Hindi',
                value: 'hindi'
            },
        ]
    }


    get options3() {
        return [{
                label: '--None--',
                value: 'none'
            },
            {
                label: 'Online Submission',
                value: 'onlinesubmission'
            },
            {
                label: 'Hard Copy',
                value: 'hardCopy'
            },
            {
                label: 'URL Link',
                value: 'urlLink'
            },
            {
                label: 'Google Classroom',
                value: 'googleClassroom'
            },
        ]
    }

    get options4() {
        return [{
                label: 'Class',
                value: 'class'
            },

        ];
    }
    get options5() {
        return [{
                label: 'Classrooms',
                value: 'classrooms'
            },

        ];
    }
    get options6() {
        return [{
                label: 'Students',
                value: 'students'
            },

        ];
    }

    radiochange(e) {
        console.log('radiochange', JSON.stringify(e.target));
        if (e.target.value == "Student") {
            this.openClassRoomsRadio = false;
            this.openClassRadio = false;
            this.openStudentsRadio = true;
        } else if (e.target.value == "Class") {
            this.openStudentsRadio = false;
            this.openClassRoomsRadio = false;
            this.openClassRadio = true;
        } else {
            this.openClassRadio = false;
            this.openStudentsRadio = false;
            this.openClassRoomsRadio = true;
        }
    }


    closebtn() {
        this.dispatchEvent(new CustomEvent('close', {
            detail: false
        }))
    }
}