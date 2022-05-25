import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarWidget.scss";
import { useNavigate } from "react-router-dom";
const CalendarWidget = ({ workouts }) => {
  const [eventArr, setEventArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    workouts &&
      setEventArr(() => {
        const arr = [];
        for (let i = 0; i < workouts.length; i++) {
          const event = {
            title: workouts[i]._type.name,
            date: workouts[i].date,
            id: workouts[i]._id,
          };
          arr.push(event);
        }
        return arr;
      });
  }, [workouts]);

  // function toCalendarString(str) {
  //   const res = `${str.slice(0, 4)}-${str.slice(5, 7)}-${str.slice(8, 10)}`;
  //   return res;
  // }

  const handleEventClick = (clickInfo) => {
    // console.log("clicked");
    // console.log(clickInfo)
    console.log(clickInfo.event._def.publicId);
    navigate(`/workouts/details/${clickInfo.event._def.publicId}`);
  };

  return (
    <div className="calendar-widget-container">
      {eventArr && (
        <FullCalendar
          // plugins={[dayGridPlugin]}
          // initialView="dayGridMonth"
          eventMaxStack={0}
          moreLinkContent={<div className="red-dot"></div>}
          firstDay={1}
          events={eventArr}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "title",
            center: "prev,next",
            right: "",
          }}
          // initialView="dayGridMonth"
          // editable={true}
          // selectable={true}
          // selectMirror={true}
          dayMaxEvents={0}
          // contentHeight='100px'
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
          // eventChange={(e) => {
          //   console.log(e);
          // }}
        />
      )}
    </div>
  );
};

// function renderEventContent(eventInfo) {
//   console.log(eventInfo);
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

export default CalendarWidget;
