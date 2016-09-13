import { Pipe, PipeTransform } from "@angular/core";

/**
  * Replace underscores with spaces
  * Example:
  *  - "first_name" => "first name"
**/
@Pipe({
  name: "underspace",
})
export class UnderspacePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace("_", " ");
  }
}
