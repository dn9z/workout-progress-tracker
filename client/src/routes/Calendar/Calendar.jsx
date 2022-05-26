import "./Calendar.scss";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../components/context/Context";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// new Date().to
const Calendar = () => {
  // const { entries, setEntries } = useContext(MyContext);
  // // console.log(entries[0].date.toLocaleDateString())
  // const [eventArr, setEventArr] = useState([]);
  // useEffect(() => {
  //   setEventArr(() => {
  //     const arr = [];
  //     for (let i = 0; i < entries.length; i++) {
  //       const event = {
  //         title: entries[i].type.name,
  //         date: toCalendarString(entries[i].date.toISOString()),
  //       };
  //       arr.push(event);
  //     }
  //     return arr;
  //   })
  // }, []);
  // function toCalendarString(str) {
  //   const res = `${str.slice(0, 4)}-${str.slice(5, 7)}-${str.slice(8, 10)}`;
  //   return res;
  // }
  // toCalendarString(entries[0].date.toISOString());
  return (
    <p>Coming Soon!</p>
    // <div className="calendar-container">
    //   <FullCalendar
    //     // plugins={[dayGridPlugin]}
    //     // initialView="dayGridMonth"
    //     events={eventArr}
    //     plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    //     headerToolbar={{
    //       left: 'prev,next today',
    //       center: 'title',
    //       right: 'dayGridMonth,timeGridWeek,timeGridDay'
    //     }}
    //     initialView='dayGridMonth'
    //     editable={true}
    //     selectable={true}
    //     // selectMirror={true}
    //     dayMaxEvents={true}
    //     // weekends={this.state.weekendsVisible}
    //     // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
    //     // select={this.handleDateSelect} // when clicked on date field
    //     // eventContent={renderEventContent} // custom render function
    //     eventClick={handleEventClick} // when clicked on event
    //     // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
    //     /* you can update a remote database when these fire:
    //     eventAdd={function(){}}
    //     eventChange={function(){}}
    //     eventRemove={function(){}}
    //     */
    //     eventChange={(e) => {
    //       console.log(e)
    //     }}
    //   />
    // </div>
  );
};

const handleEventClick = (clickInfo) => {
  console.log('clicked')
  }

function renderEventContent(eventInfo) {
  console.log(eventInfo)
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default Calendar;
