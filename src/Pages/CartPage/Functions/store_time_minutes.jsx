export const StoreMinutes_Not_CurrentDay = (
  dateVal,
  hourVal,
  currentHour,
  open_time_hours,
  close_time_hours,
  currentMinute,
  open_time_minuts,
  close_time_minuts,
  minute
) => {
  // console.log(`dateVal --------`, dateVal);
  if (dateVal == false) {
    // console.log(
    //   `hourVal --------`,
    //   hourVal,
    //   ` ---------- close_time_hours --------`,
    //   close_time_hours
    // );
    // console.log(
    //   `close_time_minuts --------`,
    //   close_time_minuts,
    //   ` ---------- minute --------`,
    //   minute
    // );
    if (hourVal == close_time_hours) {
      if (close_time_minuts >= minute) {
        return "minutesValue";
      } else {
        return "disabled_time";
      }
    } else if (hourVal >= open_time_hours) {
      if (hourVal == open_time_hours) {
        if (open_time_minuts <= minute) {
          return "minutesValue";
        } else {
          return "disabled_time";
        }
      } else {
        return "minutesValue";
      }
    }
  }
};

export const StoreMinutes_GT_OPEN_HOURS = (
  dateVal,
  hourVal,
  currentHour,
  open_time_hours,
  close_time_hours
) => {
  // console.log(
  //   `123456789 ----`,
  //   dateVal,
  //   ` ------ our ----`,
  //   hourVal,
  //   ` ----currentHour----`,
  //   currentHour,
  //   `---open_time_hours----`,
  //   open_time_hours,
  //   `----close_time_hours ----`,
  //   close_time_hours
  // );
  if (
    dateVal == true &&
    hourVal > currentHour &&
    hourVal > open_time_hours &&
    hourVal < close_time_hours
  ) {
    // console.log(`123456789 ----- 2222`);
    return "minutesValue";
  }
};
export const StoreMinutes_EQ_OPEN_HOURS = (
  dateVal,
  hourVal,
  currentHour,
  open_time_hours,
  close_time_hours,
  currentMinute,
  open_time_minuts,
  minute
) => {
  if (
    dateVal == true &&
    hourVal > currentHour &&
    hourVal == open_time_hours &&
    hourVal < close_time_hours &&
    currentMinute >= open_time_minuts
  ) {
    if (hourVal > currentHour) {
      return "minutesValue";
    }
    if (currentMinute <= minute) {
      return "minutesValue";
    } else {
      return "disabled_time";
    }
  }
};

export const StoreMinutes_EQ_CLOSE_HOURS = (
  dateVal,
  hourVal,
  currentHour,
  open_time_hours,
  close_time_hours,
  currentMinute,
  open_time_minuts,
  close_time_minuts,
  minute
) => {
  if (
    dateVal == true &&
    hourVal > currentHour &&
    hourVal > open_time_hours &&
    hourVal == close_time_hours
  ) {
    // if (currentMinute <= minute) {
    if (hourVal < close_time_hours) {
      return "minutesValue";
    }
    if (close_time_minuts >= minute) {
      return "minutesValue";
    } else {
      return "disabled_time";
    }
    // } else {
    //   return "disabled_time";
    // }
  }
};

export const StoreMinutes_Hours_EQ_CURRENT_HOURS = (
  dateVal,
  hourVal,
  currentHour,
  open_time_hours,
  close_time_hours,
  currentMinute,
  open_time_minuts,
  close_time_minuts,
  minute
) => {
  if (dateVal == true && hourVal == currentHour) {
    console.log(`------------------- hourVal == currentHour`);
    // if (currentMinute >= open_time_minuts) {
    if (minute >= currentMinute) {
      console.log(
        `------------------- currentMinute >= open_time_minuts`,
        currentMinute,
        ` ------------`,
        open_time_minuts
      );
      if (hourVal == close_time_hours) {
        if (minute <= close_time_minuts) {
          return "minutesValue";
        } else {
          return "disabled_time";
        }
      } else {
        return "minutesValue";
      }
    } else {
      return "disabled_time";
    }
  }
};
