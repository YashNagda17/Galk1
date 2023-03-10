var liveProject = {
  projects: [
    {
      approvedByAdmin: false,
      assignmentURL: "",
      createdById: "",
      createdByName: "",
      createdDate: "DD/MM/YYYY",
      description: "",
      duration: 1, //no of month
      externalReference: "",
      finalRoundEndDate: "DD/MM/YYYY",
      likedBy: [],
      openingVacancyEndDate: "DD/MM/YYYY",
      projectId: "",
      projectLifecycleStatus: "", // ( OpenForStudents/SelectionInProgress/StudentFinalized)
      reward: "", // ( 30000/50000/100000 )
      selectionRoundEndDate: "DD/MM/YYYY",
      shortListedStudentList: [
        {
          answerAttachmentURL: "",
          answerDescription: "",
          applicationDate: "DD/MM/YYYY",
          applicationStatus: "", // ( NewApply/SelectedInRound1
          studentCollege: "",
          studentEmail: "",
          studentId: "",
          studentImg: "",
          studentName: ""
        }
      ],
      secondRoundAnswer: [
        {
          answerAttachmentURL: "",
          answerDescription: "",
          applicationDate: "DD/MM/YYYY",
          applicationStatus: "", // ( NewApply/AnswerSubmitted/SelectedInRound2
          studentCollege: "",
          studentEmail: "",
          studentId: "",
          studentImg: "",
          studentName: "",
          answerRepoURL: ""
        }
      ],
      finalRoundAnswer: [
        {
          answerAttachmentURL: "",
          answerDescription: "",
          applicationDate: "DD/MM/YYYY",
          applicationStatus: "", // ( NewApply/AnswerSubmitted/SelectedInRound3
          studentCollege: "",
          studentEmail: "",
          studentId: "",
          studentImg: "",
          studentName: "",
          answerRepoURL: ""
        }
      ],
      skills: ["", ""],
      teamSize: 1, //no of student in final team in numeric
      title: ""
    }
  ]
};
