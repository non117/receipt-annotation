import Account from "./Account";

class Item {
  name: string;
  price: number;
  account: Account;

  isSum(): boolean {
    return false; // FIXME
  }
}