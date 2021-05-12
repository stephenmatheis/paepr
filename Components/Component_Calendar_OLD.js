/** RHC-C SharePoint Team */

/* Actions */
import Component from '../Actions/Action_Component.js'

export default function Component_Calendar(param) {
    const {
        data,
        onChange,
        parent,
        position
    } = param;

    let {
        month
    } = param;

    // const calendarColor = 'rgb(255, 45, 85)';
    const calendarColor = App.primaryColor;

    const component = Component({
        html: /*html */ `
            <div class='calendar-container'>
                ${createCalendar()}
            </div>
        `,
        style: /*css*/ `
            .calendar-container {
                margin: 50px auto;
                width: max-content;
                min-width: max-content;
            }

            .month-container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 5px;
                background: ${calendarColor};
                border-radius: 7px 7px 0px 0px;
            }

            .month-title {
                color: white;
                font-size: 1.5em;
                font-weight: 700;
            }

            .month-control {
                background: white;
                color: ${calendarColor};
                margin: 2px;
                padding: 0px 8px;
                border-radius: 50%;
                font-size: 2em;
                font-weight: 1000;
                font-family: monospace;
                cursor: pointer;
            }

            .weeks-container {
                /* min-width: 475px; */
                background: white;
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: auto auto auto auto auto auto;
                border-radius:  0px 0px 7px 7px;
            }

            .weeks-container .day {
                color: white;
                background: ${calendarColor};
                padding: 3px;
                text-align: center;
            }

            .weeks-container .date-container {
                border: solid 1px lightgray;
                /* min-height: 50px; */
                height: 75px;
                width: 100px;
                overflow: hidden;
            }

            .weeks-container .date-container .date {
                text-align: center;
            }

            .weeks-container .events-container {
                text-align: center;
                /* font-size: 2em; */
                /* line-height: 0; */
                color: ${calendarColor};
            }

            .today-container {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                padding: 25px 5px;
                font-weight: 700;
            }

            .today-events-container {
                padding-left: 20px;
            }

            .today-event-container .border {
                border-bottom: solid rgba(0,0,0,0.7) 2px;
            }

            .today-event-time-container {
                font-weight: 500;
                font-size: 0.8em;
            }
        `,
        parent,
        position,
        events: [
            {
                selector: '#id .back',
                event: 'click',
                listener: (event) => {
                    loadMonth(-1);
                }
            },
            {
                selector: '#id .forward',
                event: 'click',
                listener: (event) => {
                    loadMonth(1);
                }
            }
        ]
    });

    function createCalendar() {
        const thisMonth = getThisMonth().toLocaleDateString('en', {month: 'long'});
        const dates = getDates();
        const events = getEvents();
        const days = [
            'SUN',
            'MON',
            'TUE',
            'WED',
            'THU',
            'FRI',
            'SAT'
        ]
        let html =  /*html*/ `
                <div class='calendar'>
                    <div class='month-container'>
                        <div class='month-control back'>&lsaquo;</div>
                        <div class='month-title'>${getThisMonth().toLocaleDateString('en', {month: 'long', year: 'numeric'})}</div>
                        <div class='month-control forward'>&rsaquo;</div>
                    </div>
                    <div class='weeks-container'>
        `;
    
        days.forEach((day) => {
            html += `<div class='day'>${day}</div>`;
        });

        let dayOfWeek = 0;
        let currentDateIndex = 0;

        for (let i = 1; i <= 35; i++) {
            let date;

            if (dates[currentDateIndex]) {
                date = (dates[currentDateIndex].getDay() == dayOfWeek) ? dates[currentDateIndex].getDate() : '';
            } else {
                date = '';
            }

            const numberOfEvents = (events[date]) ? events[date].length : 0;

            html += /*html*/ `
                <div class='date-container'>
                    <div class='date' data-dayofweek='${dayOfWeek}'>${date}</div>
                    <div class='events-container' data-date='${(date) ? formatDate(dates[currentDateIndex]) : ''}'>${getEventDots(numberOfEvents)}</div>
                </div>
            `;

            dayOfWeek = ((i % 7) != 0) ? dayOfWeek + 1 : 0;

            if (date) {
                currentDateIndex++;
            }
        }

        html += /*html*/ `
                </div>
            </div>
        `

        return html;
    }

    function formatDate(d) {
        const mm = (d.getMonth() + 1 < 10) ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
        const dd = (d.getDate() < 10) ? `0${d.getDate()}` : d.getDate();
        const yyyy = d.getFullYear();

        return `${mm}/${dd}/${yyyy}`;
    }

    function getThisMonth() {
        return month || new Date();
    }

    function getDates() {
        let date = new Date(new Date().getFullYear(), getThisMonth().getMonth(), 1);
        const month = date.getMonth();
        let days = [];
        
        while (date.getMonth() === month) {
           days.push(new Date(date));
           date.setDate(date.getDate() + 1);
        }
        
        return days;
    }

    function getEvents() {
        let events = {};
        const thisMonthsEvents = data.filter((event) => {
            return new Date(event.EventDate).getMonth() == month.getMonth(); 
        });

        if (thisMonthsEvents.length != 0) {
            thisMonthsEvents.forEach((event) => {
                const date = new Date(event.EventDate);
                const dateNumber = date.getDate();
    
                if (!events[dateNumber]) {
                    events[dateNumber] = [];
                }
    
                events[dateNumber].push(event);
            });
        }

        return events;
    }

    function getEventDots(number) {
        let dots = [];

        for (let i = 1; i <= number; i++) {
            dots.push('&bullet;');

            if (i == 4) {
                dots.push('&plus;');
                break;
            }
        }

        return dots.join(' ');
    }

    function loadMonth(number) {
        const thisMonth = getThisMonth();
        
        /** Increment or Decrement month */
        month = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + number, thisMonth.getDate());
        
        const container = component;

        container.get().innerHTML = createCalendar();

        container.find('.back').addEventListener('click', event => {
            loadMonth(-1);
        });

        container.find('.forward').addEventListener('click', event => {
            loadMonth(1);
        });

        if (onChange) {
            onChange(month);
        }
    }

    component.getMonth = () => {
        return month.getMonth();
    };

    return component;
}