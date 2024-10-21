import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(array: any[], sortBy: string): any[] {
    if (!array || !sortBy) return array;

    const [sortField, sortDirection] = sortBy.split(' ');

    return [...array].sort((a, b) => {
      const comparison = (a[sortField] > b[sortField] ? 1 : -1);
      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }
}
