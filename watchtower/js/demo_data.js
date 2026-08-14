// Demo data for WatchTower when Wazuh API offline - representative from thesis testing 14 July 2025
const DEMO_ALERTS = [
{ts:"2025-07-14 10:02:12", sev:"Medium", rule:"FYP-SCAN: Nmap SYN Port Scan SID 9000001", src:"10.10.40.2", dst:"10.10.30.2", det:"Suricata", attck:"Reconnaissance T1046"},
{ts:"2025-07-14 10:19:45", sev:"Critical", rule:"Wazuh Rule 5763 SSH Brute Force", src:"10.10.40.2", dst:"10.10.30.2", det:"Wazuh", attck:"Credential Access T1110.001"},
{ts:"2025-07-14 10:34:22", sev:"Critical", rule:"FYP-SQLI: OR 1=1 SID 9000003 + 31103", src:"10.10.40.2", dst:"10.10.30.2", det:"Suricata+Wazuh", attck:"Initial Access T1190"},
{ts:"2025-07-14 10:52:07", sev:"High", rule:"FYP-DOS: ICMP Flood SID 9000005", src:"10.10.40.2", dst:"10.10.30.2", det:"Suricata", attck:"Impact T1499"},
{ts:"2025-07-14 11:08:33", sev:"Critical", rule:"Rule 550 FIM /etc/passwd checksum changed", src:"10.10.30.2", dst:"10.10.30.2", det:"Wazuh FIM", attck:"Persistence T1098"},
{ts:"2025-07-14 11:08:34", sev:"Critical", rule:"Rule 591 Anti-forensics log truncated", src:"10.10.30.2", dst:"10.10.30.2", det:"Wazuh", attck:"Defense Evasion"},
{ts:"2025-07-14 11:24:15", sev:"Medium", rule:"FYP-RECON DNS Enumeration SID 9000006 + AXFR 9000008", src:"10.10.40.2", dst:"10.10.30.2", det:"Suricata", attck:"Reconnaissance T1590.002"}
];
const DEMO_FW = [
{ts:"10:02:11", act:"BLOCK", src:"10.10.40.2", dst:"10.10.30.2", proto:"TCP", port:"22", zone:"ATK->MON", rule:"ZT-DENY: Attack Zone -> SIEM isolated"},
{ts:"10:02:12", act:"BLOCK", src:"10.10.40.2", dst:"10.10.10.10", proto:"TCP", port:"22", zone:"ATK->LAN", rule:"ZT-DENY: Attack Zone -> LAN isolated"},
{ts:"10:34:22", act:"ALLOW", src:"10.10.40.2", dst:"10.10.10.10", proto:"TCP", port:"80", zone:"ATK->LAN", rule:"ZT-TEST: Controlled HTTP"},
];
const DEMO_COMPLIANCE = [
{name:"NIST SP 800-207 ZTA", score:95, status:"PASS"},
{name:"PCI-DSS v4.0", score:87, status:"PASS"},
{name:"NIST CSF 2.0", score:82, status:"PASS"},
{name:"CBN Cybersecurity Framework", score:81, status:"PASS"},
{name:"ISO/IEC 27001:2022", score:79, status:"PASS"},
{name:"GDPR/NDPR", score:74, status:"WARN"}
];
const DEMO_FORENSIC = [
{ts:"10:02:12", type:"NET", src:"VM4 Kali", hash:"SID 9000001", custody:"Suricata eve.json -> Wazuh OpenSearch", status:"PRESERVED"},
{ts:"10:19:45", type:"LOG + AR", src:"VM2 Ubuntu", hash:"Rule 5763 Level 10", custody:"Wazuh auth.log -> Manager -> firewall-drop", status:"ACTIVE RESPONSE TRIGGERED"},
{ts:"10:34:22", type:"NET+LOG", src:"VM2 Apache", hash:"SHA256 URI full", custody:"Suricata HTTP decoder + Apache access.log", status:"PRESERVED 12+ alerts"},
{ts:"11:08:33", type:"FIM", src:"VM2", hash:"old SHA256 a3f5.. new e9c2.. size 1842->1887", custody:"Wazuh FIM -> OpenSearch", status:"PRESERVED"},
{ts:"11:08:34", type:"LOG", src:"VM2", hash:"Rule 591", custody:"Wazuh logcollector", status:"ANTI-FORENSICS DETECTED"}
];
