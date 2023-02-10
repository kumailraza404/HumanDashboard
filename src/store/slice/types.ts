export interface AppReduxState {
  value: number;
}

export interface UserReduxState {
  email: string;
  name: string;
  picture: string;
  isSignedIn: boolean;
}

export interface WealthReduxState {
  totalBalanceInUSD: number;
}
