import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[] = [], filterString: string, filterName: string): any[] {
    if (!items || !filterString || !filterName) return items;

    return items.filter(item => 
      item[filterName] && 
      item[filterName].toLowerCase().includes(filterString.toLowerCase())
    );
  }
}
