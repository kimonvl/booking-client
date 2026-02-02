export type TravelPurpose = "yes" | "no";
export type TitleOption = "Mr" | "Ms" | "Mrs";

export interface CheckoutDetailsFormState {
  travelingForWork: TravelPurpose;
  title: TitleOption | "";
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phoneCountryCode: string; // "+30"
  phoneNumber: string;
  specialRequest: string;
}

export interface CheckoutPageState {
    checkoutDetailsForm: CheckoutDetailsFormState;
}