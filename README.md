# WatchTower - Secure Enterprise Network with Zero-Trust, IDS, and Digital Forensics Monitoring

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![pfSense](https://img.shields.io/badge/pfSense-2.7.x-blue)](https://www.pfsense.org/)
[![Suricata](https://img.shields.io/badge/Suricata-7.0.6-red)](https://suricata.io/)
[![Wazuh](https://img.shields.io/badge/Wazuh-4.9.2-lightblue)](https://wazuh.com/)
[![Platform](https://img.shields.io/badge/Platform-VirtualBox-orange)](https://www.virtualbox.org/)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21940116.svg)]((https://doi.org/10.5281/zenodo.21940116))

**Author:** Aremu David Adekanola (Precious Cornerstone University, Ibadan)  
**Final Year Project 2026 - B.Sc. Cyber Security**  

> Enterprise-grade security on commodity hardware - Zero cost licensing - Validated 100% detection rate - 3.23s mean alert latency

---

## 🎯 Overview

This repository contains the complete implementation package for a **secure enterprise network integrating Zero-Trust Architecture (ZTA), Intrusion Detection/Prevention (Suricata), and Digital Forensic Monitoring (Wazuh SIEM)** with a custom SOC Dashboard **WatchTower**.

Designed for **Nigerian SMEs and educational institutions** facing escalating cyber threats (NIBSS reported 45% fraud rise 2024, ₦150B losses) but constrained by budget.

**Validated via 6 attack scenarios:**

| Scenario | Attack | MITRE ATT&CK | Latency | Result |
|----------|--------|--------------|---------|--------|
| 1 | Nmap SYN Port Scan | T1046 | 2.10s | ✅ Detected SID 9000001 |
| 2 | Hydra SSH Brute Force | T1110.001 | 6.40s | ✅ Detected + Active Response BLOCK |
| 3 | SQLMap SQL Injection | T1190 | 1.35s | ✅ 12+ alerts full URI preserved |
| 4 | hping3 ICMP Flood | T1499 | 2.05s | ✅ Temporal pattern |
| 5 | File Integrity Breach | T1098 | 2.85s | ✅ Rule 591 anti-forensics |
| 6 | DNS Enumeration | T1590.002 | 4.60s | ✅ AXFR immediate |

**Aggregate:** 100% detection (6/6), mean latency 3.23s, 0 false positives, forensic quality 4.67/5.0, 12/12 Zero-Trust policy tests PASS.

**Compliance Scores:** NIST SP 800-207 95% PASS, PCI-DSS 87% PASS, NIST CSF 82% PASS, CBN Framework 81% PASS, ISO27001 79% PASS, NDPR 74% WARN.

---

## 🏗️ Architecture

```
ISP WAN (192.168.100.0/24)
    |
[VM1 pfSense Firewall - Zero-Trust PEP/PA]
    |-- LAN 10.10.10.0/24 (VM3 Ubuntu Server 10.10.10.10? Actually 10.10.10.10 web, VM5 Windows SOC 10.10.10.20)
    |-- DMZ 10.10.20.0/24 (10.10.20.1 gateway)
    |-- MON 10.10.30.0/24 (VM2 Wazuh+Suricata 10.10.30.2 / 192.168.0.3 bridged)
    |-- ATTACKZONE 10.10.40.0/24 (VM4 Kali 10.10.40.2 / 192.168.0.14)
```

**Data Flow:**
- pfSense syslog UDP 514 -> Wazuh Manager
- Suricata eve.json /var/log/suricata/eve.json -> Wazuh local file monitoring JSON
- Wazuh Agents TCP 1514 /1515, API 55000, Indexer 9200 -> WatchTower Dashboard fetch()
- FIM realtime inotify /etc/passwd /etc/shadow /etc/ssh/sshd_config /var/www/html

See `docs/architecture.md` for detailed diagrams.

### Host Assignment (VirtualBox - 3 physical PCs)

| Host | Role | VMs | RAM | Storage |
|------|------|-----|-----|---------|
| PC A | Firewall + SIEM | VM1 pfSense (512MB) + VM2 Wazuh+Suricata (2GB) | 4GB | 250GB HDD |
| PC B | Attacker | VM4 Kali (1.5GB) | 4GB | 250GB HDD |
| PC C | SOC Workstation | VM5 Windows (2GB) | 8GB | 250GB SSD |

Total hardware cost <$500 refurbished PCs + unmanaged switch.

---

## 📦 Repository Structure

```
watchtower/
├── pfsense/
│   ├── firewall_rules.csv       # Complete 17-rule Zero-Trust rule set
│   ├── firewall_rules.md        # Human-readable with ZT purpose
│   └── syslog_config.md         # Syslog forwarding to Wazuh 10.10.30.2:514
├── suricata/
│   ├── local.rules              # 8 custom SIDs 9000001-9000008
│   ├── suricata.yaml            # HOME_NET and AF_PACKET config snippet
│   └── et_rules_setup.sh        # suricata-update ET Open
├── wazuh/
│   ├── manager/
│   │   ├── ossec.conf           # Syscheck FIM + localfile eve.json + syslog listener
│   │   └── localfile_config.md
│   ├── agent/
│   │   └── ossec_agent.conf     # PC3 Ubuntu Server agent config (syscheck + logs)
│   ├── indexer/
│   │   ├── jvm.options          # -Xms512m -Xmx512m tuning for 2GB RAM
│   │   └── opensearch.yml       # CORS enabled for dashboard
│   └── active_response/
│       └── firewall_drop.md
├── watchtower/                  # Custom SOC Dashboard
│   ├── index.html               # Single-file web dashboard (HTML/CSS/JS)
│   ├── css/
│   │   └── style.css            # Dark theme professional SOC
│   └── js/
│       ├── app.js               # DataEngine Wazuh API fetch, Chart.js
│       └── demo_data.js         # Representative pre-loaded demo mode data
├── scripts/
│   ├── setup_vms.sh             # VBoxManage VM creation commands
│   ├── install_wazuh.sh         # All-in-one installer -a -i bypass hardware check
│   └── test_scenarios.sh        # 6 attack scenario commands
├── tests/
│   ├── zero_trust_verification.md # 12 tests ZT-01..ZT-12 matrix
│   └── attack_results/          # Exported alerts sanitized
├── docs/
│   ├── architecture.md
│   ├── compliance_mapping.md    # Table 4.24 6 frameworks
│   └── publications/            # Links to 10 papers generated from thesis
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- VirtualBox 7.2+
- 3 PCs or 1 powerful PC capable running 4 VMs (min 8GB RAM total)
- pfSense CE 2.7 ISO, Ubuntu Server 26.04 ISO, Kali Linux 2024.x ISO, Windows 10/11 ISO

### 1. Create Virtual Networks
```bash
# On each host
VBoxManage natnetwork add --netname WAN --network 192.168.100.0/24 --enable
VBoxManage natnetwork add --netname vlan-lan --network 10.10.10.0/24 --enable
VBoxManage natnetwork add --netname vlan-dmz --network 10.10.20.0/24 --enable
VBoxManage natnetwork add --netname vlan-mon --network 10.10.30.0/24 --enable
VBoxManage natnetwork add --netname vlan-atk --network 10.10.40.0/24 --enable
```

### 2. Create pfSense VM (VM1)
```bash
VBoxManage createvm --name "pfSense-FYP" --ostype FreeBSD_64 --register
VBoxManage modifyvm "pfSense-FYP" --memory 512 --cpus 1 --nic1 natnetwork --nat-network1 WAN --nic2 natnetwork --nat-network2 vlan-lan --nic3 natnetwork --nat-network3 vlan-dmz --nic4 natnetwork --nat-network4 vlan-mon
VBoxManage modifyvm "pfSense-FYP" --nic5 natnetwork --nat-network5 vlan-atk
VBoxManage showvminfo "pfSense-FYP" | grep NIC
```

Install pfSense, assign interfaces em0 WAN DHCP, em1 LAN 10.10.10.1/24, em2 OPT1 DMZ 10.10.20.1/24, em3 MON 10.10.30.1/24, em4 ATK 10.10.40.1/24. Delete default LAN allow-all rule, add 17 rules from `pfsense/firewall_rules.csv`, enable syslog forwarding to 10.10.30.2:514.

### 3. Install VM2 Wazuh + Suricata
```bash
# VM creation
VBoxManage createvm --name "Wazuh-SIEM" --ostype Ubuntu_64 --register
VBoxManage modifyvm "Wazuh-SIEM" --memory 2048 --cpus 2 --nic1 nat --nic2 intnet --intnet2 vlan-mon --nic3 bridged
```

Inside Ubuntu Server 26.04:
```bash
sudo apt update && sudo apt install -y suricata apache2 php libapache2-mod-php bind9
# Suricata config
sudo nano /etc/suricata/suricata.yaml
# Set HOME_NET: "[10.10.10.0/24,10.10.20.0/24,10.10.30.0/24,10.10.40.0/24]"
# interface enp0s8 cluster-id 99
sudo cp suricata/local.rules /etc/suricata/rules/local.rules
sudo apt install python3-suricata-update && sudo suricata-update
sudo suricata -T -c /etc/suricata/suricata.yaml
sudo systemctl enable --now suricata

# Wazuh 4.9.2 all-in-one
curl -so wazuh-install.sh https://packages.wazuh.com/4.9/wazuh-install.sh
curl -so config.yml https://packages.wazuh.com/4.9/config.yml
# Edit config.yml all node IPs 10.10.30.2
sudo bash wazuh-install.sh -a -i
# JVM tuning
sudo nano /etc/wazuh-indexer/jvm.options -> -Xms512m -Xmx512m
sudo systemctl restart wazuh-indexer
# Integrate Suricata eve.json
sudo nano /var/ossec/etc/ossec.conf -> add <localfile><log_format>json</log_format><location>/var/log/suricata/eve.json</location></localfile>
sudo systemctl restart wazuh-manager
```

Access Wazuh Dashboard https://192.168.0.3 (bridged IP) admin/[generated password].

### 4. Deploy WatchTower Dashboard (VM5 Windows)
Copy `watchtower/` folder to Windows VM5. Enable CORS in `/etc/wazuh-indexer/opensearch.yml`:
```
http.cors.enabled: true
http.cors.allow-origin: "*"
```
Restart indexer. Open `watchtower/index.html` via file:// or serve `python -m http.server 8080` and open http://localhost:8080. Switch LIVE_MODE true/false in js/app.js.

### 5. Run Attack Scenarios (VM4 Kali)
See `scripts/test_scenarios.sh`:
```bash
# Port scan
nmap -sS -p 1-1024 192.168.0.3
# SSH brute
hydra -l root -P /usr/share/wordlists/rockyou.txt -t 4 -V ssh://192.168.0.3
# SQLi
sqlmap -u 'http://192.168.0.3/login.php?user=admin&pass=test' --dbs --batch --level=3 --risk=2
curl 'http://192.168.0.3/login.php?user=admin%27+OR+1%3D1--&pass=x'
# ICMP flood
sudo hping3 --icmp --flood -V 192.168.0.3
# DNS Enum
dnsenum --dnsserver 192.168.0.3 enterprise.local
dig @192.168.0.3 enterprise.local AXFR
```

Monitor Wazuh Dashboard and WatchTower real-time.

---

## 📊 Performance Results

- Detection Rate 100% (6/6)
- Mean Latency 3.23s
- FP 0
- Forensic 4.67/5
- ZTA Policy 12/12 PASS
- Compliance 5/6 PASS

---

## 📚 Publications from This Project

This repo supports 10 papers generated:

**Full Articles:**
1. Zero-Trust Architecture Implementation Using Open-Source Tools on Commodity Hardware: A Nigerian Case Study
2. Integrating Suricata IDS/IPS with Wazuh SIEM for Enterprise Threat Detection: Performance Evaluation
3. WatchTower: A Custom SOC Dashboard for Unified Security Monitoring in Resource-Constrained Environments
4. Digital Forensic Readiness in Enterprise Networks: File Integrity Monitoring and Anti-Forensics Detection with Wazuh
5. Compliance Mapping of an Open-Source Secure Enterprise Network: NIST, PCI-DSS, CBN, ISO 27001, NDPR

**Short Papers:**
- Empirical Validation of Zero-Trust Microsegmentation via Controlled Attack Simulation
- Performance Metrics of Suricata Custom Rules: Detection Latency and False Positives
- Low-Cost SIEM Deployment for Nigerian SMEs: Lessons from VirtualBox Lab
- Automated Active Response to SSH Brute Force in Zero-Trust Networks
- DNS Enumeration and SQL Injection Detection in Open-Source Enterprise Security

All papers in `/home/user/articles/` (in workspace).

---

## 🛡️ Compliance

Mapped against: NIST SP 800-207 (95% PASS), PCI-DSS v4.0 (87%), NIST CSF 2.0 (82%), CBN Framework (81%), ISO27001:2022 (79%), NDPR (74% WARN due data classification scope).

---

## 🤝 Contributing

Pull requests welcome! For major changes open issue first. Focus areas: ML anomaly detection (Autoencoder LSTM), TLS decryption, threat intel integration (MISP), cloud hybrid ZTA.

---

## 📄 License

MIT License - see LICENSE file. Free for academic, SME, commercial use.

---

## 🙏 Acknowledgement

- Mrs. Ajiboye G.O - Supervisor
- Precious Cornerstone University, Ibadan - Department of Computer Science
- OISF Suricata, Wazuh Inc., pfSense community - Open-source tools
- NIST, MITRE ATT&CK for frameworks

---

## 📧 Contact

Aremu David Adekanola - david1aremu@gmail.com

**If this repo helps your thesis or SME deployment, please ⭐ star and cite!**

```
@thesis{aremu2026secure,
  title={Design and Implementation of a Secure Enterprise Network with Intrusion Detection, Zero-Trust Architecture, and Digital Forensics Monitoring},
  author={Aremu, David Adekanola},
  year={2026},
  school={Precious Cornerstone University}
}
```
