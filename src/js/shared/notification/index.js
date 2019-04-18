import { notification } from 'antd';

export const openNotification = (type, title, content) => {
    notification[type]({
        message: title,
        description: content,
    });
};