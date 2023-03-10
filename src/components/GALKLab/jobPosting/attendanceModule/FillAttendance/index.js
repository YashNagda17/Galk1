import { Modal } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import './index.css'
function FillAttendance({ isOpen,
    setIsOpen,
    selectedDate,
    selectedJob,
    clickedStudent, }) {
    const [time, setTime] = useState('')
    const [link, setLink] = useState('')
    const [task, setTask] = useState('')
    const handleOk = () => {
        setTask('')
        setLink('')
        setTime('')
        setIsOpen(false);
    };

    useEffect(() => {
        const data = getOldData()
        if (data) {
            setTask(data.task)
            setLink(data.link)
            setTime(data.time)
        }
    }, [selectedDate])
    const getOldData = () => {
        let date = new Date(selectedDate)
        date.setHours(0, 0, 0, 0)
        date = date.getTime()
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
    return <>
        <Modal
            title={new Date(selectedDate).toLocaleDateString()}
            bodyStyle={{ height: 400 }}
            width={600}
            style={{ top: 20 }}
            visible={isOpen}
            onOk={handleOk}
            onCancel={handleOk}
        >
            <div className="attendance-module-fill-container" >
                <div className="attendance-module-fill-form-container">
                    <label for="taskNo">Task number:</label>
                    <input
                        id="taskNo"
                        disabled
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        type="number"
                        placeholder="GitHub task#"
                        className="attendance-module-fill-form-input"
                    />
                    <label for="taskLink">Github link:</label>
                    <input
                        id="taskLink"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        type="url"
                        disabled
                        placeholder="GitHub link"
                        className="attendance-module-fill-form-input"
                    />
                    <label for="workingHours">Working Hours:</label>
                    <input
                        id="workingHours"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        type="number"
                        disabled
                        placeholder="Working hours"
                        className="attendance-module-fill-form-input"
                    />

                </div>
            </div>
        </Modal>
    </>
}
const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps, {})(FillAttendance);
