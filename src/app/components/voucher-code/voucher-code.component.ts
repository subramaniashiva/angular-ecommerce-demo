import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-voucher-code',
  templateUrl: './voucher-code.component.html',
  styleUrls: ['./voucher-code.component.scss']
})
export class VoucherCodeComponent implements OnInit {

  @Input()
  verifyingVoucher = false;

  @Output()
  onVoucherAdded: EventEmitter<string> = new EventEmitter<string>();

  public voucherCode = '';

  private cleanVoucherCode(code: string): string {
    return code.trim();
  }
  constructor() { }

  ngOnInit() {
  }

  handleVoucher() {
    const voucherCode = this.cleanVoucherCode(this.voucherCode);
    if (voucherCode) {
      this.onVoucherAdded.emit(voucherCode);
      this.voucherCode = '';
    }
  }

}
