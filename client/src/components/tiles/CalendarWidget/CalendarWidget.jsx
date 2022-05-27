import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarWidget.scss";
import { useNavigate } from "react-router-dom";

const CalendarWidget = ({ workouts, setShowAddModal }) => {
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
    navigate(`/workouts/details/${clickInfo.event._def.publicId}`);
  };

  return (
    <div className="calendar-widget-container">
      {eventArr && (
        <>
          <div
            onClick={() => {
              setShowAddModal(true);
            }}
            className="calendar-widget-add"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <FullCalendar
            titleFormat={{ year: "numeric", month: "short" }}
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
            dayMaxEvents={0}
            eventClick={handleEventClick} // when clicked on event
            // aspectRatio='1'
          />
        </>
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
