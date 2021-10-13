const setupData = [
  {
    projectId: "abc",
    projectDesc: "Damien's description from the server...",

    partners: 1,
    lead: "james@xyx.com",
    pOne: "",
    pTwo: "",
    leadId: "", // required for updates to linked information (projects?)
    pOneId: "",
    pTwoId: "",
    color: "",

    maxProjectLength: 36,
    maxWorkPackages: 10,
    maxDeadlines: 10,
    maxTasksPerPackage: 10,

    maxTeamMembers: 10,
    maxSubcontract: 5,
    maxMaterials: 10,
    maxTravel: 10,
    maxCapex: 10,
    maxOther: 5,

    marketOptions: ["US Market", "Asia Market"],

    materialWarn: 25,
    materialOver: 40,
    travelWarn: 25,
    travelOver: 40,
    subcontractWarn: 25,
    subcontractOver: 40,
    capexWarn: 25,
    capexOver: 40,
    otherWarn: 25,
    otherOver: 40,
    percentWarn: 25,
    percentOver: 40,

    amberSalary: 70000,
    redSalary: 90000,
    amberDayRate: 700,
    redDayRate: 1200,
    amberOverUtil: 55,
    redOverUtil: 59,

    maxMarkets: 3,
    maxStreams: 4,

    useTemplates: true,
    useAi: true,
    useDlt: true,
    useMan: true,

    useManagerial: true,
    useCommercial: true,
    useLegal: true,
    useTechnical: true,
    useEnvironmental: true,

    maxEnvRisks: 2,
    maxLegRisks: 2,
    maxComRisks: 8,
    maxTechRisks: 8,
    maxManRisks: 8,

    maxDescription: 250,
    maxMitigation: 250,
  },
];

module.exports = setupData;
