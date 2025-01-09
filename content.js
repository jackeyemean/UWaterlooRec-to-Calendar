document.addEventListener("copy", () => {
    navigator.clipboard.readText().then((copiedText) => {
      const schedules = extractSchedules(copiedText);
      chrome.runtime.sendMessage({ type: "schedulesExtracted", payload: schedules });
    });
  });
  
  function extractSchedules(text) {
    const lines = text.split("\n");
    const schedules = [];
    const regex = /Schedule\s+(\w+, \w+ \d+ \d+)\s+One-Time\s+([\d:AMP -]+)\s+(.+)/;
  
    for (const line of lines) {
      const match = line.match(regex);
      if (match) {
        const [_, date, time, location] = match;
        schedules.push({ date, time, location });
      }
    }
    return schedules;
  }
  