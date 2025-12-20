
import { Tag, Level, Activity, Profile, Project, ToolboxSnippet, Certification } from '../types';
import { localeOverrides } from './localeOverrides';

export type SupportedLocale = 'vi' | 'en';

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const mergeRecords = <T extends Record<string, any>>(base: T, override?: Partial<T>): T => {
  if (!override) {
    return { ...base };
  }
  const result: Record<string, any> = { ...base };
  Object.entries(override).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      result[key] = [...value];
    } else if (isPlainObject(value) && isPlainObject(base[key])) {
      result[key] = mergeRecords(base[key], value as Record<string, any>);
    } else {
      result[key] = value;
    }
  });
  return result as T;
};

export const profileData: Profile = {
  full_name: "Loc Huu Thanh",
  school: "HUTECH – Đại học Công Nghệ TP.HCM",
  field: "An ninh mạng",
  current_focus: "SOC / Blue Team / Network Security",
  bio: "Sinh viên chuyên ngành An toàn thông tin. Tập trung nghiên cứu về giám sát an ninh mạng (SOC), phân tích nhật ký hệ thống và ứng cứu sự cố. Ưu tiên các giải pháp mã nguồn mở và quy trình kỹ thuật thực tế.",
  tools: ["Wireshark", "Burp Suite", "Nmap", "Linux", "Suricata", "Wazuh"],
  interests: ["Log analysis", "Detection engineering", "Network traffic analysis", "Incident response"],
  verified_achievements: [
    "Top 99 vòng sơ khảo – Cuộc thi Sinh viên An ninh mạng 2025 (Bộ Công An)",
    "Top 3 cấp trường – Sinh viên An ninh mạng 2025"
  ],
  skills: [
    { name: "Log Analysis", value: 75 },
    { name: "Traffic Analysis", value: 80 },
    { name: "Incident Response", value: 60 },
    { name: "Malware Analysis", value: 45 },
    { name: "System Admin", value: 70 },
    { name: "Threat Hunting", value: 55 }
  ]
};

export const toolboxSnippets: ToolboxSnippet[] = [
  {
    title: "SSH Brute-force Detection (Wazuh)",
    tool: "Wazuh",
    description: "Rule tùy chỉnh phát hiện 10 lần login thất bại từ cùng một IP trong 2 phút.",
    code: `<rule id="100001" level="10">\n  <if_sid>5712</if_sid>\n  <match>Failed password</match>\n  <frequency>10</frequency>\n  <timeframe>120</timeframe>\n  <description>Possible SSH Brute-force Attack</description>\n</rule>`
  },
  {
    title: "Filter HTTP Data (Wireshark)",
    tool: "Wireshark",
    description: "Lọc các gói tin HTTP chứa dữ liệu nhạy cảm hoặc request lạ.",
    code: `http.request.method == "POST" && !(http.content_type contains "image")`
  }
];

export const activitiesData: Activity[] = [
  {
    slug: "2025-06-20-cyber-student-2025",
    date: "2025-06-20",
    title: "Vòng chung kết Cuộc thi \"Sinh viên với ATTT 2025\"",
    tags: [Tag.CTF, Tag.CERT],
    level: Level.INTERMEDIATE,
    tools_used: ["Linux", "Wireshark", "Burp Suite"],
    what_i_did: [
      "Giải quyết các thử thách Web Exploitation liên quan đến IDOR và Path Traversal",
      "Phân tích tệp PCAP trong mảng Forensics để tìm kiếm dấu hiệu exfiltration",
      "Sử dụng công cụ Reverse Engineering cơ bản để trích xuất flag từ binary",
      "Phân tích challenge Crypto (RSA/One-Time Pad) để khôi phục flag"
    ],
    what_i_learned: [
      "Nhận diện nhanh hướng xử lý các bài toán đưa ra trong môi trường CTF"
    ],
    verification: {
      id: "TEAM_2,20E+06",
      note: "Xác thực qua Dashboard cuộc thi"
    },
    next_step: "Tập trung sâu hơn vào mảng Web Exploitation và Forensics.",
    images: [
      "https://cdn.save.moe/b/bv1uiY.jpg",
      "https://cdn.save.moe/b/lGnIlP.jpg",
      "https://cdn.save.moe/b/E0hS9Ns.jpg",
      "https://cdn.save.moe/b/FhrHUL1.jpg",
      "https://cdn.save.moe/b/bv1uiY.jpg"
    ]
  },
  {
    slug: "2025-06-06-wazuh-deployment-lab",
    date: "2025-06-06",
    title: "Cuộc thi CTF - The Maze of Shadows 2025",
    tags: [Tag.CERT, Tag.CTF],
    level: Level.INTERMEDIATE,
    tools_used: ["Wireshark", "Linux", "Burp Suite"],
    what_i_did: [
      "Giải các thử thách liên quan đến phân tích lưu lượng mạng và web application để tìm flag",
      "Điều tra các file forensics và phân tích pcap để khai thác thông tin ẩn giấu",
      "Tìm kiếm các lỗ hổng bảo mật và sử dụng công cụ reverse engineering cơ bản",
      "Áp dụng các kỹ thuật tấn công mạng và phân tích mã hóa để khôi phục flag"
    ],
    what_i_learned: [
      "Nắm bắt thêm được các lỗ hổng bảo mật thường gặp trong ứng dụng web và hệ thống mạng"
    ],
    verification: {
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      note: "Wazuh Alert ID: 1582930122.341"
    },
    next_step: "Tích hợp thêm Suricata để tăng cường khả năng IDS cho hệ thống.",
    images: [
      "https://cdn.save.moe/b/jYNN2lz7.jpg",
      "https://cdn.save.moe/b/8a5Uz2.png",
      "https://b.anhmoecdn.run/8FAowZT.jpg",
      "https://cdn.save.moe/b/RbQH9cZg.jpg"
    ]
  },
  {
    slug: "2025-05-31-ai-security-workshop",
    date: "2025-05-31",
    title: "Hội thảo 'Trí tuệ nhân tạo trong bài toán An ninh mạng'",
    tags: [Tag.NOTE],
    level: Level.INTERMEDIATE,
    tools_used: ["MITRE ATT&CK", "Python", "Azure Sentinel"],
    what_i_did: [
      "Tham gia bàn tròn về cách AI hỗ trợ phân loại cảnh báo SOC",
      "Ghi chú demo mô hình phát hiện bất thường ngay tại phòng E201.01",
      "Kết nối với đội nghiên cứu Khoa CNTT để trao đổi dữ liệu huấn luyện"
    ],
    what_i_learned: [
      "Lợi ích của việc kết hợp rule-based detection với mô hình học máy",
      "Cách chuẩn hóa log trước khi đưa vào pipeline AI"
    ],
    verification: {
      note: "Ghi danh nội bộ tại E201.01 – Khoa CNTT"
    },
    next_step: "Thử áp dụng mô hình phân loại anomaly vào bộ log của lab Wazuh.",
    images: ["https://cdn.save.moe/b/23y4nm.png"]
  },
  {
    slug: "2025-03-07-dev-to-pm",
    date: "2025-03-07",
    title: "Định hướng & phát triển từ Developer trở thành Project Manager",
    tags: [Tag.NOTE],
    level: Level.BASIC,
    tools_used: ["Notion", "Miro", "Jira"],
    what_i_did: [
      "Tổng hợp lộ trình skillset từ coding sang quản lý dự án",
      "Rèn luyện kỹ năng trình bày roadmap ngay tại E201.01",
      "Thực hành mô phỏng sprint planning với mentor doanh nghiệp"
    ],
    what_i_learned: [
      "PM vẫn cần nền tảng kỹ thuật để nói chuyện với dev team",
      "Các chỉ số cần bám sát khi chuyển giao sprint"
    ],
    verification: {
      note: "Sự kiện nội bộ Khoa CNTT"
    },
    next_step: "Ôn lại kỹ thuật estimation để hỗ trợ CLB khi chạy dự án thực tế.",
    images: ["https://cdn.save.moe/b/ojy3BI.png"]
  },
  {
    slug: "2024-12-20-it-got-talent",
    date: "2024-12-20",
    title: "HUTECH IT GOT TALENT & Định hướng nghề IT",
    tags: [Tag.NOTE],
    level: Level.BASIC,
    tools_used: ["Canva", "PowerPoint", "OBS"],
    what_i_did: [
      "Phỏng vấn nhanh các đội thi để ghi nhận kinh nghiệm chuyển ngành",
      "Đúc kết checklist chuyển ngành CNTT dành cho sinh viên năm 2"
    ],
    what_i_learned: [
      "Góc nhìn thực tế về nhu cầu nhân sự IT đa lĩnh vực",
      "Kinh nghiệm kể chuyện khi pitching ý tưởng an ninh mạng"
    ],
    verification: {
      note: "Lễ trao giải thuộc Khoa CNTT"
    },
    next_step: "Hoàn thiện bài viết chia sẻ định hướng nghề cho blog cá nhân.",
    images: ["https://cdn.save.moe/b/ndyyMUtl.png"]
  },
  {
    slug: "2023-12-23-ve-uoc-mo",
    date: "2023-12-23",
    title: "Hoạt động tình nguyện 'Vẽ Ước Mơ'",
    tags: [Tag.NOTE],
    level: Level.BASIC,
    tools_used: ["Canva", "Google Drive"],
    what_i_did: [
      "Phối hợp BCH Đoàn Hội tổ chức workshop vẽ cho trẻ em",
      "Ghi nhận nhu cầu truyền thông và chuyển thành nội dung social",
      "Quản lý thư viện ảnh sự kiện để bàn giao lại cho CLB"
    ],
    what_i_learned: [
      "Tăng kỹ năng làm việc nhóm ngoài môi trường kỹ thuật",
      "Cách lên kế hoạch hậu cần khi không có nhiều thiết bị"
    ],
    verification: {
      note: "BCH Đoàn Hội xác nhận số giờ tình nguyện"
    },
    next_step: "Xây bộ template truyền thông để tái sử dụng cho các đợt tiếp theo.",
    images: ["https://cdn.save.moe/b/F181ep.png"]
  },
  {
    slug: "2023-12-16-it-sports-day",
    date: "2023-12-16",
    title: "Hội thao Khoa Công Nghệ Thông Tin",
    tags: [Tag.LAB],
    level: Level.BASIC,
    tools_used: ["Excel", "Power BI", "GoPro"],
    what_i_did: [
      "Ghi hình các trận đấu và đồng bộ dữ liệu với ban thư ký",
      "Thiết kế dashboard theo dõi điểm ngay trong ngày thi đấu",
      "Hỗ trợ kỹ thuật livestream nội bộ cho Khoa CNTT"
    ],
    what_i_learned: [
      "Tổ chức sự kiện lớn cần luồng dữ liệu rõ ràng",
      "Việc chia sẻ dữ liệu real-time giúp BTC ra quyết định nhanh"
    ],
    verification: {
      note: "Khoa CNTT xác nhận nhiệm vụ truyền thông"
    },
    next_step: "Chuẩn hóa quy trình thu thập dữ liệu sự kiện để áp dụng cho hackathon.",
    images: ["https://cdn.save.moe/b/s6cyeuA.png"]
  },
  {
    slug: "2023-05-13-writing-workshop",
    date: "2023-05-13",
    title: "Hội thảo kỹ năng 'Thể thức và kỹ thuật trình bày văn bản'",
    tags: [Tag.NOTE],
    level: Level.BASIC,
    tools_used: ["Google Docs", "LaTeX", "Grammarly"],
    what_i_did: [
      "Ôn lại chuẩn trình bày báo cáo theo format nhà trường",
      "Thử chuyển đổi tài liệu kỹ thuật sang bản song ngữ",
      "Trao đổi với giảng viên về mẹo quản lý version tài liệu"
    ],
    what_i_learned: [
      "Các lỗi trình bày khiến báo cáo chuyên môn mất điểm",
      "Cách viết mô tả kỹ thuật rõ ràng hơn cho người không chuyên"
    ],
    verification: {
      note: "Phòng E305.01 – Khoa CNTT"
    },
    next_step: "Áp dụng quy chuẩn mới vào tài liệu dự án SOC Lab.",
    images: ["https://cdn.save.moe/b/ZCKJvw.png"]
  },
  {
    slug: "2022-11-04-it-welcome-day",
    date: "2022-11-04",
    title: "Ngày hội 'HUTECH IT WELCOME DAY'",
    tags: [Tag.NOTE],
    level: Level.BASIC,
    tools_used: ["Figma", "Premiere Pro", "OBS"],
    what_i_did: [
      "Đảm nhận khu trải nghiệm SOC mini cho tân sinh viên",
      "Chuẩn bị video giới thiệu CLB an ninh mạng chiếu tại sảnh E1",
      "Thu thập thông tin quan tâm của tân sinh viên để mời tham gia đội ngũ"
    ],
    what_i_learned: [
      "Tân sinh viên cần demo trực quan để hiểu về SOC",
      "Các hoạt động on-boarding phải có follow-up rõ ràng"
    ],
    verification: {
      note: "Sảnh E1 – Khoa CNTT"
    },
    next_step: "Lên kế hoạch mentor 1-1 cho các bạn đăng ký với đội SOC Lab.",
    images: ["https://cdn.save.moe/b/gt26fu.png"]
  }
];

export const projectsData: Project[] = [
  {
    slug: "wazuh-elk-ml-attack-detection",
    title: "Network Attack Detection – Wazuh + ELK + ML",
    tags: [Tag.PROJECT, Tag.LAB],
    tools: ["Wazuh", "Elastic Stack", "Wireshark", "Python/ML"],
    description: "Đồ án triển khai pipeline phát hiện tấn công mạng gồm Wazuh agent -> Elastic (ELK) -> mô hình ML. Thu thập log real-time, chuẩn hóa sự kiện và áp dụng phân loại bất thường để gắn mức cảnh báo cho SOC dashboard.",
    images: [
      "https://cdn.save.moe/b/v3YiRFRd.png",
      "https://cdn.save.moe/b/fqmAiJzm.jpg",
      "https://cdn.save.moe/b/Orufjf.png",
      "https://cdn.save.moe/b/lKy7EmXK.png"
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    slug: "google-gemini-certified-university-student",
    title: "Gemini Certified University Student",
    issuer: "Google for Education",
    date: "2025-12-12",
    verification_url: "https://www.credential.net/2440b331-efe5-4ccc-a6ad-279ef185495b",
    description: "Chứng nhận xác thực khả năng trình bày kiến thức cơ bản về Generative AI và sử dụng Gemini trong môi trường học thuật. Hiệu lực đến 12/2028.",
    image: "https://pdf.ms.credential.net/v2/certificate/image?env=production&credential=z1pa6spw&variant=medium"
  },
  {
    slug: "isc2-certified-in-cybersecurity",
    title: "Certified in Cybersecurity (CC)",
    issuer: "ISC2",
    date: "2024-12-15",
    verification_url: "https://www.credly.com",
    description: "Chứng chỉ cơ bản về nguyên lý bảo mật, điều khiển truy cập, an ninh mạng và hoạt động bảo mật.",
    image: "https://picsum.photos/seed/cert1/600/400"
  },
  {
    slug: "thm-soc-level-1",
    title: "SOC Level 1 Path",
    issuer: "TryHackMe",
    date: "2024-10-10",
    verification_url: "https://tryhackme.com",
    description: "Hoàn thành lộ trình đào tạo chuyên sâu về SOC, bao gồm phân tích log, sử dụng SIEM (Splunk/ELK), và Digital Forensics.",
    image: "https://picsum.photos/seed/cert2/600/400"
  },
  {
    slug: "google-cybersecurity-professional",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Coursera / Google",
    date: "2024-08-01",
    verification_url: "https://coursera.org",
    description: "Chương trình đào tạo 8 khóa học về Python, SQL, Linux, IDS, SIEM và quản lý rủi ro.",
    image: "https://picsum.photos/seed/cert3/600/400"
  }
];

export const getLocalizedContent = (locale: SupportedLocale) => {
  if (locale === 'vi') {
    return {
      profileData,
      toolboxSnippets,
      activitiesData,
      projectsData,
      certificationsData
    } as const;
  }

  const overrides = localeOverrides[locale];

  return {
    profileData: mergeRecords(profileData, overrides?.profileData),
    toolboxSnippets: toolboxSnippets.map(snippet =>
      mergeRecords(snippet, overrides?.toolboxSnippets?.[snippet.title])
    ),
    activitiesData: activitiesData.map(activity =>
      mergeRecords(activity, overrides?.activities?.[activity.slug])
    ),
    projectsData: projectsData.map(project =>
      mergeRecords(project, overrides?.projects?.[project.slug])
    ),
    certificationsData: certificationsData.map(cert =>
      mergeRecords(cert, overrides?.certifications?.[cert.slug])
    )
  } as const;
};
