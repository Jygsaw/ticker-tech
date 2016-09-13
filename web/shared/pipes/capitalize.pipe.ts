import { Pipe, PipeTransform } from "@angular/core";

/**
  * Uppercase the first letter of each word
  * Example:
  *  - "first name" => "First Name"
**/
@Pipe({
  name: "capitalize",
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    let words = value.split(" ");
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
}
