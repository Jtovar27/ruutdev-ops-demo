export type TaskStatus = "todo" | "in-progress" | "done" | "blocked";

export type Step = {
  id: string;
  label: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  location: string;
  client: string;
  dueDate: string; // ISO 8601 date string
  status: TaskStatus;
  steps: Step[];
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tasks: Task[] = [
  {
    id: "1",
    title: "Gate B12 Jetbridge Inspection",
    location: "Terminal B — Gate B12",
    client: "Horizon Air",
    dueDate: "2026-02-26",
    status: "in-progress",
    steps: [
      { id: "1-1", label: "Verify jetbridge power and lighting", completed: true },
      { id: "1-2", label: "Test door seal and weatherstripping", completed: true },
      { id: "1-3", label: "Inspect cab floor for damage or hazards", completed: false },
      { id: "1-4", label: "Confirm intercom system functionality", completed: false },
      { id: "1-5", label: "Submit inspection report to terminal ops", completed: false },
    ],
  },
  {
    id: "2",
    title: "Baggage Carousel 4 Maintenance",
    location: "Terminal A — Baggage Claim Level",
    client: "Metro Airport Authority",
    dueDate: "2026-02-25",
    status: "blocked",
    steps: [
      { id: "2-1", label: "Lock out / tag out carousel power", completed: true },
      { id: "2-2", label: "Inspect belt tension and alignment", completed: true },
      { id: "2-3", label: "Lubricate drive chain and idler rollers", completed: false },
      { id: "2-4", label: "Replace worn conveyor belt section", completed: false },
      { id: "2-5", label: "Run test cycle and verify speed settings", completed: false },
      { id: "2-6", label: "Clear LOTO and return to service", completed: false },
    ],
  },
  {
    id: "3",
    title: "Runway 28L FOD Walk",
    location: "Airside — Runway 28L / 10R",
    client: "Regional Aviation Services",
    dueDate: "2026-02-25",
    status: "done",
    steps: [
      { id: "3-1", label: "Coordinate with ATC for runway closure window", completed: true },
      { id: "3-2", label: "Assemble FOD walk crew (min. 6 personnel)", completed: true },
      { id: "3-3", label: "Walk full 3,200 m length in line formation", completed: true },
      { id: "3-4", label: "Log and bag all collected debris", completed: true },
      { id: "3-5", label: "Notify ATC — runway clear and ready", completed: true },
      { id: "3-6", label: "File FOD report with airside operations", completed: true },
    ],
  },
  {
    id: "4",
    title: "Ground Support Equipment Pre-Shift Check",
    location: "Ramp — Staging Area C",
    client: "FastRamp Handling Co.",
    dueDate: "2026-02-27",
    status: "todo",
    steps: [
      { id: "4-1", label: "Inspect all pushback tugs for fluid leaks", completed: false },
      { id: "4-2", label: "Check GPU charge levels and cable condition", completed: false },
      { id: "4-3", label: "Verify belt loader hydraulic operation", completed: false },
      { id: "4-4", label: "Confirm lavatory service truck is fully empty", completed: false },
      { id: "4-5", label: "Test radio comms on all GSE vehicles", completed: false },
    ],
  },
  {
    id: "5",
    title: "Security Checkpoint Alpha Recertification",
    location: "Terminal C — Checkpoint Alpha",
    client: "National Airport Security Bureau",
    dueDate: "2026-03-01",
    status: "todo",
    steps: [
      { id: "5-1", label: "Audit lane layout against TSA floor plan spec", completed: false },
      { id: "5-2", label: "Test all X-ray machine calibration values", completed: false },
      { id: "5-3", label: "Verify AIT scanner software version is current", completed: false },
      { id: "5-4", label: "Conduct covert test with cleared test objects", completed: false },
      { id: "5-5", label: "Review officer staffing schedule for compliance", completed: false },
      { id: "5-6", label: "Submit recertification package to compliance team", completed: false },
    ],
  },
  {
    id: "6",
    title: "Fuel Farm Tank 3 Integrity Test",
    location: "Airside South — Fuel Farm",
    client: "Apex Aviation Fueling",
    dueDate: "2026-03-03",
    status: "in-progress",
    steps: [
      { id: "6-1", label: "Issue hot-work and confined-space permits", completed: true },
      { id: "6-2", label: "Drain and purge tank 3 to safe level", completed: true },
      { id: "6-3", label: "Perform ultrasonic thickness measurements", completed: false },
      { id: "6-4", label: "Inspect internal coating and anode condition", completed: false },
      { id: "6-5", label: "Pressure-test all outlet valves", completed: false },
      { id: "6-6", label: "Refill and return to operational status", completed: false },
      { id: "6-7", label: "Update asset register and maintenance log", completed: false },
    ],
  },
  {
    id: "7",
    title: "Terminal HVAC Filter Replacement — Zone D",
    location: "Terminal D — Mechanical Rooms D-01 through D-06",
    client: "Metro Airport Authority",
    dueDate: "2026-02-28",
    status: "in-progress",
    steps: [
      { id: "7-1", label: "Pull HVAC service schedule and filter spec sheet", completed: true },
      { id: "7-2", label: "Replace MERV-14 filters in AHU D-01 and D-02", completed: true },
      { id: "7-3", label: "Replace filters in AHU D-03 and D-04", completed: false },
      { id: "7-4", label: "Replace filters in AHU D-05 and D-06", completed: false },
      { id: "7-5", label: "Bag and dispose of old filters per waste protocol", completed: false },
      { id: "7-6", label: "Log replacement dates in BMS system", completed: false },
    ],
  },
  {
    id: "8",
    title: "Emergency Evacuation Drill — Concourse E",
    location: "Concourse E — All Gates",
    client: "Regional Aviation Services",
    dueDate: "2026-03-05",
    status: "todo",
    steps: [
      { id: "8-1", label: "Brief all concourse staff on drill objectives", completed: false },
      { id: "8-2", label: "Coordinate with local fire department observer", completed: false },
      { id: "8-3", label: "Activate PA announcement and wayfinding lights", completed: false },
      { id: "8-4", label: "Time and log full concourse evacuation", completed: false },
      { id: "8-5", label: "Conduct post-drill debrief with team leads", completed: false },
      { id: "8-6", label: "Submit drill report to safety officer", completed: false },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function getTasksByStatus(status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}
