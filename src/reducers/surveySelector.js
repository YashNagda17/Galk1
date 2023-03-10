export const getSurveyList = state => {
  if (state.survey.surveyList) {
    return state.survey.surveyList;
  }
  return [];
};
