import { Inject, Injectable } from "@angular/core";
import { catchError, Observable, Subject, throwError } from "rxjs";
import { AiResponse } from "../home/models/ai-response.model";
import { RUNTIME_CONFIG } from "src/libs/utils/runtime-config.utils";
import { IRuntimeConfig } from "src/libs/models/runtime-config.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ArtificialIntelService {
  static BASE_PATH = 'FileUpload';
  private aiResponseSubject = new Subject<AiResponse>();
  aiResponse$ = this.aiResponseSubject.asObservable();

  constructor(
    @Inject(RUNTIME_CONFIG) private env: () => IRuntimeConfig,
    private httpClient: HttpClient
  ) {
    ArtificialIntelService.BASE_PATH = `${this.env().apiUrl}${ArtificialIntelService.BASE_PATH}`;
  }

  upload(data: FormData): Observable<any> {
    return this.httpClient.post<any>(`${ArtificialIntelService.BASE_PATH}/Upload`, data).pipe(
      catchError(() => {
      return throwError(() => new Error("Something went wrong while uploading data."));
      })
    );
  }

  getAiResponse(userId: number, categoryId: number): Observable<any> {
    return this.httpClient.get<any>(`${ArtificialIntelService.BASE_PATH}/GetAiResponse?userId=${userId}&categoryId=${categoryId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching AI response:', error);
        return throwError(() => new Error("Something went wrong while fetching AI response."));
      })
    );
  }
}

