import * as actionTypes from "./types";
import { database, storage } from "../utils/configs/firebaseConfig";
import firebase from "firebase";
export const getNotificaion = (companyId) => (dispatch) => {
    dispatch({ type: actionTypes.NOTIFICATION_LOADING })
    const unsubscribe = database.collection('Notifications').doc(companyId).onSnapshot(snapshot => {
        let data = snapshot.data()
        if (data) {
            dispatch({ type: actionTypes.NOTIFICATION_LOADED, data })
        }
    })
    return unsubscribe;
}
export const updateAdminReadNotification = (companyId, key) => {
    const field = `${key}.isRead`
    database.collection('Notifications').doc(companyId).update({ [field]: true })
}
