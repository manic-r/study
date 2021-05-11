import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
/**
 * https://www.cnblogs.com/zhe-hello/p/10894626.html
 * https://www.cnblogs.com/chenjw-note/p/11353281.html
 * https://blog.csdn.net/hbiao68/article/details/84748159
 */
@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq: HttpRequest<any> = req.clone();
    newReq.headers.append('Access-Control-Allow-Origin', '*');
    newReq.headers.append('access-control-allow-credentials', 'true');
    return next.handle(newReq);
  }

}
