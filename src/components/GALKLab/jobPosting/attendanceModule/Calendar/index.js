import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react"
import FillAttendance from "../FillAttendance";
import './index.css'
export default function Calendar({ selectedJob, clickedStudent }) {
    const datee = new Date();
    const [year, setYear] = useState(datee.getFullYear());
    const [month, setMonth] = useState(datee.getMonth());
    const [cal, setCal] = useState();
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const weekDaysJsx = weekDays.map(elm =>
        <div className="attendance-calendar-week-name" key={elm}  >{elm} </div>
    )
    const goForword = (e) => {
        e.preventDefault()
        setMonth(month + 1);
    }
    const goBackword = (e) => {
        e.preventDefault()
        setMonth(month - 1);

    }
    const setDateFun = (date) => {
        const newDate = new Date(date)
        newDate.setHours(0, 0, 0, 0)
        setSelectedDate(newDate)
        setIsOpen(true)
    }
    const dateClick = (day) => {
        if (!day)
            return;
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        today = today.getTime()
        const choosenDate = new Date(year, month, day, 0, 0, 0, 0).getTime();
        if (choosenDate > today)
            return
        setDateFun(new Date(year, month, day).getTime())
    }
    useEffect(() => {
        const table = [];
        for (var i = 0; i < 6; ++i) {
            const temp = [];
            for (var j = 0; j < 7; ++j)
                temp.push(0);
            table.push(temp);
        }
        const date = new Date(year, month, 1);
        let day = date.getDay();
        if (day === 0)
            day = 7;
        let current = 1;
        for (let i = 0; i < 6; ++i) {
            for (let j = day - 1; j < 7; ++j) {
                if (new Date(year, month, current).getDate() === current)
                    table[i][j] = current;
                ++current;
            }
            day = 1;
        }
        setCal(table);

    }, [year, month])


    const validBorder = (day) => {
        if (day)
            return true;
        return false
    }
    const getOldData = (day) => {
        const date = new Date(year, month, day, 0, 0, 0, 0).getTime();
        const studenId = clickedStudent?.id;
        const timesheet = selectedJob?.timesheet
        if (!timesheet)
            return null
        const attendance = timesheet[studenId]
        if (!attendance)
            return null;
        const data = attendance[date]
        if (!data)
            return null
        return data
    }
    const getDayEntryJsx = (day) => {
        const data = getOldData(day)
        if (data) {
            return <div className="attendance-calendar-day-entry-content">
                <div>{day}</div>
                <div>Task # {data.task}</div>
                <div>Hours - {data.time}</div>
            </div>
        }
        return <div className="attendance-calendar-day-entry-content">
            <div>{day}</div>
        </div>
    }
    const val = cal?.map((elm, index) => {
        return <div className="attendance-calendar-day-entry-row"  >
            {elm.map((day, index2) =>
                <div className={`attendance-calendar-day-entry 
                ${validBorder(day) ? 'attendance-calendar-day-entry-contitional' : ''}`}
                    onClick={(e) => dateClick(day)}
                    key={`${index}_${index2}`}>{day ? getDayEntryJsx(day) : ''}
                </div>)
            }

        </div>
    })
    console.log(selectedJob)
    return <>
        <div className="attendance-calendar-container" >
            <div className="attendance-calendar-control-container" style={{ marginTop: '10px' }}>
                <div className="attendance-calendar-control-header-arrow-container" >
                    <ArrowLeftOutlined className="attendance-calendar-control-header-arrow" onClick={(e) => goBackword(e)} />

                </div>
                <div className="attendance-calendar-control-header-text">
                    {`${months[new Date(year, month, 1).getMonth()]}, ${new Date(year, month, 1).getFullYear()}`}
                </div>
                <div className="attendance-calendar-control-header-arrow-container">
                    <ArrowRightOutlined className="attendance-calendar-control-header-arrow" onClick={(e) => goForword(e)} />

                </div>
            </div>
            <div className="attendance-calendar-week-name-container">
                {weekDaysJsx}
            </div>
            {val}
        </div>
        <FillAttendance
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedDate={selectedDate}
            selectedJob={selectedJob}
            clickedStudent={clickedStudent}


        />
    </>
}