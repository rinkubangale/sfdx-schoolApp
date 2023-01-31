import { LightningElement, track } from "lwc";

export default class StudentCurricular extends LightningElement {
  get rotateIconEng() {
    return this.viewEngLesson ? "rotateIcon" : "breadcrumIcon";
  }
  get rotateIconHin() {
    return this.viewHindiLesson ? "rotateIcon" : "breadcrumIcon";
  }
  get rotateIconTam() {
    return this.viewTamilLesson ? "rotateIcon" : "breadcrumIcon";
  }
  get rotateIconEVS() {
    return this.viewEvsLesson ? "rotateIcon" : "breadcrumIcon";
  }
  get rotateIconCS() {
    return this.viewCsLesson ? "rotateIcon" : "breadcrumIcon";
  }

  @track viewCurrSetup;
  handleCurrSetup() {
    this.viewCurrSetup = !this.viewCurrSetup;
  }

  @track arrLessons = [
    {
      lesson: "Lesson 1",
      noClass: "10",
      status: "Not Started",
      sDate: "12/27/2022",
      eDate: "12/27/2022"
    },
    {
      lesson: "Lesson 2",
      noClass: "10",
      status: "Not Started",
      sDate: "12/27/2022",
      eDate: "12/27/2022"
    },
    {
      lesson: "Lesson 3",
      noClass: "10",
      status: "Not Started",
      sDate: "12/27/2022",
      eDate: "12/27/2022"
    },
    {
      lesson: "Lesson 4",
      noClass: "10",
      status: "Not Started",
      sDate: "12/27/2022",
      eDate: "12/27/2022"
    },
    {
      lesson: "Lesson 5",
      noClass: "10",
      status: "Not Started",
      sDate: "12/27/2022",
      eDate: "12/27/2022"
    },
    {
      lesson: "Lesson 6",
      noClass: "10",
      status: "Not Started",
      sDate: "12/27/2022",
      eDate: "12/27/2022"
    }
  ];

  @track viewEngLesson;
  @track viewHindiLesson;
  @track viewTamilLesson;
  @track viewEvsLesson;
  @track viewCsLesson;
  handleShowLesson(e) {
    console.log(e.target.name);
    switch (e.target.name) {
      case "hindi":
        this.viewHindiLesson = !this.viewHindiLesson;
        this.viewTamilLesson = false;
        this.viewEvsLesson = false;
        this.viewCsLesson = false;
        this.viewEngLesson = false;
        break;
      case "tamil":
        this.viewTamilLesson = !this.viewTamilLesson;
        this.viewCsLesson = false;
        this.viewEngLesson = false;
        this.viewEvsLesson = false;
        this.viewHindiLesson = false;
        break;
      case "evs":
        this.viewEvsLesson = !this.viewEvsLesson;
        this.viewCsLesson = false;
        this.viewEngLesson = false;
        this.viewHindiLesson = false;
        this.viewTamilLesson = false;
        break;
      case "cs":
        this.viewCsLesson = !this.viewCsLesson;
        this.viewEngLesson = false;
        this.viewEvsLesson = false;
        this.viewHindiLesson = false;
        this.viewTamilLesson = false;
        break;
      default:
        this.viewEngLesson = !this.viewEngLesson;
        this.viewCsLesson = false;
        this.viewEvsLesson = false;
        this.viewHindiLesson = false;
        this.viewTamilLesson = false;
        break;
    }
  }
}
