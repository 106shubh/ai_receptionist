import { v4 as uuidv4 } from 'uuid';

export const getSessionId = (): string => {
    let sessionId = sessionStorage.getItem('bcrec_session_id');
    if (!sessionId) {
        sessionId = uuidv4();
        sessionStorage.setItem('bcrec_session_id', sessionId);
    }
    return sessionId;
};
