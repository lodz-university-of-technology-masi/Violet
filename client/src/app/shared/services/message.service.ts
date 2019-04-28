import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private toastrService: ToastrService, private translate: TranslateService) {
    }

    success(msg: string) {
        this.translate.get(msg).subscribe((res: string) => {
            this.toastrService.success(res);
        });
    }

    error(msg: string) {
        this.translate.get(msg).subscribe((res: string) => {
            this.toastrService.error(res);
        });
    }

    info(msg: string) {
        this.translate.get(msg).subscribe((res: string) => {
            this.toastrService.info(res);
        });
    }
}
