import { Modal, Button } from 'antd';
import './adminNotification.css'
import { timeFormat } from './notificationUtility'
import { InfoCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
export function AdminNotification({ isModalVisible, setIsModalVisible, data }) {

    const handleOk = () => {
        setIsModalVisible(false);
        if (!data?.isRead) {
        }
    };
    const title = <div id="headId">
        <InfoCircleOutlined style={{ color: "blue", fontSize: '150%' }} /> &nbsp;Notification from Admin
    </div>
    if (!data || !isModalVisible)
        return null;
    return <>
        <Modal
            title={title}
            footer={[
                <Button key="submit" type="primary" onClick={handleOk}>
                    Ok
                </Button>,
            ]}
            visible={isModalVisible}
            onCancel={handleOk}
        >
            <div id="titleId">{data?.title}</div>
            <div className='timeId'>
                <ClockCircleOutlined /> &nbsp;
                {timeFormat(data?.date.toDate())}

            </div>
            <p></p>
            <p>{data?.text}</p>

        </Modal>
    </>
}
