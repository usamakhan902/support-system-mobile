const monthArray = [
  'Jan',
  'Feb',
  'March',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];


export function getTimeString(dateString: any) {
  const date = new Date(dateString);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  const time = date.toLocaleTimeString(undefined, options);
  return time;
}

