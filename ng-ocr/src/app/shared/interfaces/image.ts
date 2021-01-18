import { IUser } from './user';
import { LanguageDictionary } from '../../../assets/languageDictionary';


export interface IImage<T=string> {
  _id: string,
  originalname: string;
  url: string;
  // image: File,//{type: JSON},
  userId: IUser;
  language: string;
  languageText: string;
  recognizedText: string;
  created_at: string;
  updatedAt: string;
  __v: number;

  // function languageText(language:string):any {
  //   return LanguageDictionary['langs'][language];
  // }
  //this.languageDictionary.langs.find((v)=>v.value==im.language).show
}