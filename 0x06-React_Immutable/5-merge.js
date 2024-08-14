import { List, Map } from 'immutable';

export function concatElements(page1, page2) {
  const page1List = List(page1);
  const page2List = List(page2);
  return page1List.concat(page2List);
}

export function mergeElements(page1, page2) {
  const page1Map = Map(page1);
  const page2Map = Map(page2);
  return page1Map.merge(page2Map);
}
