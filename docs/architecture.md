# Architecture Details
See thesis Chapter 3 Figure 3.1 High Level System Architecture, Figure 3.2 Security Data Flow.

Zones: WAN 192.168.100.0/24 NAT, LAN 10.10.10.0/24, DMZ 10.10.20.0/24, MON 10.10.30.0/24, ATK 10.10.40.0/24.

Inter-zone matrix: LAN->WAN 80/443 ALLOW, LAN->MON 1514/514 ALLOW, DMZ->LAN BLOCK critical, MON->ALL ALLOW, ATK->LAN BLOCK except :80 TEST.
