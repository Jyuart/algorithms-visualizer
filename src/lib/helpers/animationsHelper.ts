import { mergeSort } from '../logic/sortingAlrogithms';

function getSortAnimations(array: number[]): [number[], any[]] {
	const animations: any[] = [];

	const referenceArray = array.slice();

	mergeSort(array, 0, array.length - 1, animations, referenceArray);

	return [array, animations];
}

export { getSortAnimations };
