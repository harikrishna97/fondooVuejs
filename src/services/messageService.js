import { Subject } from 'rxjs';

const subject = new Subject();

export const messageService = {
    sendMessage: message => subject.next({ text: message }),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};

const newsubject = new Subject();

export const listGridService = {
    sendListView: message => newsubject.next({ text: message }),
    clearListView: () => newsubject.next(),
    getListView: () => newsubject.asObservable()
};

const labelSubject = new Subject();

export const labelService = {
    sendLabelToIcon: message => labelSubject.next({ text: message }),
    clearLabel: () => labelSubject.next(),
    getLabelFromToolbar: () => labelSubject.asObservable()
};