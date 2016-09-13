import { Pipe, PipeTransform } from "@angular/core";

/**
  * Format readable phone number
  * Example:
  *  - "55555555555" => "+5 (555) 555-5555"
  * Note:
  *  - only handles US numbers
**/
@Pipe({
  name: "phone",
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      let parts = value.match(/^(\d{1})?(\d{3})?(\d{3})(\d{4})$/);
      if (parts) {
        return (parts[1] ? `+${parts[1]} ` : "") +
               (parts[2] ? `(${parts[2]}) ` : "") +
               `${parts[3]}-${parts[4]}`;
      }
    }
    return "";
  }
}
