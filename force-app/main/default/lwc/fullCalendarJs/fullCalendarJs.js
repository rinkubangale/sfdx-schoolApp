import { LightningElement, track, wire, api } from "lwc";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import FullCalendarJS from "@salesforce/resourceUrl/FullCalendarJS";
export default class FullCalendarJs extends LightningElement {
  fullCalendarJsInitialised = false;
  eventsRendered = false; //To render initial events only once
  openSpinner = false; //To open the spinner in waiting screens
  @track events = [
    {
      id: "1",
      title: "Assignment 1",
      start: "2022-12-21"
    },

    {
      id: "2",
      title: "Assignment 2",
      start: "2022-12-24"
    }
  ];

  renderedCallback() {
    if (this.fullCalendarJsInitialised) {
      return;
    }
    this.fullCalendarJsInitialised = true;
    this.openSpinner = true;

    Promise.all([
      loadScript(this, FullCalendarJS + "/FullCalendarJS/jquery.min.js"),
      loadScript(this, FullCalendarJS + "/FullCalendarJS/moment.min.js"),
      loadScript(this, FullCalendarJS + "/FullCalendarJS/theme.js"),
      loadScript(this, FullCalendarJS + "/FullCalendarJS/fullcalendar.min.js"),
      loadStyle(this, FullCalendarJS + "/FullCalendarJS/fullcalendar.min.css")
    ])
      .then(() => {
        this.initialiseFullCalendarJs();
        this.openSpinner = false;
      })
      .catch((error) => {
        console.error({
          message: "Error occured on FullCalendarJS",
          error
        });
      });
  }

  initialiseFullCalendarJs() {
    const ele = this.template.querySelector("div.fullcalendarjs");

    $(ele).fullCalendar({
      header: {
        left: "prev,next today",
        center: "title",
        right: "month,agendaWeek,agendaDay"
      },
      defaultDate: new Date(), // default day is today - to show the current date
      defaultView: "month", //To display the default view - as of now it is set to month view
      navLinks: true, // can click day/week names to navigate views
      editable: true, // To move the events on calendar - TODO
      selectable: true, //To select the period of time
      eventLimit: true, // allow "more" link when too many events
      events: this.events // all the events that are to be rendered - can be a duplicate statement here
    });
  }
}