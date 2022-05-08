ffmpeg -i 2022-05 -c copy -map 0 -f segment -segment_times 01:28:00,01:32:00 -reset_timestamps 1 seg%d.mkv
