
import { Tag, Level, Activity } from './types';

export const profileBio = {
  name: "Loc Huu Thanh",
  university: "HUTECH – Đại học Công Nghệ TP.HCM",
  major: "An toàn thông tin & An ninh mạng",
  focus: "SOC / Blue Team / Network Security",
  bio: "Sinh viên chuyên ngành An toàn thông tin tại HUTECH, định hướng chuyên sâu về SOC và Blue Team. Tập trung nghiên cứu phân tích log, vận hành hệ thống phát hiện xâm nhập (IDS) và thực hành phân tích lưu lượng mạng.",
  tools: ["Wireshark", "Burp Suite", "Nmap", "Linux", "Suricata", "Wazuh"],
  links: [
    { label: "GitHub", url: "#" },
    { label: "LinkedIn", url: "#" }
  ]
};

export const activities: Activity[] = [
  {
    slug: "2025-03-01-cybersecurity-student-competition",
    date: "2025-03-01",
    title: "Cybersecurity Student Competition 2025 – Preliminary Round",
    tags: [Tag.CTF, Tag.CERT],
    level: Level.INTERMEDIATE,
    tools_used: ["Linux", "Wireshark", "Python"],
    what_i_did: [
      "Tham gia vòng sơ khảo cuộc thi Sinh viên An ninh mạng 2025 do Bộ Công An tổ chức.",
      "Giải các thử thách Jeopardy thuộc mảng Web, Crypto, Forensics và Reverse cơ bản.",
      "Phân tích file pcap để tìm mã độc trong mảng Forensics.",
      "Vận dụng kiến thức Linux Command Line để trích xuất dữ liệu từ disk image."
    ],
    what_i_learned: [
      "Phương pháp quản lý thời gian và ưu tiên bài tập dựa trên điểm số trong môi trường áp lực cao.",
      "Cách thức bóc tách các layer của một file log hệ thống bị can thiệp.",
      "Tư duy phản biện khi đối mặt với các kịch bản tấn công ứng dụng Web thực tế."
    ],
    next_step: "Tập trung sâu hơn vào mảng Forensics và Incident Response để chuẩn bị cho các kỳ thi Blue Team.",
    images: ["https://picsum.photos/seed/ctf/800/450"],
    verification: {
      note: "Top 99 vòng sơ khảo toàn quốc, Top 3 cấp trường"
    }
  },
  {
    slug: "2025-03-05-suricata-ids-lab",
    date: "2025-03-05",
    title: "Vận hành và cấu hình Suricata IDS trên Ubuntu Server",
    tags: [Tag.LAB],
    level: Level.BASIC,
    tools_used: ["Suricata", "Ubuntu", "hping3", "nmap"],
    what_i_did: [
      "Cài đặt Suricata trên môi trường Ubuntu 22.04 LTS.",
      "Cấu hình file suricata.yaml để giám sát interface mạng cụ thể.",
      "Viết custom rules để phát hiện các truy vấn HTTP không hợp lệ.",
      "Kiểm tra tính đúng đắn của rule bằng công cụ hping3 và nmap."
    ],
    what_i_learned: [
      "Cấu trúc logic của một Suricata rule bao gồm Action, Header và Options.",
      "Sự khác biệt giữa Fast Log và EVE JSON log trong việc phân tích sự kiện mạng.",
      "Tối ưu hóa performance IDS thông qua việc tinh chỉnh MTU và checksum offloading."
    ],
    next_step: "Tích hợp log từ Suricata vào Wazuh SIEM để tập trung hóa quản lý sự kiện.",
    images: []
  },
  {
    slug: "2025-03-10-wireshark-http-analysis",
    date: "2025-03-10",
    title: "Phân tích lưu lượng HTTP/HTTPS qua Wireshark",
    tags: [Tag.READING, Tag.NOTE],
    level: Level.INTERMEDIATE,
    tools_used: ["Wireshark", "VirusTotal", "SSLKEYLOGFILE"],
    what_i_did: [
      "Phân tích file pcap chứa lưu lượng truy cập Web bị nhiễm malware.",
      "Sử dụng Filter expressions để lọc TLS Handshake và HTTP POST requests.",
      "Export các object nhị phân nghi vấn từ file pcap.",
      "Đối chiếu hash của file trích xuất với cơ sở dữ liệu VirusTotal."
    ],
    what_i_learned: [
      "Quy trình phân tích dòng chảy dữ liệu (Follow TCP Stream) để hiểu kịch bản tấn công.",
      "Dấu hiệu nhận biết C2 beaconing thông qua tần suất kết nối đều đặn trong log.",
      "Hạn chế của việc phân tích lưu lượng đã mã hóa khi không có private key."
    ],
    next_step: "Thực hành giải mã lưu lượng SSL/TLS bằng cách sử dụng SSLKEYLOGFILE.",
    images: []
  }
];
