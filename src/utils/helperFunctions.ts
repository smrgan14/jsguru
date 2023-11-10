export class HelperFunctions {
  public static isValidJSON = (value: any) => {
    try {
      JSON.parse(value);
      return true;
    } catch (e) {
      return false;
    }
  };
}
