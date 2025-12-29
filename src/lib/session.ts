import { getSessionId } from './userId';

export const setSessionValue = (key: string, value: any): void => {
    const sessionId = getSessionId();
    const storageKey = `${sessionId}_${key}`;
    sessionStorage.setItem(storageKey, JSON.stringify(value));
};

export const getSessionValue = <T>(key: string): T | null => {
    const sessionId = getSessionId();
    const storageKey = `${sessionId}_${key}`;
    const value = sessionStorage.getItem(storageKey);
    return value ? JSON.parse(value) : null;
};
export const removeSessionValue = (key: string): void => {
    const sessionId = getSessionId();
    sessionStorage.removeItem(`${sessionId}_${key}`);
};
