export function capitalizeFirstLetter(str) {
  if (str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return "";
}
export function fromCamelCase(camelCaseStr) {
  const spacedStr = camelCaseStr.replace(/([A-Z])/g, " $1");
  return spacedStr.charAt(0).toUpperCase() + spacedStr.slice(1);
}
export function formatDate(timestamp: any) {
  const date = new Date(timestamp).toLocaleDateString("en-UK", {
    timeZone: "Asia/Riyadh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return timestamp ? date : "Not Mentioned";
}

export function formatIso(dateText: any) {
  const date = new Date(dateText);

  // Get year, month, and day part from the date
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  const formattedDate = year + "-" + month + "-" + day;
  return dateText ? formattedDate : "Not Mentioned";
}
export function formatSaudiIso(dateText = new Date()) {
  const date = new Date(dateText); // Create a Date object from the timestamp
  const formattedDate = date.toLocaleString("af-ZA", {
    timeZone: "Asia/Riyadh",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formattedDate.replace(" ", "T") + "+0300";
  // return formattedDate;
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatTime(days, hours, minutes, seconds) {
  let timeParts = [];

  if (days) {
    timeParts.push(days + "d");
  }
  if (hours) {
    timeParts.push(hours + "h");
  }
  if (minutes) {
    timeParts.push(minutes + "min");
  }
  if (seconds) {
    timeParts.push(seconds + "s");
  }

  if (timeParts.length >= 2) {
    return timeParts.slice(0, 2).join("");
  } else if (timeParts.length === 0) {
    return "0s";
  } else {
    return timeParts.join("");
  }
}
export function calculateAge(year, month, days) {
  let age = [];

  if (year) {
    age.push(year + " y/o");
  } else if (days) {
    age.push(days + " d/o");
  }

  if (age.length === 0) {
    return "0d";
  } else {
    return age.join("");
  }
}

export function formatTextWithUnderscore(input) {
  if (input) {
    const words = input.split("_");

    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return formattedWords.join(" ");
  }
  return " ";
}

export function formatTextWithyphen(input) {
  if (input.includes("_")) {
    const route = removeIdPart(input);

    const regex = /^[a-z]+(?:[A-Z][a-z]*)*$/;
    if (regex.test(route)) {
      const regex = /([a-z])([A-Z])/g;
      return capitalizeFirstLetter(route.replace(regex, "$1 $2"));
    } else {
      return capitalizeFirstLetter(route);
    }
  }
  let words = input.split("-");
  let formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return formattedWords.join(" ");
}
export function removeIdPart(input) {
  let words = input.split("_");
  words.pop();

  return words.join(" ");
}

export function formatName(input) {
  let words = input.split(" ");
  let formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return formattedWords.join(" ");
}

export function timestampToHour(timestamp) {
  const time = new Date(timestamp).toLocaleTimeString("en-SA", {
    timeZone: "Asia/Riyadh",
    hour: "numeric",
    minute: "numeric",
  });

  return timestamp ? time : "Not mentioned";
}
export function getDateandTime(timeStamp) {
  const time = new Date(timeStamp).toLocaleTimeString("en-SA", {
    timeZone: "Asia/Riyadh",
    hour: "numeric",
    minute: "numeric",
  });
  const date = formatDate(timeStamp);

  return {
    time: timeStamp ? time : "NOt mentioned",
    date: timeStamp ? date : "Not mentioned",
  };
}

export function formatDatetoText(timestamp: any) {
  const dateObj = new Date(timestamp);

  // Format the date object as a string in the desired format
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    timeZone: "Asia/Riyadh",
    day: "numeric",
    month: "short",
    year: "numeric",
  }); // Output: "Dec 12, 2023"
  return timestamp ? formattedDate : "Not mentioned";
}

export function checkEmpty(text: any) {
  return text ? text : "Not mentioned";
}

export function checkDateLength(date) {
  return String(date).length > 1 ? String(date) : `0${date}`;
}
