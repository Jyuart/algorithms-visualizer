import type { Action } from '$lib/interfaces/action';
import type { Item } from '$lib/interfaces/item';
import { mergeSort } from './sortingAlrogithms';

function getSortAnimations(arr: Item[]) {
	const animations: Action[] = [];
	mergeSort(arr, animations);
	return animations;
}

export { getSortAnimations };
