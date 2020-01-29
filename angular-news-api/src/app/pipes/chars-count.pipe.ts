import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charsCount'
})
export class CharsCountPipe implements PipeTransform {
  transform(value: string): string {
    const passedCharsNumberRegex = '[0-9]+(?=\\schars)';
    const passedContentWithoutCharsNumberRegex = '.+(?=\\[)';

    const passedCharsNumberMatch = value.match(passedCharsNumberRegex);
    const passedCharsNumber = passedCharsNumberMatch ? parseInt(value.match(passedCharsNumberRegex)[0]) : 0;

    const wordsMatch = value.match(passedContentWithoutCharsNumberRegex);
    const words = wordsMatch
      ? wordsMatch[0].split(' ')
      : value.split(' ');

    let charsNumber = 0;
    words.forEach(word => charsNumber += word.trim().length);

    const totalCharsNumber = charsNumber + passedCharsNumber;

    return totalCharsNumber.toString() + ' chars';
  }
}
