import { fromJS } from 'immutable';

export default function accessImmutableObject(object, array) {
  const objectMap = fromJS(object);
  return objectMap.getIn(array, undefined);
}
