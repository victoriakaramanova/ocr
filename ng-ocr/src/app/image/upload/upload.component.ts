import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Lang } from '../../shared/interfaces';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { UploadService } from '../upload.service';
import { LoaderComponent } from '../../shared/loader/loader.component'
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnChanges {
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef; files = [];
  @Output() public onUpoadFinished = new EventEmitter();
  @Output() public onReckonFinished = new EventEmitter();
  @Output() selectEmit = new EventEmitter();

  language: string; //='bul';
  address: string;
  isLoading = false;
  selected = false;

  public langs: Lang[] = [
    { value: 'bul', show: 'Български' },
{ value: 'aze', show: 'Азербайджански' },
{ value: 'aze_cyrl', show: 'Азербайджански, кирилица' },
{ value: 'sqi', show: 'Албански' },
{ value: 'amh', show: 'Амхарски' },
{ value: 'eng', show: 'Английски' },
{ value: 'enm', show: 'Английски, средновековен' },
{ value: 'ara', show: 'Арабски' },
{ value: 'asm', show: 'Асамски' },
{ value: 'afr', show: 'Африкаанс' },
{ value: 'eus', show: 'Баски' },
{ value: 'bel', show: 'Белоруски' },
{ value: 'ben', show: 'Бенгалски' },
{ value: 'bos', show: 'Босненски' },
{ value: 'mya', show: 'Бурмески' },
{ value: 'vie', show: 'Виетнамски' },
{ value: 'glg', show: 'Галски' },
{ value: 'kat', show: 'Грузински' },
{ value: 'kat_old', show: 'Грузински, средновековен' },
{ value: 'ell', show: 'Гръцки, съвременен' },
{ value: 'guj', show: 'Гуджарати' },
{ value: 'dan', show: 'Датски' },
{ value: 'dzo', show: 'Джонка' },
{ value: 'epo', show: 'Есперанто' },
{ value: 'est', show: 'Естонски' },
{ value: 'heb', show: 'Иврит' },
{ value: 'yid', show: 'Идиш' },
{ value: 'ind', show: 'Индонезийски' },
{ value: 'iku', show: 'Инуктитут' },
{ value: 'gle', show: 'Ирландски' },
{ value: 'isl', show: 'Исландски' },
{ value: 'spa', show: 'Испански' },
{ value: 'spa_old', show: 'Испански, средновековен' },
{ value: 'ita', show: 'Италиански' },
{ value: 'ita_old', show: 'Италиански, средновековен' },
{ value: 'kaz', show: 'Казахски' },
{ value: 'kan', show: 'Каннада' },
{ value: 'cat', show: 'Каталански' },
{ value: 'ceb', show: 'Кебуански' },
{ value: 'kir', show: 'Киргизки' },
{ value: 'chi_sim', show: 'Китайски, опростен' },
{ value: 'chi_tra', show: 'Китайски, традиционен' },
{ value: 'kor', show: 'Корейски' },
{ value: 'kur', show: 'Кюрдски' },
{ value: 'lao', show: 'Лао' },
{ value: 'lav', show: 'Латвийски' },
{ value: 'lat', show: 'Латински' },
{ value: 'lit', show: 'Литовски' },
{ value: 'mkd', show: 'Македонски' },
{ value: 'msa', show: 'Малай' },
{ value: 'mal', show: 'Малайзийски' },
{ value: 'mlt', show: 'Малтийски' },
{ value: 'mar', show: 'Марати' },
{ value: 'deu', show: 'Немски' },
{ value: 'frk', show: 'Немски, фрактур' },
{ value: 'nep', show: 'Непалски' },
{ value: 'nor', show: 'Норвежки' },
{ value: 'ori', show: 'Ория' },
{ value: 'fas', show: 'Персийски' },
{ value: 'pol', show: 'Полски' },
{ value: 'por', show: 'Португалски' },
{ value: 'pan', show: 'Пунджаби' },
{ value: 'pus', show: 'Пушто' },
{ value: 'ron', show: 'Румънски' },
{ value: 'rus', show: 'Руски' },
{ value: 'san', show: 'Санскрит' },
{ value: 'sin', show: 'Синхала' },
{ value: 'syr', show: 'Сирийски' },
{ value: 'slk', show: 'Словашки' },
{ value: 'slv', show: 'Словенски' },
{ value: 'srp', show: 'Сръбски' },
{ value: 'srp_latn', show: 'Сръбски, латиница' },
{ value: 'grc', show: 'Старогръцки' },
{ value: 'swa', show: 'Суахили' },
{ value: 'tgl', show: 'Тагалог' },
{ value: 'tgk', show: 'Таджикски' },
{ value: 'tha', show: 'Таи' },
{ value: 'tam', show: 'Тамил' },
{ value: 'tel', show: 'Телугу' },
{ value: 'bod', show: 'Тибетски' },
{ value: 'tir', show: 'Тигрински' },
{ value: 'tur', show: 'Турски' },
{ value: 'cym', show: 'Уелски' },
{ value: 'uzb', show: 'Узбекски' },
{ value: 'uzb_cyrl', show: 'Узбекски, кирилица' },
{ value: 'uig', show: 'Уйгур' },
{ value: 'ukr', show: 'Украински' },
{ value: 'hun', show: 'Унгарски' },
{ value: 'urd', show: 'Урду' },
{ value: 'fin', show: 'Финландски' },
{ value: 'fra', show: 'Френски' },
{ value: 'frm', show: 'Френски, средновековен' },
{ value: 'hat', show: 'Хаитянски' },
{ value: 'hin', show: 'Хинди' },
{ value: 'khm', show: 'Хмерски, централен' },
{ value: 'nld', show: 'Холандски' },
{ value: 'hrv', show: 'Хърватски' },
{ value: 'chr', show: 'Чероки' },
{ value: 'ces', show: 'Чешки' },
{ value: 'swe', show: 'Шведски' },
{ value: 'jav', show: 'Явански' },
{ value: 'jpn', show: 'Японски' }
];
  
  constructor(
    private uploadService: UploadService,
    private location: Location) {}
  
  public response: { _id:string, url:string, originalname:string, created_at:string, language:string};
  public finished: boolean =false;

  public res: { message };
  //public message: string;
  public reckoned: boolean=false;
 

  ngOnInit(): void {
    //this.isLoading = false;
  }

  uploadFile(file): any {
    const formData = new FormData();
    formData.append('file', file.data);
    //formData.append('description', file.data.name);
    file.inProgress = true;
    this.isLoading = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded*100/event.total);
            break;
          case HttpEventType.Response: {
            this.onUpoadFinished.emit(event.body);
            this.response=event.body;
            //this.address=event.body.url;
            this.finished=true;
            this.isLoading = false;
            // this.uploadService.recognize({url:this.response.url,lang:'bul'}).pipe(
            //   map(e => {
            //     if (HttpEventType.Response) {
            //       //this.onReckonFinished.emit(e.body);
            //       this.res=HttpResponse.toString();
            //       this.reckoned=true;
            //     } else console.log(e);
            //   }),
            //   catchError((error: HttpErrorResponse)=> {
            //     return of('Reckon failed');
            //   })
            // ).subscribe((v: any)=> {
            //   if (typeof (v) === 'object') {
            //     console.log(v.body);
            //   }
            // })
          }

        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        this.isLoading=false;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
      }
    });
  }

  private uploadFiles() {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file);  
    });  
}

  onClick() {
    const fileUpload = this.fileUpload.nativeElement; 
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++)  
    {  
     const file = fileUpload.files[index];  
     this.files.push({ data: file, inProgress: false, progress: 0});  
    }  
      this.uploadFiles();  
    }; 
    fileUpload.click(); 
  }

  public uploadFinished = (event) => {
    this.response = event;
    this.isLoading=false;
  }
  
  ngOnChanges(){
    
  }
  
  // createRecognition(data: {language: string, url: string }): void {
  createRecognition(language: string ): void {
    //const language = data.language;
    const url = this.response.url;
    this.isLoading=true;
    this.reckoned=false;
    this.selected=true;
    this.uploadService.recognize(url, language).pipe(
      map(event => {
        //switch (event.type) {
        //  case HttpEventType.Response: {
         //   this.onReckonFinished.emit(event)//.emit(event.body);
            this.reckoned=true;
            this.isLoading=false;
            this.res=event.message;
            this.selected=false;
          //  break;}}
      })
    ,
    catchError((error: HttpErrorResponse) => {
      return (`${url} recognition failed.`);
    })
    )
  .subscribe((event: any) => {
    this.reckoned=false;
    this.isLoading=true;
    if (typeof (event) === 'object') {
      console.log(event.body);
    }
  });
  }

  public onChange = (event) => {
    const language = event.value;
    this.createRecognition(language);
    this.isLoading=false;
    //this.selectEmit.emit(event.value);
  }

  public reckonFinished = (event) => {
    this.res = event;
    this.isLoading=false;
    this.reckoned=true;
    this.selected=false;
  }

  public onCancel = () => {
    this.location.back();
  }

}