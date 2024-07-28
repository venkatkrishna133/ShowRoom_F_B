import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    return items.filter(
      (item) =>
        item.userId.toString().includes(searchTerm) ||
        item.docId.toLowerCase().includes(searchTerm) ||
        item.username.toLowerCase().includes(searchTerm)
    );
  }
}
