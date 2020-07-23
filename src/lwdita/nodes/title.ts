import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, BasicValue } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";

export const TitleFields = [...LocalizationFields, ...ClassFields];
export interface TitleNode extends LocalizationNode, ClassNode {}
export const isValidTitleField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);
export const isTitleNode = (value?: {}): value is TitleNode =>
  typeof value === 'object' && areFieldsValid(TitleFields, value, isValidTitleField);

export function makeTitle<T extends Constructor>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeClass);
}

@makeComponent(makeTitle, 'title', isValidTitleField, TitleFields, [], ['common-inline'])
export class TitleNode extends BaseNode {}
