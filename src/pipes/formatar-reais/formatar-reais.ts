import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'FormatarReaisPipe',
})
export class FormatarReaisPipe implements PipeTransform {
  transform(value: any, ...args) {
    var int = parseFloat(value);
    return "R$ " + int.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  }
}
