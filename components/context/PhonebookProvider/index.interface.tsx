export interface PhonebookProviderInterface {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
};

export interface InputPhonesInterface {
  phones: {
    number: string
  }[];
}
