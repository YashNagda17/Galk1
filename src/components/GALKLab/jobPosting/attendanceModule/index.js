import { Modal } from "antd";
import { connect } from "react-redux";
import { } from "@ant-design/icons";
import { useEffect, useState } from "react";

import "./index.css";
import SelectedStudents from "./selectedStudents";
import Calendar from "./Calendar";
import EmptyCalendar from "./Calendar/emptyCalendar";
import EmptyStudents from "./selectedStudents/emptyStudents";

function AttendanceModule({ thisModalControl, selectedJob, studentList }) {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [clickedStudent, setClickedStudent] = useState(null)
    const handleOk = () => {
        thisModalControl.setIsOpen(false);
    };
    useEffect(() => {
        if (selectedJob &&
            selectedJob.candidateAssignedList && studentList && studentList.length) {
            let selectedStudents = studentList.filter(elm => {
                if (selectedJob.candidateAssignedList.indexOf(elm.id) !== -1) {
                    return true
                }
                return false
            })
            setSelectedStudents(selectedStudents)
        }
    }, [selectedJob, studentList]);
    return (
        <>
            <Modal
                title={"Attendance"}
                bodyStyle={{ height: window?.innerHeight - 160 || 700 }}
                width={1800}
                style={{ top: 20 }}
                visible={thisModalControl.isOpen}
                onOk={handleOk}
                onCancel={handleOk}
            >
                <div className="attendance-system-main-container">
                    <div className="attendance-system-student-list">
                        {selectedStudents && selectedStudents.length ? <SelectedStudents
                            selectedStudents={selectedStudents}
                            setClickedStudent={setClickedStudent}
                            clickedStudent={clickedStudent}
                        /> : <EmptyStudents />}
                    </div>
                    <div className="attendance-system-student-attendance">
                        {clickedStudent ? <Calendar
                            clickedStudent={clickedStudent}
                            selectedJob={selectedJob} /> : <EmptyCalendar />}

                    </div>
                </div>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    company: state.company.company,
    studentList: state.GALKLabStudents.filteredStudentList,
});

export default connect(mapStateToProps, {})(AttendanceModule);
