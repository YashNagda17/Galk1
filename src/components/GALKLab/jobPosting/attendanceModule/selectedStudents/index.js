import { Avatar } from "antd"
import './index.css'
function SelectedStudents({ selectedStudents, setClickedStudent, clickedStudent }) {
    const handleStudentClick = (student) => {
        setClickedStudent(student)
    }
    const isClicked = (id) => {
        if (clickedStudent && clickedStudent.id === id)
            return true;
        return false;
    }
    const studentsJsx = selectedStudents?.map(elm =>
        <div key={elm.id}
            onClick={() => handleStudentClick(elm)}
            className={`attendance-module-selected-student-card-container
                ${isClicked(elm.id) ? 'attendance-module-selected-student-card-container-custom' : ''}`}>
            <div className="attendance-module-selected-student-card-avatar-container">
                <Avatar size="large" src={elm.img} />
            </div>
            <div className="attendance-module-selected-student-card-student-details">
                <div className="attendance-module-selected-student-card-student-name" >{elm.name}
                </div>
                <div className="attendance-module-selected-student-card-student-college" >
                    {elm.collegeName} , &nbsp;{elm.branchName}
                </div>
            </div>
        </div>
    )
    return <>

        {studentsJsx}

    </>
}

export default SelectedStudents