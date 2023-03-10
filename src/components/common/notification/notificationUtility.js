export const onClickNotification = (notificationDropdownID, badgeParentClass) => {
    let elm = document.getElementById(notificationDropdownID)
    let parent = document.getElementsByClassName(badgeParentClass)[0]
    const mouseDownCollback = (e) => {
        if (!elm.contains(e.target) && !parent.contains(e.target)) {
            elm.style.display = 'none';
            document.removeEventListener('mousedown', mouseDownCollback)
        }
    }
    if (elm.style.display == 'block') {
        document.removeEventListener('mousedown', mouseDownCollback)
        elm.style.display = 'none'
        return
    }
    elm.style.display = 'block'
    document.addEventListener('mousedown', mouseDownCollback)
}
export const timeFormat = (time) => {
    const date = new Date(time).toString().split(" ").slice(1, 5);
    let hour = date[3].split(':')
    hour = hour[0] + ':' + hour[1]
    date[3] = 'at';
    date[4] = hour;
    return date.join(" ")

}
export const trimmedText = (text, limit) => {
    let res = ""
    let flag = false;
    for (let i = 0; i < text.length; ++i) {

        if (i > limit) {
            flag = true;
            break;
        }
        res += text[i]
    }
    if (flag)
        return res + '...'
    return res
}