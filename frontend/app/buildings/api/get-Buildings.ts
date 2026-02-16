'use server';

import { get } from '../../shared/utils/fetch';
import { Building } from '../types/building';

export default async function getBuildings(): Promise<Building[] | null> {
  const { data } = await get<Building[]>(`building`);
  return data;
}
