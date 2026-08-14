#!/bin/bash
# VBoxManage VM creation - PCU FYP
VBoxManage natnetwork add --netname WAN --network 192.168.100.0/24 --enable
VBoxManage natnetwork add --netname vlan-lan --network 10.10.10.0/24 --enable
VBoxManage natnetwork add --netname vlan-dmz --network 10.10.20.0/24 --enable
VBoxManage natnetwork add --netname vlan-mon --network 10.10.30.0/24 --enable
VBoxManage natnetwork add --netname vlan-atk --network 10.10.40.0/24 --enable
# pfSense
VBoxManage createvm --name "pfSense-FYP" --ostype FreeBSD_64 --register
VBoxManage modifyvm "pfSense-FYP" --memory 512 --cpus 1 --nic1 natnetwork --nat-network1 WAN --nic2 natnetwork --nat-network2 vlan-lan --nic3 natnetwork --nat-network3 vlan-dmz --nic4 natnetwork --nat-network4 vlan-mon
VBoxManage modifyvm "pfSense-FYP" --nic5 natnetwork --nat-network5 vlan-atk
echo "VMs created - install ISOs manually"
