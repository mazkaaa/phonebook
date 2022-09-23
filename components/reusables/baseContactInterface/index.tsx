export interface BaseContactInterface {
  first_name: string,
  last_name: string,
  id: number,
  created_at: string,
  phones: { number: string }[],
  favorite: boolean,
};
