import OcrClient from "../infrastructure/OcrClient";
import { parseOcrResponse } from "./services/ParseOcrResponse";
import constructReceipt from "../domain/services/ConstructReceipt";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import walletListRepository, { WalletListRepository } from "../infrastructure/WalletListRepository";

export class OcrReceiptFactory {
  static create() {
    return new OcrReceipt(receiptListRepository, settingRepository, walletListRepository);
  }
}

export class OcrReceipt {
  private receiptListRepository: ReceiptListRepository;
  private settingRepository: SettingRepository;
  private walletListRepository: WalletListRepository;

  constructor(receiptListRepository: ReceiptListRepository, settingRepository: SettingRepository, walletListRepository: WalletListRepository) {
    this.receiptListRepository = receiptListRepository;
    this.settingRepository = settingRepository;
    this.walletListRepository = walletListRepository;
  }

  execute(imagePaths: Array<string>) {
    const apiKey = this.settingRepository.get().apiKey;
    const receiptList = this.receiptListRepository.get();
    const wallet = this.walletListRepository.get().getCurrent();
    const ocrClient = new OcrClient(apiKey);
    imagePaths.map(imagePath => {
      ocrClient.call(imagePath).then(response => {
        const body: string = response.data; // TODO: save response body to temp file
        const lines = parseOcrResponse(body);
        const receipt = constructReceipt(imagePath, lines, wallet);
        receiptList.push(receipt);
      })
    })
    this.receiptListRepository.set(receiptList);
  }
}