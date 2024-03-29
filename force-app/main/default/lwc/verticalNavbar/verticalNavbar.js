import { LightningElement, track, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import Id from "@salesforce/user/Id";
import ProfileId from "@salesforce/schema/User.ProfileId";

export default class VerticalNavbar extends LightningElement {
  isTeacher;
  isParent;
  @wire(getRecord, {
    recordId: Id,
    fields: [ProfileId]
  })
  userDetails({ error, data }) {
    if (data) {
      // console.log("currProfile " + JSON.stringify(data));
      this.isTeacher =
        data.fields.ProfileId.value === "00e6D000000Ri7wQAC" ? true : false;
      this.isParent =
        data.fields.ProfileId.value === "00e6D000000Rj45QAC" ? true : false;
    } else if (error) {
      this.error = error;
    }
  }
  toAdmission() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: true,
          home: false,
          fee: false,
          settings: false,
          subscription: false,
          inbox: false,
          backbtn: false
        }
      })
    );
  }

  toHome() {
    console.log("toHome " + JSON.stringify(this));
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: true,
          fee: false,
          settings: false,
          inbox: false,
          subscription: false
        }
      })
    );
  }
  toAdmin() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          admin: true,
          settings: false,
          inbox: false,
          subscription: false
        }
      })
    );
  }
  toFee() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: true,
          settings: false,
          inbox: false,
          subscription: false
        }
      })
    );
  }
  toSettings() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: true,
          inbox: false,
          subscription: false
        }
      })
    );
  }
  toSubscription() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: false,
          inbox: false,
          subscription: true
        }
      })
    );
  }
  toCheckin() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: false,
          subscription: false,
          inbox: false,
          showCheckin: true
        }
      })
    );
  }

  toInbox() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: false,
          subscription: false,
          showCheckin: false,
          inbox: true,
          newFeatures: false
        }
      })
    );
  }

  toSuggestions() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: false,
          subscription: false,
          showCheckin: false,
          inbox: false,
          newFeatures: true
        }
      })
    );
  }

  toMyClassrooms() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: false,
          subscription: false,
          showCheckin: false,
          inbox: false,
          myclassroom: true
        }
      })
    );
  }

  toAssignment() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          assignment: true,
          inbox: false
        }
      })
    );
  }

  toAcademic() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          academic: true,
          inbox: false
        }
      })
    );
  }

  toExamScheduler() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          examScheduler: true,
          inbox: false
        }
      })
    );
  }

  toVisitorTracking() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          visitortracking: true,
          inbox: false
        }
      })
    );
  }

  toTeacherSettings() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          teacherSettings: true,
          inbox: false
        }
      })
    );
  }

  toStudentFacility() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          studentFacility: true,
          inbox: false
        }
      })
    );
  }

  toStudentCertificate() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          studentCertificate: true,
          inbox: false
        }
      })
    );
  }

  get hide() {
    return this.toggle ? "" : "iconTile";
  }

  @track toggle = false;
  handleToggle() {
    this.dispatchEvent(
      new CustomEvent("togglebtn", {
        detail: !this.toggle
      })
    );
    console.log("toggle");
    this.toggle = !this.toggle;
  }

  @track classList;
  @track classroomList;
  handleNavClick(e) {
    this.classList =
      e.currentTarget.dataset.name === "listClass" ? true : false;
    this.classroomList =
      e.currentTarget.dataset.name === "listClassroom" ? true : false;
  }

  @track academicList;
  handleAcList() {
    this.academicList = !this.academicList;
  }
}