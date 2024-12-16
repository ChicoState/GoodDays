import React from "react";
import "./Calendar/styles.css";
import { daysInMonth, firstDayOfMonth, months } from "./Calendar/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export class Calendar extends React.Component <any, any> { 
  constructor(props) {
    super(props);

    const now = new Date();
    this.state = {
      month: now.getMonth(),
      now: now,
      displayMonthSelector: false
    };
  }

  setMonth = newMonth => {
    this.setState(prevState => {
      const newNow = new Date(prevState.now);
      newNow.setMonth(newMonth);
      return {
        month: newMonth,
        now: newNow
      };
    });
  };

  monthHandler = () => {
    this.setState(prevState => ({ displayMonthSelector: true }));
  };

  selectMonthHandler = month => {
    this.setState(
      prevState => ({ displayMonthSelector: false }),
      () => this.setMonth(month)
    );
  };

  render() {
    const days = daysInMonth(this.state.month);
    return (
      <div className="calendar">
        <Header
          month={this.state.month}
          year={this.state.now.getFullYear()}
          setMonth={this.setMonth}
          monthHandler={this.monthHandler}
        />
        <WeekDays />
        <DaysOfMonth
          journalList={this.props.journalList} // << passing here as a prop (description)
          days={days}
          month={this.state.month}
          now={this.state.now}
        />
        {this.state.displayMonthSelector && (
          <MonthSelector
            month={this.state.month}
            selectMonthHandler={this.selectMonthHandler}
          />
        )}
      </div>
    );
  }
}

class MonthSelector extends React.Component <any, any> {
  render() {
    return (
      <div className="month-selector">
        {months.map((month, i) => {
          return (
            <span
              key={month}
              onClick={() => this.props.selectMonthHandler(i)}
              className={`selectable-month ${
                i === this.props.month ? "selected-month" : ""
              }`}
            >
              {month}
            </span>
          );
        })}
      </div>
    );
  }
}

class Header extends React.Component <any, any> {
  decreaseMonth = () => {
    this.props.setMonth(Math.abs((this.props.month + 12 - 1) % 12));
  };

  increaseMonth = () => {
    this.props.setMonth(Math.abs((this.props.month + 1) % 12));
  };

  render() {
    return (
      <div className="header">
        <div className="header--info">
          <span className="header--month" onClick={this.props.monthHandler}>
            {months[this.props.month]}
          </span>
          <span className="header--year">{this.props.year}</span>
        </div>
        <div className="header-icons">
          <span onClick={this.decreaseMonth}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span onClick={this.increaseMonth}>
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      </div>
    );
  }
}

class WeekDays extends React.Component <any, any> {
  render() {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="weekrow">
        {weekdays.map(weekday => {
          return (
            <span key={weekday} className="weekday">
              {weekday}
            </span>
          );
        })}
      </div>
    );
  }
}

class DaysOfMonth extends React.Component <any, any> {
  render() {

    // sorting journalList stuff (capture the date and mood)
    // possibly using a hash table with date as key 
    // 

    const days = Array.from({ length: this.props.days }, (k, v) => v + 1);
    const dayToBeginTheMonthFrom = firstDayOfMonth(this.props.month);
    const currentDate = this.props.now.getDate();
    const style = { gridColumnStart: dayToBeginTheMonthFrom + 1 };

    return days.map((day, i) => { // list of days to react component (description) 
      return (
        <span
          key={i} 
          className={`day ${i === 0 ? "first-day" : ""} // << mood logic goes here (start here)
            ${day === currentDate ? "today" : ""}
            ${
              (i + dayToBeginTheMonthFrom) % 7 === 0 ||
              (i + dayToBeginTheMonthFrom) % 7 === 6
                ? "holiday"
                : ""
            }
            `}
          style={i === 0 ? style : {}}
        >
          {day}
        </span>
      );
    });
  }
}
