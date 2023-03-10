import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Modal, Form, Input, Select, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const ProfileCompletedModal = ({
	modalCloseHandler,
	isActionProgress,
	createGalkLabJob,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	const history = useHistory()
	const goToHome = () => {
		history.push("/home")
	}
	
	useEffect(() => {
		console.log(prevActionInProgressValue, isActionProgress);
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const createJob = (formValues) => {
		let newAttachmentFile = null;
		if (
			formValues.attachmentFileObject &&
			formValues.attachmentFileObject.length > 0
		) {
			newAttachmentFile = formValues.attachmentFileObject[0].originFileObj;
		}
		let jobToCreate = {
			...formValues,
			attachmentFileObject: newAttachmentFile,
		};
		createGalkLabJob(jobToCreate);
	};

	const normalizeFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	return (
		<Modal
			title="Profile completed"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
            Profile Creation is completed.
            You can access other features of the Portal by going to home page 
            or continue editing profile.
            
            <div style={{ margin: "10px"}}></div>

            <div style={{ }}>
                <Button
					type="primary"
					onClick={() => {
						modalCloseHandler()
						goToHome()
					}}
				>
                    Home
                </Button>

                <Button type="primary">
                    
                </Button>

                <Button
					type="primary"
					onClick={modalCloseHandler}
				>
                    Continue
                </Button>
            </div>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	isActionProgress: state.galkLabJobs.actionInProgress,
});

export default connect(mapStateToProps, {})(ProfileCompletedModal);
