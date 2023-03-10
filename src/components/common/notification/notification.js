import { connect } from 'react-redux'
import './notification.css'
import { useState } from 'react'
import { ClockCircleOutlined } from "@ant-design/icons";
import { timeFormat, trimmedText } from './notificationUtility'
import { AdminNotification } from './adminNotificaion';
import { updateAdminReadNotification } from "../../../actions/notificationActions"
import { Avatar } from 'antd'
import { useHistory } from "react-router-dom";
import { setApplicationModule } from "../../../actions/appActions";
import { ApplicationModule } from "../../../utils/models/applicationModules";
function Notifications({ notifications, companyId, setApplicationModule }) {
    const [isAdminNotificationVisible, setIsAdminNotificationVisible] = useState(false)
    const [data, setData] = useState(null)
    let history = useHistory()

    const handleNotificationClick = (elm) => {
        if (elm.type === 'admin') {
            setIsAdminNotificationVisible(true)
            setData(elm)
            if (!elm.isRead)
                updateAdminReadNotification(companyId, elm.key)
        } else {
            setApplicationModule(ApplicationModule.Internship)
            history.push("/Internship/ChatRoom", elm)


        }
    }
    const renderAvatar = (data) => {
        if (!data?.image) {
            return <Avatar
                size="large"
                style={{ verticalAlign: "middle", backgroundColor: '#f56a00' }}
            >
                {data.name.substring(0, 1)}
            </Avatar>
        } else {
            return <img alt="avatar" src={data.image} width={70} height={70} ></img>
        }
    }
    let allNotificationJsx = notifications?.map((elm) =>
        < div key={elm.key} className='msgDiv'
            style={elm.isRead ? {} : { backgroundColor: 'rgb(185, 217, 245)' }}
            onClick={() => handleNotificationClick(elm)}
        >
            <div className='msgDivAvatar' key="avatar" >
                {renderAvatar(elm)}
            </div>
            <div className='msgDivBody' key="body">
                <div className='msgDivBodyTitle'>
                    {trimmedText(elm.title, 30)}
                </div>
                <div className='msgDivBodydate'>
                    <span>
                        <ClockCircleOutlined />
                    </span>
                    <span>
                        {timeFormat(elm?.date.toDate())}
                    </span>
                </div>
                <div className='msgBodyText'>
                    {trimmedText(elm.text, 40)}
                </div>
            </div>
        </div >
    )
    return <>
        <div className="notificationContentParent">
            <div className="notificationHeader" key="idHead">
                Notifications
            </div>
            <div className="notificationBody" key='idbody'>
                {allNotificationJsx}
            </div>
            <div className="notificationFooter" key="idfooter">

            </div>
        </div>
        <AdminNotification
            isModalVisible={isAdminNotificationVisible}
            setIsModalVisible={setIsAdminNotificationVisible}
            data={data}
        />
    </>
}
const mapStateToProps = (state) => ({
    notifications: state.notifications.allNotification,
    companyId: state.company.company?.id
});

export default connect(mapStateToProps, { setApplicationModule })(Notifications)