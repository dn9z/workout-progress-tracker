import "./Calendar.scss";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../components/context/Context";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
// new Date().to
const Calendar = () => {
  const { entries, setEntries } = useContext(MyContext);
  // console.log(entries[0].date.toLocaleDateString())
  const [eventArr, setEventArr] = useState([]);
  console.log(eventArr);

  useEffect(() => {
    setEventArr(() => {
      const arr = [];
      for (let i = 0; i < entries.length; i++) {
        const event = {
          title: entries[i].workoutName,
          date: toCalendarString(entries[i].date.toISOString()),
        };
        arr.push(event);
      }
      console.log(arr);
      return arr;
    })
  }, []);

  function toCalendarString(str) {
    const res = `${str.slice(0, 4)}-${str.slice(5, 7)}-${str.slice(8, 10)}`;
    return res;
  }
  toCalendarString(entries[0].date.toISOString());
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventArr}
      />
    </div>
  );
};

export default Calendar;
