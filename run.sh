#!/usr/bin/env bash
rm -rf .iptv_git_repo .iptv_channels
git clone https://github.com/iptv-org/iptv.git .iptv_git_repo
mkdir .iptv_channels
cp  .iptv_git_repo/channels/br.m3u \
    .iptv_git_repo/channels/br_*.m3u \
    .iptv_git_repo/channels/ca.m3u \
    .iptv_git_repo/channels/ca_*.m3u \
    .iptv_git_repo/channels/uk.m3u \
    .iptv_git_repo/channels/uk_*.m3u \
    .iptv_git_repo/channels/us.m3u \
    .iptv_git_repo/channels/us_*.m3u \
    .iptv_channels/
