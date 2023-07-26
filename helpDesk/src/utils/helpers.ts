import Toast from 'react-native-simple-toast';
import { ColorSet } from '../styles';
import { ticketMessageStrings, ticketStatus } from './constants';


export function showToast(text: string) {
  Toast.show(text);
}


export function getTicketStatus(status: number) {
  switch (status) {
    case ticketStatus.pending:
      return ticketMessageStrings.pending;
    case ticketStatus.inProgress:
      return ticketMessageStrings.inProgress;
    default:
      return ticketMessageStrings.completed;
  }
}


export function getTicketStatusColor(status: number) {
  switch (status) {
    case ticketStatus.pending:
      return ColorSet.red;
    case ticketStatus.inProgress:
      return ColorSet.themeDark;
    default:
      return ColorSet.green;
  }
}


export function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

