import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";

export class UpdateMemoFactory {
  static create() {
    return new UpdateMemo(receiptListRepository);
  }
}

export class UpdateMemo {
  private receiptListRepository: ReceiptListRepository;

  constructor(receiptListRepository: ReceiptListRepository) {
    this.receiptListRepository = receiptListRepository;
  }

  execute(memo: string) {
    const receiptList = this.receiptListRepository.get();
    receiptList.updateReceipt({ memo });
    this.receiptListRepository.set(receiptList);
  }
}