export type Choice = {
  text: string;
  next?: string;
  condition?: string;
  requiredItem?: string;
  giveItem?: string;
  removeItem?: string;
  requiredFlag?: string;
  setFlag?: string;
  sound?: string;
};
