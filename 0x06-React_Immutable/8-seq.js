import { Seq, fromJS } from 'immutable';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function printBestStudents(object) {
  const studentsSeq = Seq(fromJS(object));
  const bestStudentsFormatted = studentsSeq
    .filter((student) => student.get('score') >= 70)
    .map((student) => student
      .update('firstName', capitalize)
      .update('lastName', capitalize))
    .toJS();
  console.log(bestStudentsFormatted);
}
