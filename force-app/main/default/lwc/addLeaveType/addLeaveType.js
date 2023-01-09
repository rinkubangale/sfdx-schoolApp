import {
  LightningElement,
  api,
  track
} from 'lwc';

export default class AddLeaveType extends LightningElement {

  @api fields;
  @track headTitle = "Add Leave Type";
  @api objectName;
  @api subHeadTitle = "Add New Leave Types here";
  @track allFields;
  @track isLoading = false;

  @track isModalOpen = false;

  openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isModalOpen = true;
  }
  closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
  }
  get options1() {
    return [{
        label: `Don't Count as Leave`,
        value: 'option1'
      },

    ];
  }
  get options2() {
    return [{
        label: 'Count as Leave',
        value: 'option2'
      },

    ];
  }
  get options3() {
    return [{
        label: `Don't Count as Holiday`,
        value: 'option1'
      },

    ];
  }
  get options4() {
    return [{
        label: 'Count as Holiday',
        value: 'option2'
      },

    ];
  }
  get options5() {
    return [{
      label: '0',
      value: 'option0'
    }, {
      label: '1',
      value: 'option1'
    }, {
      label: '2',
      value: 'option2'
    }, {
      label: '3',
      value: 'option3'
    }, {
      label: '4',
      value: 'option4'
    }, {
      label: '5',
      value: 'option5'
    }, {
      label: '6',
      value: 'option6'
    }, {
      label: '7',
      value: 'option7'
    }, {
      label: '8',
      value: 'option8'
    }, {
      label: '9',
      value: 'option9'
    }, {
      label: '10',
      value: 'option10'
    }, {
      label: '11',
      value: 'option11'
    }, {
      label: '12',
      value: 'option12'
    }];
  }

  get options7() {
    return [{
        label: `Don't Allow`,
        value: 'option1'
      },

    ];
  }
  get options8() {
    return [{
        label: 'Allow',
        value: 'option2'
      },

    ];
  }
  get options9() {
    return [{
        label: 'Allow until current year leave limit',
        value: 'option1'
      },

    ];
  }
  get options10() {
    return [{
        label: 'Allow without limits',
        value: 'option2'
      },

    ];
  }
  get options11() {
    return [{
        label: 'Allow without limit and mark as LOP',
        value: 'option3'
      },

    ];
  }
  get options12() {
    return [{
        label: 'Day(s)',
        value: 'option1'
      }, {
        label: 'Month(s)',
        value: 'option2'
      }, {
        label: 'Year(s)',
        value: 'option3'
      },

    ];
  }
  get options13() {
    return [{
        label: 'Yearly',
        value: 'option1'
      }, {
        label: 'Half-Yearly',
        value: 'option2'
      }, {
        label: 'Quarterly',
        value: 'option3'
      }, {
        label: 'Monthly',
        value: 'option4'
      }

    ];
  }
  get options14() {
    return [{
        label: 'Carry forward',
        value: 'option1'
      }, {
        label: 'Carry forward with expiry',
        value: 'option2'
      }

    ];
  }
  get options15() {
    return [{
        label: 'Male',
        value: 'option1'
      }, {
        label: 'Female',
        value: 'option2'
      }, {
        label: 'Other',
        value: 'option3'
      }

    ];
  }
  get options16() {
    return [{
        label: 'Married',
        value: 'option1'
      }, {
        label: 'Unmarried',
        value: 'option2'
      }

    ];
  }
  get options17() {
    return [{
        label: 'Staff',
        value: 'option1'
      }, {
        label: 'Contractors',
        value: 'option2'
      }, {
        label: 'Students',
        value: 'option3'
      }

    ];
  }

  options = [{
      "label": "1",
      "value": "1"
    },
    {
      "label": "U-KG",
      "value": "U-KG"
    },
  ]

  get statusOptions() {
    return [{
        label: 'Active',
        statusValue: 'Active'
      },
      {
        label: 'Inactive',
        statusValue: 'Inactive'
      },
    ];
  }



  get optionss() {
    return [{
        label: 'Full Day',
        values: 'fullDay'
      },
      {
        label: 'Half Day',
        values: 'halfDay'
      },
    ];
  }



  get btnLabel() {
    return this.headTitle;
  }

  @track assignOptions = [{
      label: 'Value 1',
      value: 'Value 1'
    },
    {
      label: 'Value 2',
      value: 'Value 2'
    },
    {
      label: 'Value 3',
      value: 'Value 3'
    },
  ];

  handleAssignClassOptionsChange(event) {
    let value = event.detail.value;
    //do something with the value
  }

  get assignClassOptions() {
    return this.assignOptions;
  }

  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", {
      detail: false
    }));
  }

  handleLoading() {
    this.isLoading = false;
  }



}