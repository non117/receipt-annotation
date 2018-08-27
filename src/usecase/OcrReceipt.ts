import { listImageFiles } from "../infrastructure/FileIO"
import OcrClient from "../infrastructure/OcrClient";
import { parseOcrResponse, AnnotatedText } from "./services/ParseOcrResponse";
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

  execute() {
    const setting = this.settingRepository.get();
    const apiKey = setting.apiKey;
    const wallet = this.walletListRepository.get().getCurrent();
    const ocrClient = new OcrClient(apiKey);
    const imagePaths = listImageFiles(setting.receiptImageDirectory);
    imagePaths.forEach(imagePath => {
      ocrClient.call(imagePath).then(response => {
        const body: AnnotatedText = response.data; // TODO: save response body to temp file
        const lines = parseOcrResponse(body);
        const receiptList = this.receiptListRepository.get();
        receiptList.push(constructReceipt(imagePath, lines, wallet));
        this.receiptListRepository.set(receiptList);
      })
    });
  }
}