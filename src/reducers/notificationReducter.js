import * as actionTypes from "../actions/types";
const notificationReducer = (state = { unreadCount: 0, allNotification: [] }, action) => {
    switch (action.type) {
        case actionTypes.NOTIFICATION_LOADED:
            const notifications = action.data;
            const allNotification = []
            let unreadCount = 0;
            for (let key in action.data) {
                let elm = notifications[key]
                elm['key'] = key;
                allNotification.push(elm)
                if (!elm.isRead)
                    ++unreadCount
            }
            allNotification.sort((a, b) => b.date.seconds - a.date.seconds)

            return { allNotification, unreadCount };
        default:
            return state
    }
}
export default notificationReducer
