import { Activity, Certification, Profile, Project, ToolboxSnippet } from '../types';

type ActivityOverrides = Partial<Activity>;
type ProjectOverrides = Partial<Project>;
type CertificationOverrides = Partial<Certification>;
type ToolboxOverrides = Partial<ToolboxSnippet>;
type ProfileOverrides = Partial<Profile>;

type LocaleOverrideMap = {
  profileData?: ProfileOverrides;
  activities?: Record<string, ActivityOverrides>;
  projects?: Record<string, ProjectOverrides>;
  certifications?: Record<string, CertificationOverrides>;
  toolboxSnippets?: Record<string, ToolboxOverrides>;
};

export const localeOverrides: Partial<Record<'vi' | 'en', LocaleOverrideMap>> = {
  en: {
    profileData: {
      school: 'HUTECH – Ho Chi Minh City University of Technology',
      field: 'Cybersecurity',
      current_focus: 'SOC / Blue Team / Network Security',
      bio: 'Cybersecurity student focusing on SOC operations, log analytics, and incident response playbooks. I enjoy working with open-source stacks, hardening detection pipelines, and translating security telemetry into actionable insights.',
      verified_achievements: [
        'Top 99 nationwide qualifier – Cybersecurity Student Contest 2025 (Ministry of Public Security)',
        'Top 3 campus ranking – Cybersecurity Student Contest 2025'
      ]
    },
    toolboxSnippets: {
      'SSH Brute-force Detection (Wazuh)': {
        description: 'Custom rule that flags 10 failed SSH logins from the same IP within 2 minutes.'
      },
      'Filter HTTP Data (Wireshark)': {
        description: 'Filters HTTP POST traffic that might carry sensitive payloads for faster triage.'
      }
    },
    activities: {
      '2025-06-20-cyber-student-2025': {
        title: 'Cybersecurity Student Contest 2025 – Finals',
        what_i_did: [
          'Solved Web Exploitation challenges centered on IDOR and Path Traversal.',
          'Parsed PCAP files in the Forensics track to look for exfiltration traces.',
          'Used lightweight reverse engineering to pull flags from binary challenges.',
          'Cracked RSA and One-Time Pad crypto tasks to recover the final flag.'
        ],
        what_i_learned: [
          'Sharpened my ability to reason through CTF attack paths under time pressure.'
        ],
        verification: {
          id: 'TEAM_2,20E+06',
          note: 'Verified through the official contest dashboard.'
        },
        next_step: 'Go deeper into Web Exploitation and Forensics playbooks.'
      },
      '2025-06-06-wazuh-deployment-lab': {
        title: 'CTF – The Maze of Shadows 2025',
        what_i_did: [
          'Worked through traffic-analysis and web puzzles to uncover hidden flags.',
          'Investigated forensic disk files and PCAP captures to extract indicators.',
          'Enumerated common vulnerabilities and ran small reverse engineering drills.',
          'Applied network attack simulations and crypto analysis to retrieve encrypted flags.'
        ],
        what_i_learned: [
          'Better awareness of recurring web and infrastructure weaknesses inside CTF labs.'
        ],
        verification: {
          hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          note: 'Wazuh Alert ID: 1582930122.341'
        },
        next_step: 'Integrate Suricata into the lab to extend IDS coverage.'
      },
      '2025-05-31-ai-security-workshop': {
        title: 'AI Workshop – Applying AI to Security Operations',
        what_i_did: [
          'Joined a round-table on how AI can assist SOC alert triage.',
          'Captured notes from an anomaly-detection demo hosted in room E201.01.',
          'Synced with the IT faculty research team about sharing training datasets.'
        ],
        what_i_learned: [
          'Blending rule-based detection with machine learning scoring increases fidelity.',
          'Log normalization is critical before feeding data into any AI pipeline.'
        ],
        verification: {
          note: 'Internal registration by the IT Faculty – room E201.01.'
        },
        next_step: 'Prototype an anomaly classifier on top of my Wazuh log set.'
      },
      '2025-03-07-dev-to-pm': {
        title: 'Career Talk – From Developer to Project Manager',
        what_i_did: [
          'Mapped the skillset needed to transition from coding into project leadership.',
          'Practiced pitching a roadmap directly in room E201.01.',
          'Simulated sprint planning with mentors from partner companies.'
        ],
        what_i_learned: [
          'Project managers still need technical depth to communicate with dev teams.',
          'Key delivery metrics to monitor when handing over each sprint increment.'
        ],
        verification: {
          note: 'Internal IT Faculty session.'
        },
        next_step: 'Review estimation techniques to help my club execute real projects.'
      },
      '2024-12-20-it-got-talent': {
        title: 'HUTECH IT Got Talent & Career Orientation',
        what_i_did: [
          'Supported the presentation stack during the award show in room E305.01.',
          'Interviewed teams to collect insights for an IT career checklist for sophomores.'
        ],
        what_i_learned: [
          'Practical view of multi-domain IT talent demand.',
          'Storytelling tactics when pitching a security-focused idea.'
        ],
        verification: {
          note: 'Award ceremony organized by the IT Faculty.'
        },
        next_step: 'Publish the career-orientation recap on my blog.'
      },
      '2023-12-23-ve-uoc-mo': {
        title: "Volunteer Drive – 'Drawing Dreams'",
        what_i_did: [
          'Coordinated an art workshop for kids with the Student Union.',
          'Captured communication requirements and turned them into social content.',
          'Managed the event photo library before handing it over to the club.'
        ],
        what_i_learned: [
          'Improved teamwork outside of technical circles.',
          'How to plan logistics when equipment is limited.'
        ],
        verification: {
          note: 'Volunteer hours confirmed by the Student Union.'
        },
        next_step: 'Build reusable media templates for future volunteer campaigns.'
      },
      '2023-12-16-it-sports-day': {
        title: 'IT Faculty Sports Day',
        what_i_did: [
          'Recorded matches and synced footage with the scoring desk.',
          'Designed a live scoreboard dashboard for same-day updates.',
          'Supported the internal livestream setup for the faculty.'
        ],
        what_i_learned: [
          'Large events need clearly defined data flows.',
          'Sharing live data helps organizers make faster calls.'
        ],
        verification: {
          note: 'Task assignment verified by the IT Faculty.'
        },
        next_step: 'Standardize event data collection for future hackathons.'
      },
      '2023-05-13-writing-workshop': {
        title: "Writing Workshop – 'Formatting & Presentation Skills'",
        what_i_did: [
          'Reviewed the official format for university technical reports.',
          'Practiced translating technical docs into bilingual versions.',
          'Discussed version-control tips for documentation with lecturers.'
        ],
        what_i_learned: [
          'Common formatting mistakes that hurt professional reports.',
          'How to explain technical content more clearly to non-specialists.'
        ],
        verification: {
          note: 'Room E305.01 – IT Faculty.'
        },
        next_step: 'Apply the refreshed formatting rules to the SOC Lab documentation.'
      },
      '2022-11-04-it-welcome-day': {
        title: "HUTECH IT 'Welcome Day'",
        what_i_did: [
          'Ran a mini SOC experience booth for freshmen.',
          'Produced a short video introducing the cybersecurity club at lobby E1.',
          'Collected newcomer interests to invite them into the SOC Lab team.'
        ],
        what_i_learned: [
          'Hands-on demos help freshmen understand SOC workflows.',
          'Onboarding activities need clear follow-up steps.'
        ],
        verification: {
          note: 'Lobby E1 – IT Faculty.'
        },
        next_step: 'Plan 1-1 mentoring slots for students who signed up for the SOC Lab.'
      }
    },
    projects: {
      'wazuh-elk-ml-attack-detection': {
        title: 'Network Attack Detection – Wazuh + ELK + ML',
        description: 'Built a full detection pipeline where Wazuh agents forward telemetry into Elastic, events are normalized, and an ML classifier labels anomalies. Dashboards highlight actionable alerts for SOC-style operations.'
      }
    },
    certifications: {
      'google-gemini-certified-university-student': {
        description: 'Validates the ability to explain generative AI fundamentals and Gemini features in an academic setting. Credential issued by Google for Education and valid through 12/2028.'
      },
      'isc2-certified-in-cybersecurity': {
        description: 'Entry-level ISC2 certification covering security principles, access control, network security, and incident response basics.'
      },
      'thm-soc-level-1': {
        description: 'Completed the TryHackMe SOC Level 1 learning path focused on log analysis, SIEM usage, and digital forensics drills.'
      },
      'google-cybersecurity-professional': {
        description: 'Eight-course Google program spanning Python, SQL, Linux, IDS/SIEM tooling, and practical risk management.'
      }
    }
  }
};
