chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "generateCalendarLink") {
      const { date, time, location } = message.payload;
  
      const [startTime, endTime] = time.split(" - ");
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const startDateTime = `${formattedDate}T${convertTo24Hr(startTime)}:00`;
      const endDateTime = `${formattedDate}T${convertTo24Hr(endTime)}:00`;
  
      const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=UW+Rec+Event&dates=${startDateTime}/${endDateTime}&location=${encodeURIComponent(
        location
      )}`;
      sendResponse({ calendarLink });
    }
  });
  
  function convertTo24Hr(time) {
    const [_, hours, minutes, period] = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let hrs = parseInt(hours);
    if (period.toUpperCase() === "PM" && hrs < 12) hrs += 12;
    if (period.toUpperCase() === "AM" && hrs === 12) hrs = 0;
    return `${hrs.toString().padStart(2, "0")}:${minutes}`;
  }
  