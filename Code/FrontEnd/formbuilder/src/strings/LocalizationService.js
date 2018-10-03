import en from "./en.json";
import fr from "./fr.json";

const langs = {
  en,
  fr
};

export const getString = (locale ='en') => {
    return langs[locale];
}