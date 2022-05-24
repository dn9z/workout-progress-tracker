import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
const CalendarWidget = ({ workouts }) => {
  const [eventArr, setEventArr] = useState([]);

  useEffect(() => {
    workouts &&
      setEventArr(() => {
        const arr = [];
        for (let i = 0; i < workouts.length; i++) {
          const event = {
            title: workouts[i]._type.name,
            date: toCalendarString(workouts[i].date),
          };
          arr.push(event);
        }
        return arr;
      });
  }, [workouts]);
  function toCalendarString(str) {
    const res = `${str.slice(0, 4)}-${str.slice(5, 7)}-${str.slice(8, 10)}`;
    return res;
  }
  // toCalendarString(entries[0].date.toISOString());

  return (
    <div className="calendar-widget-container">
      {eventArr && (
        <FullCalendar
          // plugins={[dayGridPlugin]}
          // initialView="dayGridMonth"
          events={eventArr}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            // left: "prev,next today",
            // center: "title",
            // right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          // selectMirror={true}
          dayMaxEvents={true}
          // weekends={this.state.weekendsVisible}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          // select={this.handleDateSelect} // when clicked on date field
          // eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick} // when clicked on event
          // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
    eventAdd={function(){}}
    eventChange={function(){}}
    eventRemove={function(){}}
    */
          eventChange={(e) => {
            console.log(e);
          }}
        />
      )}
    </div>
  );
};

const handleEventClick = (clickInfo) => {
  console.log("clicked");
  console.log(clickInfo)
};

function renderEventContent(eventInfo) {
  console.log(eventInfo);
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalendarWidget;
