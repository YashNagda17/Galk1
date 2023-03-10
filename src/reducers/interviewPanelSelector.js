export const checkIfStudentInterviewRequested = (state, studentId) => {
	const companyDetails = state.company.company;
	const interviewRequestedList =
		companyDetails.interviewRequestedCandidateForInternship || [];
	if (interviewRequestedList.find((x) => x.candidateId === studentId)) {
		return true;
	}
	return false;
};
export const checkIfStudentSelected = (state, studentId) => {
	const companyDetails = state.company.company;
	const selectedList = companyDetails.selectedCandidateForInternship || [];
	if (selectedList.find((x) => x.candidateId === studentId)) {
		return true;
	}
	return false;
};
