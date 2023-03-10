export const collegeNames = [
	"IIT Dhanbad",
	"IIT Kharagpur",
	"IIT Bombay",
	"IIT Kanpur",
	"IIT Madras",
	"IIT Delhi",
	"IIT Guwahati",
	"IIT Roorkee",
	"IIT Bhubaneswar",
	"IIT Gandhinagar",
	"IIT Hyderabad",
	"IIT Jodhpur",
	"IIT Patna",
	"IIT Ropar",
	"IIT Varanasi",
	"IIT Indore",
	"IIT Mandi",
	"IIT Palakkad",
	"IIT Tirupati",
	"IIT Bhilai",
	"IIT Jammu",
	"IIT Dharwad",
	"IIT Goa",
];

export const fieldOfStudies = [
	"Mechanical Engineering",
	"Aerospace Engineering",
	"Biomedical Engineering",
	"Biomechanical Engineering",
	"Automotive Engineering",
	"Civil Engineering",
	"Structural Engineering",
	"Architectural Engineering",
	"Electrical Engineering",
	"Computer Engineering",
	"Electronics Engineering",
	"Mechatronics Engineering",
	"Robotics Engineering",
	"Microelectronic Engineering",
	"Chemical Engineering",
	"Environmental Engineering",
	"Materials Science Engineering",
	"Agricultural Engineering",
	"Paper Engineering",
	"Industrial Engineering",
	"Manufacturing Engineering",
	"Petroleum Engineering",
	"Geological Engineering",
	"Nuclear Engineering",
	"Marine Engineering",
	"Nanotechnology Engineering",
	"Mining Engineering",
	"Ceramics Engineering",
	"Metallurgical Engineering",
];

export const skillsets = [
	"C",
	"C++",
	"C#",
	"Java",
	"Python",
	"PostgresSQL",
	"HTML",
	"CSS",
	"Assembly Language",
	"JavaScript",
	"NodeJS",
	"AngularJS",
	"ReactJS",
	"SQL",
	"ADO.NET",
	"ASP.NET",
	"MVC",
	"WCF",
	"WPF",
	"WebService",
	"Firebase",
	"Azure",
	"AWS",
	"Blockchain",
	"AI",
	"Redux",
	"Kotlin",
	"SpringBoot",
	"Golang",
	"VueJs",
	"Ionic",
	"Ruby",
	"TypeScript",
	"Ada",
	"Cobol",
	"Erlang",
	"PHP",
	"MATLAB",
	"Scala",
	"SQLServer",
	"MySQL",
	"PLSQL",
	"Julia",
	"Ballerina",
	"Speakeasy",
	"VBScript",
	"VisualBasic",
	"Abap",
	"Haskell",
	"FORTRAN",
	"Simula",
	"Eiffel",
	"Rust",
	"Groovy",
	"Delphi",
	"Elixir",
	"Basic",
	"Smalltalk",
	"Rebol",
	"Swift",
	"Dart",
	"Perl",
	"Pascal",
	"Alice",
	"Prolog",
	"Scratch",
	"WebAssembly",
	"Clojure",
	"F#",
	"Shell",
	"Bash",
	"Assembly",
	"NextJS",
	"Bootstrap",
	"MaterialUI",
	"AntDesign",
	"Bumla",
	"less",
	"sass",
	"DevOps",
	"GoogleCloud",
	"GCP",
	"Azure",
	"AWS",
];

export const CompanyAccountType = Object.freeze({
	Guest: "GCA", //Guest Company Account
	Free: "FCA", //Free Company Account
	Paid: "PCA", //Paid Company Account
	GALKAdmin: "ADMN", //GALK ADMIN Company Account
	Unknown: "UCA", //Unknown Company Account
	Demo: "DEMO", //Demo company account
});

export const RestrictedCompanyAccountType = [
	CompanyAccountType.Free,
	CompanyAccountType.Guest,
	CompanyAccountType.Unknown,
	CompanyAccountType.Demo,
];

export const CompanyUserAccountType = Object.freeze({
	Member: "CMU", //Company Member User
	Admin: "CAU", //Company Admin User
	Unknown: "CUU", //Company Unknown User
});

export const AuthTypeEmails = Object.freeze({
	SuperAdminEmail: "galkadmn@gmail.com", //Company Member User
});

export const displayRestrictionAccounts = [
	CompanyAccountType.Free,
	CompanyAccountType.Guest,
	CompanyAccountType.Unknown,
	// CompanyAccountType.GALKAdmin
];

export const actionRestrictionAccounts = [
	CompanyAccountType.Free,
	CompanyAccountType.Guest,
	CompanyAccountType.Unknown,
];

export const defaultCompanyLogoURL =
	"https://firebasestorage.googleapis.com/v0/b/piit-52003.appspot.com/o/CompanyLogo%2FDefaultCompanyLogo.png?alt=media&token=78a96b07-1061-4985-9cee-fd695c857759";

export const defaultCompanyCoverPhoto =
	"https://firebasestorage.googleapis.com/v0/b/piit-52003.appspot.com/o/CompanyCoverPhoto%2FDefaultCompanyCoverPhoto.jpg?alt=media&token=5953ae3a-b737-46e7-8d52-28f56c3065bf";

export const defaultAccountUserListEntry = {
	id: "",
	role: "Admin",
	active: true,
	name: "",
	email: "",
	approvalStatus: "Approved",
	accountType: CompanyUserAccountType.Admin,
};

export const newCompanyDefaultData = {
	id: "",
	name: "",
	nameInEnglish: "",
	email: "",
	website: "",
	do: "",
	description: "",
	address: "",
	founder: "",
	size: "",
	industry: "",
	logo: defaultCompanyLogoURL,
	coverPhoto: defaultCompanyCoverPhoto,
	accountUserList: [],
	points: 0,
	rank: 0,
	paidAccount: false,
	accountType: CompanyAccountType.Guest,
	taggedCandidatesForInternship: [],
	freelanceJobsIds: [],
	GALKLabJobsIds: [],
	followingCandidateForFreelance: [],
	followingCandidateForGALKLab: [],
	shortlistedCandidateForFreelance: [],
	shortlistedCandidateForGALKLab: [],
	interviewRequestedCandidateForFreelance: [],
	interviewRequestedCandidateForGALKLab: [],
	selectedCandidateForFreelance: [],
	selectedCandidateForGALKLab: [],
	internshipJobsIds: [],
	followingCandidateForInternship: [],
	shortlistedCandidateForInternship: [],
	interviewRequestedCandidateForInternship: [],
	selectedCandidateForInternship: [],
	internshipLiveProjectIds: [],
	recommendedCurrentStudents: [],
	recommendedPastStudents: [],
	visitorList: [],
};

export const languageCode = {
	ENGLISH: "EN",
	JAPANESE: "JA",
};

export const projectTypeOptions = [
	"Web development",
	"Android development",
	"Backend development",
	"iOS app development",
	"AI",
	"NLP",
];
