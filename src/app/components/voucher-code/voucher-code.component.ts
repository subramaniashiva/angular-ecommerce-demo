import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-voucher-code',
  templateUrl: './voucher-code.component.html',
  styleUrls: ['./voucher-code.component.scss']
})
export class VoucherCodeComponent implements OnInit {

  @Output()
  onVoucherAdded: EventEmitter<string> = new EventEmitter<string>();

  public showBtnLoading: boolean = false;
  public voucherCode: string = '';

  private cleanVoucherCode(code: string):string {
    return code.trim();
  }
  constructor() { }

  ngOnInit() {
  }

  handleVoucher() {
    const voucherCode = this.cleanVoucherCode(this.voucherCode);
    if (voucherCode) {
      this.onVoucherAdded.emit(voucherCode);
    }
  }

}
