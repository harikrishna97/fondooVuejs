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


const editSubject = new Subject();

export const editService = {
    sendDataToUpdate: message => editSubject.next({ text: message }),
    clearUpdateData: () => editSubject.next(),
    getDataFromEdit: () => editSubject.asObservable()
};


const collSubject = new Subject();

export const collService = {
    sendNoteIdToCollaborator: message => collSubject.next({ text: message }),
    clearNoteIdData: () => collSubject.next(),
    getNoteIdFromDisplay: () => collSubject.asObservable(),

    
};

const collSubject1 = new Subject();

export const collService1 = {
    sendNoteToCollaborator: message1 => collSubject1.next({ text: message1 }),
    clearNoteData: () => collSubject1.next(),
    getNoteFromDisplay: () => collSubject1.asObservable()
};


const updateNoteSubject = new Subject();

export const updateNoteService = {
    sendUpdateNote: message => updateNoteSubject.next({ text: message }),
    clearUpdateNote: () => updateNoteSubject.next(),
    getUpdateNote: () => updateNoteSubject.asObservable(),

};

const labelNoteSubject = new Subject();

export const labelNoteService = {
    sendLabelNote: message => labelNoteSubject.next({ text: message }),
    clearUpdateNote: () => labelNoteSubject.next(),
    getLabelNote: () => labelNoteSubject.asObservable(),

};

const createNoteSubject = new Subject();

export const createNoteService = {
    sendToCreateNote: message => createNoteSubject.next({ text: message }),
    clearCreateNote: () => createNoteSubject.next(),
    getFromCollaboratorNote: () => createNoteSubject.asObservable(),

};

const createCollaboratorSubject = new Subject();

export const createCollaboratorService = {
    sendToCreateCollaborator: message => createCollaboratorSubject.next({ text: message }),
    clearCreateCollaborator: () => createCollaboratorSubject.next(),
    getFromCreateCollaborator: () => createCollaboratorSubject.asObservable(),

};