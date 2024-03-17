import axios from "axios";
import { useCallback } from "react";

const TranslateData = () => {
//  const cancelToken = axios.CancelToken.source();
  const getTranslationData = useCallback(async (input, languageCode, sourceLanguageCode) => {
  
    let translatedText = ""
    try {
        const { data } = await axios.post(
          "https://translation.googleapis.com/language/translate/v2?key=AIzaSyDc65oRpiIjefSwK4LIh_fudWPyTWj3exY",
          {
            q: input,
            target: languageCode,
            source: sourceLanguageCode
          },
        //   { cancelToken: cancelToken.token }
        );
    
        translatedText = data.translations[0].translatedText;
        

      } catch (error) {
        return "";
      }

    return translatedText;
    // eslint-disable-next-line
  }, []);

  return {  getTranslationData };
};

export default TranslateData;
