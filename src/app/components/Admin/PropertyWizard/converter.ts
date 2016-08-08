import { ICategory } from '../../../redux/modules/categories/categories.model'
import { IFormData as IBasicInfoFormData } from './StepBasicInfo/Form'

export function bindBasicInfoToCategory(cat: ICategory, data: IBasicInfoFormData): ICategory {
  return cat
}
